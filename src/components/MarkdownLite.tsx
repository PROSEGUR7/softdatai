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
  | { type: 'link'; text: string; href: string };

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
