const { createBaseClient } = require("./base.client");
const { personInfoSchema } = require("./schemas/person-info.schema");

const appConfig = require("../../../lib/config");
const LOGGER = require("../../../utils/logger");

const NOT_AUTH_SOURCE = { authSource: false };

const personInfoClient = (req) => {
  const client = createBaseClient(req);
  const CLIENT_LOGGER = LOGGER.child({ client: "person-info" });
  return {
    get: async () => {
      const res = await client.get(appConfig.API.PATHS.PERSON_INFO);
      if (res.status === 204) {
        CLIENT_LOGGER.info(
          { status: res.status, isAuthSourceRoute: false },
          "no content"
        );
        return NOT_AUTH_SOURCE;
      }

      const parsed = personInfoSchema.safeParse(await res.json());
      if (!parsed.success) {
        CLIENT_LOGGER.warn(
          { issues: parsed.error.issues },
          "response failed schema validation"
        );
        return NOT_AUTH_SOURCE;
      }

      CLIENT_LOGGER.info({ isAuthSourceRoute: true }, "licence data retrieved");
      return { authSource: true, data: parsed.data };
    }
  };
};

module.exports = {
  personInfoClient
};
