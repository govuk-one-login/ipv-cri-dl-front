const { Controller: BaseController } = require("hmpo-form-wizard");
const { APP } = require("../../../lib/config");
const { logger } = require("../../../lib/logger");

const {
  API: {
    PATHS: { PERSON_INFO }
  }
} = require("../../../lib/config");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    req.sessionModel.reset();
    req.sessionModel.set("isAuthSourceRoute", false);

    const headers = {
      session_id: req.session?.tokenId
    };

    if (APP.AUTH_SOURCE_ENABLED === "true") {
      //axios.post to new personInfo endpoint, put licence details into req.session.shared_claims shared claims
      const personInfoApiResponse = await req.axios.get(`${PERSON_INFO}`, {
        headers: headers
      });

      req.sessionModel.set(
        "isAuthSourceRoute",
        this.checkForValidSharedClaimsData(req, personInfoApiResponse)
      );

      if (req.sessionModel.get("isAuthSourceRoute") === true) {
        req.sessionModel.set(
          "drivingLicenceNumber",
          personInfoApiResponse.data.drivingPermit[0].personalNumber
        );

        req.sessionModel.set(
          "expiryDate",
          personInfoApiResponse.data.drivingPermit[0].expiryDate
        );

        req.sessionModel.set(
          "issueDate",
          personInfoApiResponse.data.drivingPermit[0].issueDate
        );

        req.sessionModel.set(
          "licenceIssuer",
          personInfoApiResponse.data.drivingPermit[0].issuedBy
        );

        req.sessionModel.set(
          "issuerDependent",
          req.sessionModel.get("licenceIssuer")
        );

        req.sessionModel.set(
          "postcode",
          personInfoApiResponse.data.address[0].postalCode
        );

        if (personInfoApiResponse.data.drivingPermit[0]?.issuedBy === "DVLA") {
          req.sessionModel.set(
            "issueNumber",
            personInfoApiResponse.data.drivingPermit[0].issueNumber
          );
        }

        this.setNames(req, personInfoApiResponse.data.name[0].nameParts);

        req.sessionModel.set(
          "dateOfBirth",
          personInfoApiResponse.data.birthDate[0].value
        );
      }
    }
    super.saveValues(req, res, next);
  }

  checkForValidSharedClaimsData(req, personInfoApiResponse) {
    if (
      undefined === personInfoApiResponse?.data?.drivingPermit ||
      "" === personInfoApiResponse?.data?.drivingPermit
    ) {
      logger.warn(
        "Root controller: drivingPermit data missing from API response"
      );
      return false;
    } else {
      const drivingPermit = personInfoApiResponse?.data?.drivingPermit[0];
      if (
        undefined === drivingPermit?.personalNumber ||
        "" === drivingPermit?.personalNumber
      ) {
        logger.warn(
          "Root controller: drivingPermit personalNumber data missing from API response"
        );
        return false;
      }

      if (
        undefined === drivingPermit?.expiryDate ||
        "" === drivingPermit?.expiryDate
      ) {
        logger.warn(
          "Root controller: drivingPermit expiryDate data missing from API response"
        );
        return false;
      }

      if (
        undefined === drivingPermit?.issueDate ||
        "" === drivingPermit?.issueDate
      ) {
        logger.warn(
          "Root controller: drivingPermit issueDate data missing from API response"
        );
        return false;
      }

      if (
        undefined === drivingPermit?.issuedBy ||
        "" === drivingPermit?.issuedBy
      ) {
        logger.warn(
          "Root controller: drivingPermit issuedBy data missing from API response"
        );
        return false;
      }

      if (drivingPermit?.issuedBy === "DVLA") {
        if (
          undefined === drivingPermit?.issueNumber ||
          "" === drivingPermit?.issueNumber
        ) {
          logger.warn(
            "Root controller: drivingPermit issueNumber data missing from API response"
          );
          return false;
        }
      }
    }

    if (
      undefined === personInfoApiResponse?.data?.address ||
      "" === personInfoApiResponse?.data?.address
    ) {
      logger.warn("Root controller: address data missing from API response");
      return false;
    } else {
      const address = personInfoApiResponse?.data?.address[0];
      if (undefined === address?.postalCode || "" === address?.postalCode) {
        logger.warn(
          "Root controller: address postalCode data missing from API response"
        );
        return false;
      }
    }

    if (
      undefined === personInfoApiResponse?.data?.birthDate ||
      "" === personInfoApiResponse?.data?.birthDate
    ) {
      logger.warn("Root controller: birthDate data missing from API response");
      return false;
    } else {
      const birthDate = personInfoApiResponse?.data?.birthDate[0];
      if (undefined === birthDate.value || "" === birthDate.value) {
        logger.warn(
          "Root controller: birthDate value data missing from API response"
        );
        return false;
      }
    }

    if (
      undefined === personInfoApiResponse?.data?.name ||
      "" === personInfoApiResponse?.data?.name
    ) {
      logger.warn("Root controller: name data missing from API response");
      return false;
    } else {
      const name = personInfoApiResponse?.data?.name[0];
      if (undefined === name?.nameParts || "" === name?.nameParts) {
        logger.warn(
          "Root controller: nameParts data missing from API response"
        );
        return false;
      } else {
        const namePart = name?.nameParts[0];
        if (undefined === namePart || "" === namePart) {
          logger.warn(
            "Root controller: namePart data missing from API response"
          );
          return false;
        }
        for (let i = 0; i < namePart.length; i++) {
          if (undefined === namePart[i] || "" === namePart[i]) {
            logger.warn(
              "Root controller: namePart value missing from API response"
            );
            return false;
          }
        }
      }
    }

    logger.warn(
      "Root Controller: Valid Shared Claims and Context Value, isAuthSourceRoute set to true"
    );
    return true;
  }

  async setNames(req, nameParts) {
    const givenNames = nameParts
      .filter((part) => part.type === "GivenName")
      .map((part) => part.value);

    const familyNames = nameParts
      .filter((part) => part.type === "FamilyName")
      .map((part) => part.value)
      .join(" ");

    req.sessionModel.set("firstName", givenNames[0]);

    givenNames.shift();
    const middleNames = givenNames.join(" ");

    req.sessionModel.set("middleNames", middleNames);

    req.sessionModel.set("surname", familyNames);
  }
}

module.exports = RootController;
