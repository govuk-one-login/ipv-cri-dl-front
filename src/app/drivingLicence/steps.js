const details = require("./controllers/details");
const root = require("./controllers/root");
const validate = require("./controllers/validate");
const proveAnotherWay = require("./controllers/prove-another-way");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "details",
  },
  "/details": {
    fields: [
      "surname",
      "firstName",
      "middleNames",
      "dateOfBirth",
      "issueDate",
      "validTo",
      "drivingLicenceNumber",
      "issueNumber",
      "postcode",
    ],
    controller: details,
    next: "validate",
  },
  "/prove-another-way": {
    prereqs: ["/drivingLicence/"],
    controller: proveAnotherWay,
    fields: ["proveAnotherWayRadio"],
    next: proveAnotherWay.prototype.next,
  },
  "/validate": {
    controller: validate,
    skip: true,
    next: validate.prototype.next,
  },
};
