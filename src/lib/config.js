require("dotenv").config();

const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
const serviceConfig = {};

if (!appEnv.isLocal) {
  serviceConfig.criDrivingLicenceBackAPIUrl = appEnv.getServiceURL(
    "cri-driving-licence-back-api"
  );
}

module.exports = {
  API_BASE_URL: serviceConfig.criDrivingLicenceBackAPIUrl || process.env.API_BASE_URL,
  API_CHECK_DRIVING_LICENCE_PATH: "/check-driving-licence",
  API_BUILD_CLIENT_OAUTH_RESPONSE_PATH: "/build-client-oauth-response",
  API_INITIALISE_SESSION_REQ_PATH: "/session",
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  GTM_ID: process.env.GTM_ID,
  GTM_ANALYTICS_COOKIE_DOMAIN: process.env.ANALYTICS_DOMAIN,
    REDIS: {
      SESSION_URL: process.env.REDIS_SESSION_URL,
      PORT: process.env.REDIS_PORT || 6379,
    },
};
