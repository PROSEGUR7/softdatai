import React from 'react';

/**
 * Renderizador de Markdown ligero y seguro para mensajes de chat.
 * Soporta **negrita**, *cursiva*, `código`, [texto](url) y saltos de línea.
 * Escapa el contenido y valida URLs antes de renderizar.
 */

type Token =
  | { type: 'text'; value: string }
  | { type: 'bold'; children: Token[] }
  | { type: 'italic'; children: Token[] }
  | { type: 'code'; value: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'autolink'; text: string; href: string; icon?: 'phone' | 'mail' | 'globe' | 'whatsapp' };

function isSafeUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (/^\s*(javascript|data|vbscript):/i.test(trimmed)) return false;
  if (/^https?:\/\//i.test(trimmed)) return true;
  if (/^mailto:/i.test(trimmed)) return true;
  if (/^tel:/i.test(trimmed)) return true;
  return trimmed.startsWith('/') || trimmed.startsWith('#') || !trimmed.includes(':');
}

function findClosingSingle(input: string, start: number, marker: string): number {
  for (let j = start + 1; j < input.length; j++) {
    if (input[j] === marker) {
      if (marker === '*' && input[j + 1] === '*') return -1;
      return j;
    }
  }
  return -1;
}

// --- Auto-detección de enlaces (URLs, emails, teléfonos, WhatsApp) ---

// Email estándar: usuario@dominio.tld
const EMAIL_REGEX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

// Teléfono internacional con prefijo + opcional: +52 55 1234 5678, +1-202-555-0143, +57 320 655 0180
// Acepta + al inicio, dígitos, espacios, guiones y paréntesis. Mínimo 7 dígitos totales.
const PHONE_REGEX = /\+?\d[\d\s\-().]{6,}\d/;

// URL cruda con o sin protocolo: https://ejemplo.com, www.ejemplo.com, dominio.com/path
const URL_REGEX = /(?:https?:\/\/|www\.)[^\s<>()[\]{}'"]+[^\s<>()[\]{}'".:,;!?]/;

/**
 * Limpia un teléfono capturado: deja solo dígitos (sin +, espacios, guiones)
 * para construir el href de tel: o https://wa.me/
 */
function phoneToDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Intenta autocompletar el href para un fragmento capturado:
 *   - email ->  mailto:usuario@dominio
 *   - phone ->  https://wa.me/CC### (si parece móvil por longitud) o tel:###
 *   - url    ->  https://...
 */
function buildAutolink(raw: string): { text: string; href: string; icon: 'phone' | 'mail' | 'globe' | 'whatsapp' } | null {
  const trimmed = raw.replace(/[.,;:!?)]+$/g, '');
  if (!trimmed) return null;

  if (EMAIL_REGEX.test(trimmed) && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed)) {
    return { text: trimmed, href: 'mailto:' + trimmed, icon: 'mail' };
  }

  // Teléfono: si contiene + o dígitos suficientes, lo tratamos como tel
  // Preferimos WhatsApp si el número parece móvil (10-15 dígitos) y no empieza con 0
  if (/^\+?[\d\s\-().]+$/.test(trimmed)) {
    const digits = phoneToDigits(trimmed);
    if (digits.length >= 7 && digits.length <= 15) {
      const href = `https://wa.me/${digits}`;
      return { text: trimmed.trim(), href, icon: 'whatsapp' };
    }
  }

  if (URL_REGEX.test(trimmed)) {
    const href = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    return { text: trimmed, href, icon: 'globe' };
  }

  return null;
}

/**
 * Parser recursivo de un fragmento inline (sin saltos de párrafo).
 */
function parseInline(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let buffer = '';

  const flush = () => {
    if (buffer) {
      tokens.push({ type: 'text', value: buffer });
      buffer = '';
    }
  };

  while (i < input.length) {
    const ch = input[i];

    // **negrita** o __negrita__
    if (input.startsWith('**', i) || input.startsWith('__', i)) {
      const marker = input.startsWith('**', i) ? '**' : '__';
      const end = input.indexOf(marker, i + 2);
      if (end !== -1) {
        flush();
        const inner = input.substring(i + 2, end);
        tokens.push({ type: 'bold', children: parseInline(inner) });
        i = end + 2;
        continue;
      }
    }

    // *cursiva* o _cursiva_ (después de manejar ** arriba)
    if (ch === '*' || ch === '_') {
      const end = findClosingSingle(input, i, ch);
      if (end !== -1 && end > i + 1) {
        const inner = input.substring(i + 1, end);
        if (inner.trim().length > 0) {
          flush();
          tokens.push({ type: 'italic', children: parseInline(inner) });
          i = end + 1;
          continue;
        }
      }
    }

    // `código`
    if (ch === '`') {
      const end = input.indexOf('`', i + 1);
      if (end !== -1) {
        flush();
        tokens.push({ type: 'code', value: input.substring(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    // [texto](url)
    if (ch === '[') {
      const closeBracket = input.indexOf(']', i + 1);
      if (closeBracket !== -1 && input[closeBracket + 1] === '(') {
        const closeParen = input.indexOf(')', closeBracket + 2);
        if (closeParen !== -1) {
          const text = input.substring(i + 1, closeBracket);
          const url = input.substring(closeBracket + 2, closeParen);
          if (text && isSafeUrl(url)) {
            flush();
            tokens.push({ type: 'link', text, href: url });
            i = closeParen + 1;
            continue;
          }
        }
      }
    }

    // Detección de autolinks (email, telefono, url cruda)
    // Solo busca cuando el cursor esta al inicio o después de un espacio/separador
    // para no romper palabras como "softdatai.com" si apareciera pegado.
    const isStartOrSep = i === 0 || /[\s(,;:!?¿¡]/.test(input[i - 1]);
    if (isStartOrSep) {
      // Probar email primero
      const emailMatch = EMAIL_REGEX.exec(input.substring(i));
      if (emailMatch && /^[\s(,;:!?¿¡]/.test(input[emailMatch[0].length + i] || ' ')) {
        const m = emailMatch[0];
        if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(m)) {
          flush();
          tokens.push({ type: 'autolink', text: m, href: 'mailto:' + m, icon: 'mail' });
          i += m.length;
          continue;
        }
      }

      // Probar URL cruda
      const urlMatch = URL_REGEX.exec(input.substring(i));
      if (urlMatch) {
        const m = urlMatch[0];
        // Limitar a un solo "." final si lo hay
        const trimmedUrl = m.replace(/[.,;:!?)]+$/, '');
        flush();
        const href = trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`;
        tokens.push({ type: 'autolink', text: trimmedUrl, href, icon: 'globe' });
        i += trimmedUrl.length;
        continue;
      }

      // Probar telefono (incluye numeros WhatsApp)
      const phoneMatch = PHONE_REGEX.exec(input.substring(i));
      if (phoneMatch) {
        const m = phoneMatch[0].replace(/[\s\-().]+$/, '');
        const digits = phoneToDigits(m);
        if (digits.length >= 7 && digits.length <= 15) {
          flush();
          tokens.push({
            type: 'autolink',
            text: m.trim(),
            href: `https://wa.me/${digits}`,
            icon: 'whatsapp',
          });
          i += m.length;
          continue;
        }
      }
    }

    buffer += ch;
    i += 1;
  }

  flush();
  return tokens;
}

/**
 * Limpia asteriscos huérfanos que el modelo suele dejar pegados
 * a palabras: "perfil**", "web**", "Electronico:**".
 */
function cleanOrphanAsterisks(input: string): string {
  let out = input.replace(/([A-Za-záéíóúÁÉÍÓÚñÑüÜ])\*+/g, '$1');
  out = out.replace(/\*+([A-Za-záéíóúÁÉÍÓÚñÑüÜ])/g, '$1');
  out = out.replace(/:\s*\*+/g, ':');
  out = out.replace(/\*+\s*([\.,;:])/g, '$1');
  out = out.replace(/(^|\s)\*+(\s|$|[,.;:!?])/g, '$1$2');
  return out;
}

function renderTokens(tokens: Token[], keyPrefix = ''): React.ReactNode[] {
  return tokens.map((t, idx) => {
    const key = `${keyPrefix}${idx}`;
    switch (t.type) {
      case 'text':
        return <React.Fragment key={key}>{t.value}</React.Fragment>;
      case 'bold':
        return <strong key={key} className="font-semibold text-white">{renderTokens(t.children, key + '-')}</strong>;
      case 'italic':
        return <em key={key} className="italic text-neutral-100">{renderTokens(t.children, key + '-')}</em>;
      case 'code':
        return <code key={key} className="px-1 py-0.5 rounded bg-neutral-900/60 text-primary text-xs font-mono">{t.value}</code>;
      case 'link':
        return (
          <a
            key={key}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80 break-all"
          >
            {t.text}
          </a>
        );
      case 'autolink': {
        const iconChar = t.icon === 'mail' ? '✉' : t.icon === 'whatsapp' ? '💬' : t.icon === 'phone' ? '📞' : '🔗';
        return (
          <a
            key={key}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-1.5 py-0.5 my-0.5 rounded-md bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 hover:border-primary/50 transition-colors font-medium break-all"
            title={t.href}
          >
            <span aria-hidden="true" className="text-xs leading-none">{iconChar}</span>
            <span className="underline underline-offset-2 decoration-primary/40">{t.text}</span>
          </a>
        );
      }
      default:
        return null;
    }
  });
}

export const MarkdownLite: React.FC<{ content: string; className?: string }> = ({ content, className = '' }) => {
  const cleaned = cleanOrphanAsterisks(content);
  const paragraphs = cleaned.split(/\n{2,}/);

  return (
    <div className={`leading-relaxed ${className}`}>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        const listMatch = trimmed.match(/^(\s*[-*]\s+.+(\n\s*[-*]\s+.+)*)$/);
        if (listMatch) {
          const items = trimmed.split(/\n/).map(l => l.replace(/^\s*[-*]\s+/, '').trim()).filter(Boolean);
          return (
            <ul key={pIdx} className="my-1.5 space-y-1 list-disc list-inside">
              {items.map((it, iIdx) => (
                <li key={iIdx}>{renderTokens(parseInline(it), `p${pIdx}-l${iIdx}-`)}</li>
              ))}
            </ul>
          );
        }

        const lines = trimmed.split(/\n/);
        return (
          <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderTokens(parseInline(line), `p${pIdx}-l${lIdx}-`)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default MarkdownLite;
