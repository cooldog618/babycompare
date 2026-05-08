export interface NaverConfig {
  clientId: string;
  clientSecret: string;
  timeoutMs: number;
  useDemoData: boolean;
}

export function resolveNaverConfig(env: NodeJS.ProcessEnv): NaverConfig {
  const timeoutRaw = Number(env.NAVER_API_TIMEOUT_MS);
  const timeoutMs = Number.isFinite(timeoutRaw) && timeoutRaw > 0 ? timeoutRaw : 5000;

  return {
    clientId: env.NAVER_CLIENT_ID?.trim() ?? '',
    clientSecret: env.NAVER_CLIENT_SECRET?.trim() ?? '',
    timeoutMs,
    useDemoData: env.USE_DEMO_DATA === 'true'
  };
}
