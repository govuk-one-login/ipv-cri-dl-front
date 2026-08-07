const { createBaseClient } = require("./base.client");
const {
  checkDrivingLicenceResponseSchema
} = require("./schemas/check-driving-licence.schema");

const appConfig = require("../../../lib/config");
const LOGGER = require("../../../utils/logger");

const checkDrivingLicenceClient = (req) => {
  const client = createBaseClient(req);
  const CLIENT_LOGGER = LOGGER.child({ client: "check-driving-licence" });
  return {
    post: async (body, headers) => {
      const res = await client.post(
        appConfig.API.PATHS.CHECK,
        JSON.stringify(body),
        headers
      );

      const parsed = checkDrivingLicenceResponseSchema.safeParse(
        await res.json()
      );

      if (!parsed.success) {
        CLIENT_LOGGER.warn(
          { issues: parsed.error.issues },
          "response failed schema validation"
        );
        return { retry: false };
      }

      CLIENT_LOGGER.info("licence check response received");
      return parsed.data;
    }
  };
};

module.exports = {
  checkDrivingLicenceClient
};
