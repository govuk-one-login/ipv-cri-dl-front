const { Controller: BaseController } = require("hmpo-form-wizard");

const appConfig = require("../../../lib/config");
const { personInfoClient } = require("../clients/person-info.client");
const LOGGER = require("../../../utils/logger");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    req.sessionModel.reset();
    req.sessionModel.set("isAuthSourceRoute", false);

    try {
      if (appConfig.APP.AUTH_SOURCE_ENABLED === "true") {
        const { authSource, data } = await personInfoClient(req).get();

        if (authSource) {
          req.sessionModel.set("isAuthSourceRoute", true);
          this.applyPersonInfo(req, data);
        }
      }
    } catch (err) {
      LOGGER.logError(req, err, { messagePrefix: "root" });
      return next(err);
    }

    next();
  }

  applyPersonInfo(req, { name, birthDate, address, drivingPermit }) {
    const permit = drivingPermit[0];

    req.sessionModel.set("drivingLicenceNumber", permit.personalNumber);
    req.sessionModel.set("expiryDate", permit.expiryDate);
    req.sessionModel.set("issueDate", permit.issueDate);
    req.sessionModel.set("licenceIssuer", permit.issuedBy);
    req.sessionModel.set("issuerDependent", permit.issuedBy);
    req.sessionModel.set("postcode", address[0].postalCode);
    req.sessionModel.set("dateOfBirth", birthDate[0].value);

    if (permit.issuedBy === "DVLA") {
      req.sessionModel.set("issueNumber", permit.issueNumber);
    }

    this.setNames(req, name[0].nameParts);
  }

  setNames(req, nameParts) {
    const givenNames = nameParts
      .filter((part) => part.type === "GivenName")
      .map((part) => part.value);
    const surname = nameParts
      .filter((part) => part.type === "FamilyName")
      .map((part) => part.value)
      .join(" ");

    const [firstName, ...middle] = givenNames;
    req.sessionModel.set("firstName", firstName);
    req.sessionModel.set("middleNames", middle.join(" "));
    req.sessionModel.set("surname", surname);
  }
}

module.exports = RootController;
