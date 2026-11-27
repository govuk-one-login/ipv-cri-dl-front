import wizard from "hmpo-form-wizard";
import appConfig from "../../../lib/config.js";
import { createPersonalDataHeaders } from "@govuk-one-login/frontend-passthrough-headers";
import LOGGER from "../../../utils/logger.js";
import { checkDrivingLicenceClient } from "../clients/check-driving-licence.client.js";

const BaseController = wizard.Controller;
const {
  API: {
    BASE_URL,
    PATHS: { CHECK }
  }
} = appConfig;

export class ValidateController extends BaseController {
  async saveValues(req, res, callback) {
    const firstName = req.sessionModel.get("firstName");
    const middleNames = req.sessionModel.get("middleNames");
    const forenames =
      middleNames === ""
        ? firstName.split(" ")
        : firstName.split(" ").concat(middleNames.split(" "));
    const attributes = {
      drivingLicenceNumber:
        req.sessionModel.get("dvaLicenceNumber") ||
        req.sessionModel.get("drivingLicenceNumber"),
      issueNumber: req.sessionModel.get("issueNumber") || null,
      postcode: req.sessionModel.get("postcode"),
      surname: req.sessionModel.get("surname"),
      forenames: forenames,
      dateOfBirth:
        req.sessionModel.get("dvaDateOfBirth") ||
        req.sessionModel.get("dateOfBirth"),
      expiryDate: req.sessionModel.get("expiryDate"),
      issueDate:
        req.sessionModel.get("issueDate") ||
        req.sessionModel.get("dateOfIssue"),
      licenceIssuer: req.sessionModel.get("licenceIssuer")
    };

    try {
      const headers = createPersonalDataHeaders(`${BASE_URL}${CHECK}`, req);

      if (req.session.featureSet === "direct") {
        headers["document-checking-route"] = "direct";
      }

      LOGGER.info("validate: calling check-driving-licence lambda");
      const { retry } = await checkDrivingLicenceClient(req).post(
        attributes,
        headers
      );

      if (retry) {
        req.sessionModel.set("showRetryMessage", true);
        LOGGER.info("validate: driving licence retry");
      } else {
        LOGGER.info("validate: redirecting user to callback");
      }

      callback();
    } catch (err) {
      LOGGER.logError(req, err, { messagePrefix: "validate" });
      callback(err);
    }
  }
}
