// Configuration Astro — site 100 % statique, bilingue FR (racine) / EN (/en/).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site';
import { routes } from './src/i18n/routes';

export default defineConfig({
  // Adresse du site (src/config/site.ts) : sert aux URL canoniques et au sitemap.
  site: site.url,
  output: 'static',

  // Chaque page est générée en dossier (« /le-chalet/index.html »),
  // ce qui donne des adresses se terminant par « / ».
  build: { format: 'directory' },
  trailingSlash: 'ignore',

  // Routage multilingue : le français à la racine, l'anglais sous /en/.
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      // Pages non référencées : remerciements après l'envoi du formulaire, admin des tarifs.
      filter: (page) => ![routes.thanks.fr, routes.thanks.en, '/admin/'].some((path) => page.endsWith(path)),
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr', en: 'en' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    // La bibliothèque de carte (MapLibre, ~1,1 Mo non compressé) dépasse le seuil
    // d'alerte de 500 Ko. Elle n'est chargée qu'à l'approche de la carte de la page
    // Le chalet (src/components/ChaletMap.astro) : seuil relevé pour elle seule.
    build: { chunkSizeWarningLimit: 1200 },
  },
});
