const { z } = require("zod");

const checkDrivingLicenceResponseSchema = z.object({
  retry: z.boolean()
});

module.exports = {
  checkDrivingLicenceResponseSchema
};
