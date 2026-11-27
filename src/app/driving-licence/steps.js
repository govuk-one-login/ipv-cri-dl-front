import { DrivingLicenceDetailsController as details } from "./controllers/details.js";
import { RootController as root } from "./controllers/root.js";
import { ValidateController as validate } from "./controllers/validate.js";
import { LicenceIssuerController as licenceIssuer } from "./controllers/licence-issuer.js";
import { CheckYourDetailsController as checkYourDetails } from "./controllers/check-your-details.js";
import { ConsentController as consent } from "./controllers/consent.js";

export const steps = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: [
      {
        field: "isAuthSourceRoute",
        value: true,
        next: "/check-your-details"
      },
      "/licence-issuer"
    ]
  },
  "/check-your-details": {
    controller: checkYourDetails,
    fields: ["confirmDetails"],
    next: [
      {
        field: "detailsNotConfirmed",
        value: true,
        next: "/prove-another-way"
      },
      "consent"
    ]
  },
  "/consent": {
    controller: consent,
    fields: ["issuerDependent", "consentDVACheckbox", "consentCheckbox"],
    next: "validate"
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
        field: "isAuthSourceRoute",
        value: true,
        next: "/oauth2/callback"
      },
      {
        field: "showRetryMessage",
        value: true,
        next: "/details"
      },
      "/oauth2/callback"
    ]
  }
};
