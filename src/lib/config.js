require("dotenv").config();

module.exports = {
  PACKAGE_NAME: "di-ipv-cri-uk-driving-licence-front",
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:5007/",
    PATHS: {
      SESSION: "session",
      CHECK: "check-driving-licence",
      AUTHORIZATION: "authorization",
      PERSON_INFO: "person-info"
    }
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:5030",
    PATHS: {
      DRIVING_LICENCE: "/"
    },
    GTM: {
      GA4_ID: process.env.GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID || "GTM-XXXXXXX",
      UA_ID: process.env.UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID || "UA-XXXXXXX",
      ANALYTICS_COOKIE_DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
      GA4_ENABLED: process.env.GA4_ENABLED || true,
      UA_ENABLED: process.env.UA_ENABLED || false
    },
    LANGUAGE_TOGGLE_DISABLED: process.env.LANGUAGE_TOGGLE_DISABLED || "true",
    AUTH_SOURCE_ENABLED: process.env.AUTH_SOURCE_ENABLED || "true"
  },
  PORT: process.env.PORT || 5030,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
  LOG_LEVEL: process.env.LOG_LEVEL || "request",
  REDIS: {
    SESSION_URL: process.env.REDIS_SESSION_URL,
    PORT: process.env.REDIS_PORT || 6379
  }
};
