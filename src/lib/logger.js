const pino = require("pino");
const { PACKAGE_NAME } = require("./config");


const SENSITIVE_PARAMS = ["request", "code"];
const BASE_PLACEHOLDER = "https://placeholder-for-redaction";

export const redactQueryParams = (
  url,
) => {
  if (url?.includes("?")) {
    try {
      const parsedUrl = new URL(url, BASE_PLACEHOLDER);
      for (const param of SENSITIVE_PARAMS) {
        if (parsedUrl.searchParams.has(param)) {
          parsedUrl.searchParams.set(param, "hidden");
        }
      }
      return parsedUrl.href.replace(BASE_PLACEHOLDER, "");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err, "Err")
      // ignore
    }
  }
  return url;
};


const logger = pino({
  name: PACKAGE_NAME,
  level: process.env.LOGS_LEVEL ?? "info",
  messageKey: "message", // rename default msg property to message,
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
  serializers: {
    req: (req) => {
      return {
        method: req.method,
        url: redactQueryParams(req.url),
      };
    },
    res: (res) => {
      return {
        statusCode: res.statusCode,
        sessionId: res.locals.sessionId,
        location: redactQueryParams(
          res.getHeader("location"),
        ),
      };
    },
  },
});

module.exports = { logger }