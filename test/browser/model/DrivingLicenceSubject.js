function DrivingLicenceSubject(
  licenceNumber,
  birthDay,
  birthMonth,
  birthYear,
  licenceIssueDay,
  licenceIssueMonth,
  licenceIssueYear,
  issueNumber,
  consentDVLACheckbox,
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
  this.issueNumber = issueNumber || null;
  this.consentDVLACheckbox = consentDVLACheckbox || null;
  this.middleNames = middleNames || null;
  this.lastName = lastName || null;
  this.firstName = firstName || null;
  this.licenceValidToDay = licenceValidToDay || null;
  this.licenceValidToMonth = licenceValidToMonth || null;
  this.licenceValidToYear = licenceValidToYear || null;
  this.postcode = postcode || null;
}

DrivingLicenceSubject.prototype.getLicenceNumber = function () {
  return this.licenceNumber;
};

DrivingLicenceSubject.prototype.setLicenceNumber = function (licenceNumber) {
  this.licenceNumber = licenceNumber;
};

DrivingLicenceSubject.prototype.getBirthDay = function () {
  return this.birthDay;
};

DrivingLicenceSubject.prototype.setBirthDay = function (birthDay) {
  this.birthDay = birthDay;
};

DrivingLicenceSubject.prototype.getBirthMonth = function () {
  return this.birthMonth;
};

DrivingLicenceSubject.prototype.setBirthMonth = function (birthMonth) {
  this.birthMonth = birthMonth;
};

DrivingLicenceSubject.prototype.getBirthYear = function () {
  return this.birthYear;
};

DrivingLicenceSubject.prototype.setBirthYear = function (birthYear) {
  this.birthYear = birthYear;
};

DrivingLicenceSubject.prototype.getLicenceIssueDay = function () {
  return this.licenceIssueDay;
};

DrivingLicenceSubject.prototype.setLicenceIssueDay = function (
  licenceIssueDay
) {
  this.licenceIssueDay = licenceIssueDay;
};

DrivingLicenceSubject.prototype.getLicenceIssueMonth = function () {
  return this.licenceIssueMonth;
};

DrivingLicenceSubject.prototype.setLicenceIssueMonth = function (
  licenceIssueMonth
) {
  this.licenceIssueMonth = licenceIssueMonth;
};

DrivingLicenceSubject.prototype.getLicenceIssueYear = function () {
  return this.licenceIssueYear;
};

DrivingLicenceSubject.prototype.setLicenceIssueYear = function (
  licenceIssueYear
) {
  this.licenceIssueYear = licenceIssueYear;
};

DrivingLicenceSubject.prototype.getIssueNumber = function () {
  return this.issueNumber;
};

DrivingLicenceSubject.prototype.setIssueNumber = function (issueNumber) {
  this.issueNumber = issueNumber;
};

DrivingLicenceSubject.prototype.getConsentDVLACheckbox = function () {
  return this.consentDVLACheckbox;
};

DrivingLicenceSubject.prototype.setConsentDVLACheckbox = function (
  consentDVLACheckbox
) {
  this.consentDVLACheckbox = consentDVLACheckbox;
};

DrivingLicenceSubject.prototype.getMiddleNames = function () {
  return this.middleNames;
};

DrivingLicenceSubject.prototype.setMiddleNames = function (middleNames) {
  this.middleNames = middleNames;
};

DrivingLicenceSubject.prototype.getLastName = function () {
  return this.lastName;
};

DrivingLicenceSubject.prototype.setLastName = function (lastName) {
  this.lastName = lastName;
};

DrivingLicenceSubject.prototype.getFirstName = function () {
  return this.firstName;
};

DrivingLicenceSubject.prototype.setFirstName = function (firstName) {
  this.firstName = firstName;
};

DrivingLicenceSubject.prototype.getLicenceValidToDay = function () {
  return this.licenceValidToDay;
};

DrivingLicenceSubject.prototype.setLicenceValidToDay = function (
  licenceValidToDay
) {
  this.licenceValidToDay = licenceValidToDay;
};

DrivingLicenceSubject.prototype.getLicenceValidToMonth = function () {
  return this.licenceValidToMonth;
};

DrivingLicenceSubject.prototype.setLicenceValidToMonth = function (
  licenceValidToMonth
) {
  this.licenceValidToMonth = licenceValidToMonth;
};

DrivingLicenceSubject.prototype.getLicenceValidToYear = function () {
  return this.licenceValidToYear;
};

DrivingLicenceSubject.prototype.setLicenceValidToYear = function (
  licenceValidToYear
) {
  this.licenceValidToYear = licenceValidToYear;
};

DrivingLicenceSubject.prototype.getPostcode = function () {
  return this.postcode;
};

DrivingLicenceSubject.prototype.setPostcode = function (postcode) {
  this.postcode = postcode;
};

DrivingLicenceSubject.prototype.equals = function (otherDrivingLicenceSubject) {
  return (
    otherDrivingLicenceSubject.getLicenceNumber() == this.getLicenceNumber() &&
    otherDrivingLicenceSubject.getBirthDay() == this.getBirthDay() &&
    otherDrivingLicenceSubject.getBirthMonth() == this.getBirthMonth() &&
    otherDrivingLicenceSubject.getBirthYear() == this.getBirthYear() &&
    otherDrivingLicenceSubject.getLicenceIssueDay() ==
      this.getLicenceIssueDay() &&
    otherDrivingLicenceSubject.getLicenceIssueMonth() ==
      this.getLicenceIssueMonth() &&
    otherDrivingLicenceSubject.getLicenceIssueYear() ==
      this.getLicenceIssueYear() &&
    otherDrivingLicenceSubject.getIssueNumber() == this.getIssueNumber() &&
    otherDrivingLicenceSubject.getConsentDVLACheckbox() ==
      this.getConsentDVLACheckbox() &&
    otherDrivingLicenceSubject.getMiddleNames() == this.getMiddleNames() &&
    otherDrivingLicenceSubject.getLastName() == this.getLastName() &&
    otherDrivingLicenceSubject.getFirstName() == this.getFirstName() &&
    otherDrivingLicenceSubject.getLicenceValidToDay() ==
      this.getLicenceValidToDay() &&
    otherDrivingLicenceSubject.getLicenceValidToMonth() ==
      this.getLicenceValidToMonth() &&
    otherDrivingLicenceSubject.getLicenceValidToYear() ==
      this.getLicenceValidToYear() &&
    otherDrivingLicenceSubject.getPostcode() == this.getPostcode()
  );
};

DrivingLicenceSubject.prototype.fill = function (newFields) {
  for (var field in newFields) {
    if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
      if (this[field] !== "undefined") {
        this[field] = newFields[field];
      }
    }
  }
};

module.exports = DrivingLicenceSubject;
