const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { CHECK },
  },
} = require("../../../lib/config");
const logger = require("hmpo-logger").get();

class ValidateController extends BaseController {
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
      issueDate: req.sessionModel.get("issueDate") || req.sessionModel.get("dateOfIssue"),
      licenceIssuer: req.sessionModel.get("licenceIssuer"),
    };

    try {
      const headers = {
        session_id: req.session.tokenId,
      };

      logger.info("validate: calling check-driving-licence lambda", {
        req,
        res,
      });
      const checkDrivingLicenceResponse = await req.axios.post(
        `${CHECK}`,
        attributes,
        { headers: headers }
      );

      if (checkDrivingLicenceResponse.data?.retry === true) {
        logger.info("validate: driving licence retry", { req, res });
        req.sessionModel.set("showRetryMessage", true);
        return callback();
      }

      const redirect_url = checkDrivingLicenceResponse?.data?.redirectUrl;
      logger.info("Validate: redirecting user to callBack with url ", {
        req,
        res,
      });

      super.saveValues(req, res, () => {
        if (!redirect_url) {
          const error = {
            error: "server_error",
            error_description: "Failed to retrieve authorization redirect url",
          };
          req.sessionModel.set("error", error);
          callback();
        } else {
          req.sessionModel.set("redirect_url", redirect_url);
          callback();
        }
      });
    } catch (error) {
      logger.error("error thrown in validate controller", { req, res, error });
      super.saveValues(req, res, () => {
        req.sessionModel.set("error", error.response.data);
        callback();
      });
    }
  }
}

module.exports = ValidateController;
