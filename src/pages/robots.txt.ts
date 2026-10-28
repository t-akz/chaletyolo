/**
 * Génère /robots.txt : autorise l'exploration du site et indique le sitemap.
 * L'adresse du site vient de src/config/site.ts.
 */
import type { APIRoute } from 'astro';
import { site } from '../config/site';

export const GET: APIRoute = () => {
  const sitemap = new URL('sitemap-index.xml', site.url).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
