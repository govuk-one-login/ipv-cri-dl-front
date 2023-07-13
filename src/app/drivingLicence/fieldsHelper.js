const { validators } = require("hmpo-form-wizard/lib/validation");
const moment = require("moment");

module.exports = {
  firstNameMiddleNameLengthValidator(
    _value,
    length,
    firstNameField,
    middleNameField
  ) {
    const firstName = this.values[firstNameField];
    const middleName = this.values[middleNameField];

    const middleNameLength = validators.string(middleName)
      ? middleName.length
      : 0;
    const firstNameLength = validators.string(firstName) ? firstName.length : 0;

    return middleNameLength + firstNameLength <= length;
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
  getToday(_value, offset) {
    return moment
      .utc()
      .add(offset || 0, "days")
      .format("YYYY-MM-DD");
  },
};
