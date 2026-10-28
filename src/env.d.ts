// Types des variables d'environnement publiques (voir .env.example).
interface ImportMetaEnv {
  readonly PUBLIC_ANALYTICS_UMAMI_SRC?: string;
  readonly PUBLIC_ANALYTICS_UMAMI_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
