const { Controller: BaseController } = require("hmpo-form-wizard");

const {
  APP,
  API: {
    PATHS: { PERSON_INFO }
  }
} = require("../../../lib/config");
const LOGGER = require("../../../utils/logger");

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

        await this.setNames(req, personInfoApiResponse.data.name[0].nameParts);

        req.sessionModel.set(
          "dateOfBirth",
          personInfoApiResponse.data.birthDate[0].value
        );
      }
    }
    super.saveValues(req, res, next);
  }

  checkForValidSharedClaimsData(req, personInfoApiResponse) {
    const data = personInfoApiResponse?.data;
    const drivingPermit = data?.drivingPermit?.[0];
    const address = data?.address?.[0];
    const birthDate = data?.birthDate?.[0];
    const name = data?.name?.[0];

    const requiredFields = [
      ["drivingPermit", data?.drivingPermit],
      ["drivingPermit.personalNumber", drivingPermit?.personalNumber],
      ["drivingPermit.expiryDate", drivingPermit?.expiryDate],
      ["drivingPermit.issueDate", drivingPermit?.issueDate],
      ["drivingPermit.issuedBy", drivingPermit?.issuedBy],
      ...(drivingPermit?.issuedBy === "DVLA"
        ? [["drivingPermit.issueNumber", drivingPermit?.issueNumber]]
        : []),
      ["address", data?.address],
      ["address.postalCode", address?.postalCode],
      ["birthDate", data?.birthDate],
      ["birthDate.value", birthDate?.value],
      ["name", data?.name],
      ["name.nameParts", name?.nameParts]
    ];

    for (const [field, value] of requiredFields) {
      if (value === undefined || value === "") {
        LOGGER.warn(`root: ${field} missing from API response`);
        return false;
      }
    }

    if (name.nameParts[0] === undefined) {
      LOGGER.warn("root: name.nameParts[0] missing from API response");
      return false;
    }

    LOGGER.info(
      "root: valid shared claims and context, isAuthSourceRoute set to true"
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
