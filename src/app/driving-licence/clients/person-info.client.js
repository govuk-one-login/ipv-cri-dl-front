import { createBaseClient } from "./base.client.js";
import { personInfoSchema } from "./schemas/person-info.schema.js";

import appConfig from "../../../lib/config.js";
import LOGGER from "../../../utils/logger.js";

const NOT_AUTH_SOURCE = { authSource: false };

export const personInfoClient = (req) => {
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
        const issues = parsed.error.issues.map(({ code, path, message }) => ({
          code,
          path,
          message
        }));
        CLIENT_LOGGER.warn({ issues }, "response failed schema validation");
        return NOT_AUTH_SOURCE;
      }

      CLIENT_LOGGER.info({ isAuthSourceRoute: true }, "licence data retrieved");
      return { authSource: true, data: parsed.data };
    }
  };
};
