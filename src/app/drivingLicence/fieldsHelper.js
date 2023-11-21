const { validators } = require("hmpo-form-wizard/lib/validation");
const moment = require("moment");

module.exports = {
  surnameLengthValidator(_value, length, surnameField, licenceIssuerField) {
    const surname = this.values[surnameField];
    const issuer = this.values[licenceIssuerField];

    if (issuer === "DVA") {
      length = 25;
      //max length (43) passed in as parameter from fields.js is for DVLAs api
      //the above updates the max length to reflect what is expected for DVAs api
    }

    const surnameLength = validators.string(surname) ? surname.length : 0;

    const surnameMin = surnameLength > 0;
    const sNameMax = surnameLength <= length;

    return surnameMin && sNameMax;
  },
  firstNameLengthValidator(_value, length, firstNameField, licenceIssuerField) {
    const firstName = this.values[firstNameField];
    const issuer = this.values[licenceIssuerField];

    if (issuer === "DVA") {
      length = 18;
      //max length (43) passed in as parameter from fields.js is for DVLAs api
      //the above updates the max length to reflect what is expected for DVAs api
    }

    const firstNameLength = validators.string(firstName) ? firstName.length : 0;

    const firstNameMin = firstNameLength > 0;
    const fNameMax = firstNameLength <= length;

    return firstNameMin && fNameMax;
  },
  middleNamesLengthValidator(
    _value,
    length,
    middleNamesField,
    licenceIssuerField
  ) {
    const middleNames = this.values[middleNamesField];
    const issuer = this.values[licenceIssuerField];

    if (issuer === "DVA") {
      length = 18;
      //max length (43) passed in as parameter from fields.js is for DVLAs api
      //the above updates the max length to reflect what is expected for DVAs api
    }

    const middleNamesLength = validators.string(middleNames)
      ? middleNames.length
      : 0;

    const mNameMax = middleNamesLength <= length;

    return mNameMax;
  },
  firstNameMiddleNameLengthValidator(
    _value,
    length,
    firstNameField,
    middleNameField,
    licenceIssuerField
  ) {
    const firstName = this.values[firstNameField];
    const middleName = this.values[middleNameField];
    const issuer = this.values[licenceIssuerField];

    if (issuer === "DVA") {
      length = 38;
    }

    const middleNameLength = validators.string(middleName)
      ? middleName.length
      : 0;
    const firstNameLength = validators.string(firstName) ? firstName.length : 0;

    const singleName = firstNameLength === 0 || middleNameLength === 0;

    const extraCharacter = singleName ? 0 : 1;
    //This logic will add an extra character to nameMax (see below) if both first and
    //middle name fields are used, in order to ensure we remain within 38 characters limit

    const firstNameMin = firstNameLength > 0;
    const middleNameMin = middleNameLength > 0;
    const nameMin = firstNameMin || middleNameMin;
    const nameMax =
      firstNameLength + extraCharacter + middleNameLength <= length;

    return nameMin && nameMax;
  },
  dvlaValidator(
    _value,
    firstNameField,
    middleNameField,
    surnameField,
    dobField,
    licenceField
  ) {
    const firstName = this.values[firstNameField];
    const middleName = this.values[middleNameField];
    const surname = this.values[surnameField];
    const dob = this.values[dobField];
    const licence = this.values[licenceField];

    // eslint-disable-next-line no-unused-vars
    const nameShort =
      surname.length >= 5 ? surname.slice(0, 5) : surname.padEnd(5, "9");

    if (!dob) {
      return false;
    }
    const splitDate = dob.split("-");

    if (firstName) {
      var initialsShort = firstName.slice(0, 1);
      if (middleName) {
        initialsShort += middleName.slice(0, 1);
      } else {
        initialsShort += "9"; // eslint-disable-line
      }
    }

    // Checking the user surname matches licence number
    //const firstCheck = licence.slice(0, 5) === nameShort.toUpperCase();

    const secondCheck =
      licence.slice(5, 6) + licence.slice(10, 11) === splitDate[0].slice(2);
    const thirdCheck =
      licence.slice(6, 8) === splitDate[1] ||
      licence.slice(6, 8) ===
        String(
          parseInt(splitDate[1].slice(0, 1)) + 5 + splitDate[1].slice(1, 2)
        );
    const fourthCheck = licence.slice(8, 10) === splitDate[2];

    // Checking intials in licence number
    // const fifthCheck = initialsShort.toUpperCase() === licence.slice(11, 13);

    return secondCheck && thirdCheck && fourthCheck;
  },
  beforeNow(_value, timePeriod, timeUnit) {
    let dateFormat = "YYYY-MM-DD";
    let test = moment(_value, dateFormat);
    let comparator;
    // One additional day subtracted so that the check is inclusive of the current date minus X time
    comparator = moment().subtract(timePeriod, timeUnit).subtract(1, "days");

    return (
      _value === "" || (validators.date(_value) && test.isAfter(comparator))
    );
  }
};
