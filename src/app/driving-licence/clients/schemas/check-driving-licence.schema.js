import { z } from "zod";

export const checkDrivingLicenceResponseSchema = z.object({
  retry: z.boolean()
});
