import appConfig from "./lib/config.js";
import { dynamoSessionConfig } from "./dynamo-session-config.js";

const { SESSION_TABLE_NAME, SESSION_SECRET, SESSION_TTL } = appConfig;

export const sessionConfig = {
  createSessionConfig: () => ({
    cookieName: "service_session",
    secret: SESSION_SECRET,
    cookieOptions: { maxAge: SESSION_TTL },
    ...(SESSION_TABLE_NAME && {
      sessionStore: dynamoSessionConfig.createSessionStore()
    })
  }),
  isDynamo: () => {
    return !!SESSION_TABLE_NAME; // NOSONAR
  }
};
