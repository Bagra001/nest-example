export function configuration() {
  return {
    stage: process.env.NODE_ENV,
    service: {
      name: process.env.SERVICE_NAME,
      port: Number.parseInt(process.env.SERVER_PORT as string, 10),
      logLevel: process.env.LOG_LEVEL,
    },
    management: {
      name: process.env.MONITORING_NAME,
      port: Number.parseInt(process.env.MONITORING_PORT as string, 10),
    },
    apm: {
      enabled: process.env.APM_ENABLED,
      logLevel: process.env.APM_LOG_LEVEL,
      url: process.env.APM_URL,
      ignoredUrl: process.env.APM_IGNORED_URL,
      sampleRate: Number.parseFloat(process.env.APM_SAMPLE_RATE as string),
    },
    database: {
      url: process.env.MONGO_URL,
      dbName: process.env.MONGO_DB,
    },
  };
}
