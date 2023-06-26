function DVADrivingLicenceSubject(
  licenceNumber,
  birthDay,
  birthMonth,
  birthYear,
  licenceIssueDay,
  licenceIssueMonth,
  licenceIssueYear,
  consentDVACheckbox,
  middleNames,
  lastName,
  firstName,
  licenceValidToDay,
  licenceValidToMonth,
  licenceValidToYear,
  postcode
) {
  this.licenceNumber = licenceNumber || null;
  this.birthDay = birthDay || null;
  this.birthMonth = birthMonth || null;
  this.birthYear = birthYear || null;
  this.licenceIssueDay = licenceIssueDay || null;
  this.licenceIssueMonth = licenceIssueMonth || null;
  this.licenceIssueYear = licenceIssueYear || null;
  this.consentDVACheckbox = consentDVACheckbox || null;
  this.middleNames = middleNames || null;
  this.lastName = lastName || null;
  this.firstName = firstName || null;
  this.licenceValidToDay = licenceValidToDay || null;
  this.licenceValidToMonth = licenceValidToMonth || null;
  this.licenceValidToYear = licenceValidToYear || null;
  this.postcode = postcode || null;
}

DVADrivingLicenceSubject.prototype.getLicenceNumber = function () {
  return this.licenceNumber;
};

DVADrivingLicenceSubject.prototype.setLicenceNumber = function (licenceNumber) {
  this.licenceNumber = licenceNumber;
};

DVADrivingLicenceSubject.prototype.getBirthDay = function () {
  return this.birthDay;
};

DVADrivingLicenceSubject.prototype.setBirthDay = function (birthDay) {
  this.birthDay = birthDay;
};

DVADrivingLicenceSubject.prototype.getBirthMonth = function () {
  return this.birthMonth;
};

DVADrivingLicenceSubject.prototype.setBirthMonth = function (birthMonth) {
  this.birthMonth = birthMonth;
};

DVADrivingLicenceSubject.prototype.getBirthYear = function () {
  return this.birthYear;
};

DVADrivingLicenceSubject.prototype.setBirthYear = function (birthYear) {
  this.birthYear = birthYear;
};

DVADrivingLicenceSubject.prototype.getLicenceIssueDay = function () {
  return this.licenceIssueDay;
};

DVADrivingLicenceSubject.prototype.setLicenceIssueDay = function (
  licenceIssueDay
) {
  this.licenceIssueDay = licenceIssueDay;
};

DVADrivingLicenceSubject.prototype.getLicenceIssueMonth = function () {
  return this.licenceIssueMonth;
};

DVADrivingLicenceSubject.prototype.setLicenceIssueMonth = function (
  licenceIssueMonth
) {
  this.licenceIssueMonth = licenceIssueMonth;
};

DVADrivingLicenceSubject.prototype.getLicenceIssueYear = function () {
  return this.licenceIssueYear;
};

DVADrivingLicenceSubject.prototype.setLicenceIssueYear = function (
  licenceIssueYear
) {
  this.licenceIssueYear = licenceIssueYear;
};

DVADrivingLicenceSubject.prototype.getConsentDVACheckbox = function () {
  return this.consentDVACheckbox;
};

DVADrivingLicenceSubject.prototype.setConsentDVACheckbox = function (
  consentDVACheckbox
) {
  this.consentDVACheckbox = consentDVACheckbox;
};

DVADrivingLicenceSubject.prototype.getMiddleNames = function () {
  return this.middleNames;
};

DVADrivingLicenceSubject.prototype.setMiddleNames = function (middleNames) {
  this.middleNames = middleNames;
};

DVADrivingLicenceSubject.prototype.getLastName = function () {
  return this.lastName;
};

DVADrivingLicenceSubject.prototype.setLastName = function (lastName) {
  this.lastName = lastName;
};

DVADrivingLicenceSubject.prototype.getFirstName = function () {
  return this.firstName;
};

DVADrivingLicenceSubject.prototype.setFirstName = function (firstName) {
  this.firstName = firstName;
};

DVADrivingLicenceSubject.prototype.getLicenceValidToDay = function () {
  return this.licenceValidToDay;
};

DVADrivingLicenceSubject.prototype.setLicenceValidToDay = function (
  licenceValidToDay
) {
  this.licenceValidToDay = licenceValidToDay;
};

DVADrivingLicenceSubject.prototype.getLicenceValidToMonth = function () {
  return this.licenceValidToMonth;
};

DVADrivingLicenceSubject.prototype.setLicenceValidToMonth = function (
  licenceValidToMonth
) {
  this.licenceValidToMonth = licenceValidToMonth;
};

DVADrivingLicenceSubject.prototype.getLicenceValidToYear = function () {
  return this.licenceValidToYear;
};

DVADrivingLicenceSubject.prototype.setLicenceValidToYear = function (
  licenceValidToYear
) {
  this.licenceValidToYear = licenceValidToYear;
};

DVADrivingLicenceSubject.prototype.getPostcode = function () {
  return this.postcode;
};

DVADrivingLicenceSubject.prototype.setPostcode = function (postcode) {
  this.postcode = postcode;
};

DVADrivingLicenceSubject.prototype.equals = function (
  otherDVADrivingLicenceSubject
) {
  return (
    otherDVADrivingLicenceSubject.getLicenceNumber() ==
      this.getLicenceNumber() &&
    otherDVADrivingLicenceSubject.getBirthDay() == this.getBirthDay() &&
    otherDVADrivingLicenceSubject.getBirthMonth() == this.getBirthMonth() &&
    otherDVADrivingLicenceSubject.getBirthYear() == this.getBirthYear() &&
    otherDVADrivingLicenceSubject.getLicenceIssueDay() ==
      this.getLicenceIssueDay() &&
    otherDVADrivingLicenceSubject.getLicenceIssueMonth() ==
      this.getLicenceIssueMonth() &&
    otherDVADrivingLicenceSubject.getLicenceIssueYear() ==
      this.getLicenceIssueYear() &&
    otherDVADrivingLicenceSubject.getConsentDVACheckbox() ==
      this.getConsentDVACheckbox() &&
    otherDVADrivingLicenceSubject.getMiddleNames() == this.getMiddleNames() &&
    otherDVADrivingLicenceSubject.getLastName() == this.getLastName() &&
    otherDVADrivingLicenceSubject.getFirstName() == this.getFirstName() &&
    otherDVADrivingLicenceSubject.getLicenceValidToDay() ==
      this.getLicenceValidToDay() &&
    otherDVADrivingLicenceSubject.getLicenceValidToMonth() ==
      this.getLicenceValidToMonth() &&
    otherDVADrivingLicenceSubject.getLicenceValidToYear() ==
      this.getLicenceValidToYear() &&
    otherDVADrivingLicenceSubject.getPostcode() == this.getPostcode()
  );
};

DVADrivingLicenceSubject.prototype.fill = function (newFields) {
  for (var field in newFields) {
    if (
      Object.prototype.hasOwnProperty.call(this, field) &&
      Object.prototype.hasOwnProperty.call(newFields, field)
    ) {
      if (this[field] !== "undefined") {
        this[field] = newFields[field];
      }
    }
  }
};

module.exports = DVADrivingLicenceSubject;
