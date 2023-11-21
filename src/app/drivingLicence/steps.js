const details = require("./controllers/details");
const root = require("./controllers/root");
const validate = require("./controllers/validate");
const licenceIssuer = require("./controllers/licence-issuer");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "licence-issuer"
  },
  "/licence-issuer": {
    controller: licenceIssuer,
    fields: ["licenceIssuer"],
    next: [
      {
        field: "noLicence",
        value: true,
        next: "/prove-another-way"
      },
      "/details"
    ]
  },
  "/details": {
    fields: [
      "surname",
      "firstName",
      "middleNames",
      "dateOfBirth",
      "dvaDateOfBirth",
      "issueDate",
      "dateOfIssue",
      "expiryDate",
      "drivingLicenceNumber",
      "dvaLicenceNumber",
      "issueNumber",
      "postcode",
      "issuerDependent",
      "consentDVACheckbox",
      "consentCheckbox"
    ],
    controller: details,
    next: "validate"
  },
  "/prove-another-way": {
    prereqs: ["/"],
    skip: true,
    next: "/oauth2/callback"
  },
  "/validate": {
    controller: validate,
    skip: true,
    next: [
      {
        field: "showRetryMessage",
        value: true,
        next: "/details"
      },
      "/oauth2/callback"
    ]
  }
};
