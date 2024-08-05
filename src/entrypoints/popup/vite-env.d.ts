/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_YOUTUBE_API_BASE_URL_BY_V3: string;
  readonly VITE_YOUTUBE_API_KEY_BY_V3: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
