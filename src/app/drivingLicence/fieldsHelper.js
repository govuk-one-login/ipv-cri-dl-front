const { validators } = require("hmpo-form-wizard/lib/validation");

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
//    firstNameField,
//    middleNameField,
//    lastNameField,
    dobField,
    licenceField
  ) {
//    const firstName = this.values[firstNameField];
//    const middleName = this.values[middleNameField];
//    const lastName = this.values[lastNameField];
    const dob = this.values[dobField];
    const licence = this.values[licenceField];

//    const nameShort = lastName.length > 5 ? lastName.slice(0,5) : lastName.padEnd(5, '9')
    const splitDate = dob.split("-");
//    const initialsShort = firstName.slice(0, 2) + (middleName.length > 0 ? middleName.slice(0, 2) : '99')

//    const firstCheck = licence.slice(0,5) === nameShort
    const secondCheck = (licence.slice(5,6) + licence.slice(10,11)) === splitDate[0].slice(2);
    const thirdCheck = (licence.slice(6,8) === splitDate[1]) || (licence.slice(6,8) === String(parseInt(splitDate[1]) + 50));
    const fourthCheck = licence.slice(8,10) === splitDate[2];

    return secondCheck && thirdCheck && fourthCheck;
  }
};
