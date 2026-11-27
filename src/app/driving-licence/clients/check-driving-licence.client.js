import { createBaseClient } from "./base.client.js";
import { checkDrivingLicenceResponseSchema } from "./schemas/check-driving-licence.schema.js";

import appConfig from "../../../lib/config.js";
import LOGGER from "../../../utils/logger.js";

export const checkDrivingLicenceClient = (req) => {
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
