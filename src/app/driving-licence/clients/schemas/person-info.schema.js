const { z } = require("zod");

const nonEmpty = z.string().min(1);

const namePart = z.object({
  type: z.enum(["GivenName", "FamilyName"]),
  value: nonEmpty
});

const name = z.object({
  nameParts: z.array(namePart).min(1)
});

const birthDate = z.object({
  value: nonEmpty
});

const address = z.object({
  postalCode: nonEmpty
});

const drivingPermit = z
  .object({
    personalNumber: nonEmpty,
    expiryDate: nonEmpty,
    issueDate: nonEmpty,
    issuedBy: nonEmpty,
    issueNumber: nonEmpty.optional()
  })
  .refine(
    (o) => o.issuedBy !== "DVLA" || Boolean(o.issueNumber),
    { path: ["issueNumber"], message: "issueNumber is required when issuedBy is DVLA" }
  );

const personInfoSchema = z.object({
  name: z.array(name).min(1),
  birthDate: z.array(birthDate).min(1),
  address: z.array(address).min(1),
  drivingPermit: z.array(drivingPermit).min(1)
});

module.exports = {
  personInfoSchema
};
