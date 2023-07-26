const fields = require("./fieldsHelper");

const dvlaValidatorObj = {
  fn: fields.dvlaValidator,
  arguments: [
    "firstName",
    "middleNames",
    "surname",
    "dateOfBirth",
    "drivingLicenceNumber",
  ],
};

module.exports = {
  firstNameMiddleNameLengthValidator: fields.firstNameMiddleNameLengthValidator,
  dvlaValidator: fields.dvlaValidator,
  surname: {
    type: "text",
    validate: [
      "required",
      { type: "maxlength", arguments: [30] },
      { type: "regexSurname", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
    ],
    journeyKey: "surname",
  },
  firstName: {
    type: "text",
    validate: [
      "required",
      { type: "maxlength", arguments: [30] },
      { type: "regexFirstName", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
    ],
    journeyKey: "firstName",
  },
  middleNames: {
    type: "text",
    journeyKey: "middleNames",
    validate: [
      { type: "maxlength", arguments: [30] },
      {
        type: "regexMiddleNames",
        fn: (value) => value.match(/^[a-zA-Z .'-]*$/),
      },
    ],
  },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [] },
      {
        type: "dvlaChecker",
        ...dvlaValidatorObj,
      },
    ],
    dependent: { field: "issuerDependent", value: "DVLA" },
  },
  dvaDateOfBirth: {
    type: "date",
    journeyKey: "dvaDateOfBirth",
    validate: ["required", "date", { type: "before", arguments: [] }],
    dependent: { field: "issuerDependent", value: "DVA" },
  },
  issueDate: {
    type: "date",
    journeyKey: "issueDate",
    validate: [
      "required",
      "date",
      {
        type: "before",
        arguments: [],
      },
    ],
    dependent: { field: "issuerDependent", value: "DVLA" },
  },
  dateOfIssue: {
    type: "date",
    journeyKey: "dateOfIssue",
    validate: [
      "required",
      "date",
      {
        type: "before",
        arguments: [],
      },
    ],
    dependent: { field: "issuerDependent", value: "DVA" },
  },
  issuerDependent: {
    type: "hidden",
    label: "",
    legend: "",
  },
  expiryDate: {
    type: "date",
    journeyKey: "expiryDate",
    validate: [
      "required",
      "date",
      {
        type: "after",
        arguments: [],
      },
    ],
  },
  drivingLicenceNumber: {
    type: "text",
    journeyKey: "drivingLicenceNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [16] },
      {
        type: "regexSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z0-9]*$/),
      },
      {
        type: "regexDrivingLicence",
        fn: (value) =>
          value.match(
            /^(?=.{16}$)[A-Za-z]{1,5}9{0,4}[0-9](?:[05][1-9]|[16][0-2])(?:[0][1-9]|[12][0-9]|3[01])[0-9](?:99|[A-Za-z][A-Za-z9])(?![IOQYZioqyz01_])\w[A-Za-z]{2}$/
          ),
      },
      {
        type: "dvlaChecker",
        ...dvlaValidatorObj,
      },
    ],
    dependent: { field: "issuerDependent", value: "DVLA" },
    classes: "govuk-input--width-10",
  },
  dvaLicenceNumber: {
    type: "text",
    journeyKey: "dvaLicenceNumber",
    validate: [
      "required",
      {
        type: "regexSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z0-9]*$/),
      },
      { type: "numeric" },
      { type: "exactlength", arguments: [8] },
      { type: "regexDrivingLicence", fn: (value) => value.match(/^[0-9]{8}$/) },
    ],
    dependent: { field: "issuerDependent", value: "DVA" },
    classes: "govuk-input--width-10",
  },
  issueNumber: {
    type: "text",
    journeyKey: "issueNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [2] },
      {
        type: "regexSpecialCharacters",
        fn: (value) => value.match(/^[A-Za-z0-9]*$/),
      },
      { type: "numeric" },
      //{ type: "regexIssueNumber", fn: (value) => value.match(/^[0-9]{2}$/) }
    ],
    dependent: { field: "issuerDependent", value: "DVLA" },
    classes: "govuk-input--width-10",
  },
  postcode: {
    type: "text",
    journeyKey: "postcode",
    validate: [
      "required",
      { type: "maxlength", arguments: [8] },
      { type: "minlength", arguments: [5] },
      {
        type: "regexPostcodeSymbol",
        fn: (value) => value.match(/^[A-Za-z0-9 ]+$/),
      },
      { type: "regexPostcodeAlpha", fn: (value) => value.match(/[A-Za-z]+/) },
      { type: "regexPostcodeNumeric", fn: (value) => value.match(/[0-9]+/) },
      {
        type: "regexPostcodeUK",
        fn: (value) =>
          value.match(
            /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
          ),
      },
    ],
    classes: "govuk-input--width-10",
  },
  consentDVACheckbox: {
    type: "text",
    journeyKey: "consentDVACheckbox",
    validate: ["required"],
    dependent: { field: "issuerDependent", value: "DVA" },
  },
  consentCheckbox: {
    type: "text",
    journeyKey: "consentCheckbox",
    validate: ["required"],
    dependent: { field: "issuerDependent", value: "DVLA" },
  },
  proveAnotherWayRadio: {
    type: "radios",
    items: ["proveAnotherWay", "retry"],
    validate: ["required"],
  },
  licenceIssuer: {
    type: "radios",
    label: "",
    legend: "",
    items: [
      { value: "DVLA" },
      { value: "DVA" },
      { divider: true, key: "fields.licenceIssuer.items.or.label" },
      { value: "noLicence" },
    ],
    validate: ["required"],
  },
};
