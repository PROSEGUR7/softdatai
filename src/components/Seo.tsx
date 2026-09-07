import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://softdatai.com';

const pageMetadata: Record<string, { title: string; description: string; robots: string }> = {
  '/': {
    title: 'Softdatai | Consultoría tecnológica, IA y software',
    description:
      'Softdatai ofrece consultoría tecnológica, IA, desarrollo de software, datos, nube y automatización para empresas en Colombia y Latinoamérica.',
    robots: 'index, follow',
  },
  '/registro': {
    title: 'Registro | Softdatai',
    description: 'Formulario de contacto y registro de Softdatai.',
    robots: 'noindex, nofollow',
  },
  '/registro-exitoso': {
    title: 'Registro exitoso | Softdatai',
    description: 'Confirmación de registro en Softdatai.',
    robots: 'noindex, nofollow',
  },
  '/payment': {
    title: 'Pago | Softdatai',
    description: 'Proceso de pago seguro de Softdatai.',
    robots: 'noindex, nofollow',
  },
  '/payment-success': {
    title: 'Pago confirmado | Softdatai',
    description: 'Confirmación de pago en Softdatai.',
    robots: 'noindex, nofollow',
  },
};

const upsertMeta = (selector: string, attribute: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, selector.match(/\[([^=]+)=/)?.[1] ?? '');
    element.setAttribute(
      attribute === 'property' ? 'property' : 'name',
      selector.match(/=["']([^"']+)["']/)?.[1] ?? '',
    );
    document.head.appendChild(element);
  }

  element.setAttribute('content', value);
};

const upsertCanonical = (url: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = url;
};

const Seo: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? pageMetadata['/'];
    const canonicalPath = pageMetadata[pathname] ? pathname : '/';
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;

    document.title = metadata.title;
    upsertMeta('meta[name="description"]', 'name', metadata.description);
    upsertMeta('meta[name="robots"]', 'name', metadata.robots);
    upsertMeta('meta[property="og:title"]', 'property', metadata.title);
    upsertMeta('meta[property="og:description"]', 'property', metadata.description);
    upsertMeta('meta[property="og:url"]', 'property', canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', 'name', metadata.title);
    upsertMeta('meta[name="twitter:description"]', 'name', metadata.description);
    upsertMeta('meta[name="twitter:url"]', 'name', canonicalUrl);
    upsertCanonical(canonicalUrl);
  }, [pathname]);

  return null;
};

export default Seo;
