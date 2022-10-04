const { firstNameMiddleNameLengthValidator } = require("./fieldsHelper");

const firstNameMiddleNameLengthValidatorObj = {
  fn: firstNameMiddleNameLengthValidator,
  arguments: [30, "firstName", "middleNames"],
};

module.exports = {
  firstNameMiddleNameLengthValidator: firstNameMiddleNameLengthValidator,
  surname: {
      type: "text",
      validate: [
        "required",
        { type: "maxlength", arguments: [30] },
        { type: "regexDrivingLicence", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      ],
      journeyKey: "surname",
    },
    firstName: {
      type: "text",
      validate: [
        "required",
        { type: "maxlength", arguments: [30] },
        { type: "regexDrivingLicence", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
        {
          type: "firstNameMiddleNameLength",
          ...firstNameMiddleNameLengthValidatorObj,
        },
      ],
      journeyKey: "firstName",
    },
    middleNames: {
      type: "text",
      journeyKey: "middleNames",
      validate: [
        { type: "maxlength", arguments: [30] },
        { type: "regexDrivingLicence", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
        {
          type: "firstNameMiddleNameLength",
          ...firstNameMiddleNameLengthValidatorObj,
        },
      ],
    },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] },
    ],
  },
  issueDate: {
    type: "date",
    journeyKey: "issueDate",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] },
    ],
  },
  expiryDate: {
    type: "date",
    journeyKey: "expiryDate",
    validate: [
      "required",
      "date",
      {
        type: "after",
        arguments: [
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 18,
            new Date().getDate()
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ],
  },
  drivingLicenceNumber: {
    type: "text",
    journeyKey: "drivingLicenceNumber",
    validate: [
      "required"
    ],
    classes: "govuk-input--width-10",
  },
  issueNumber: {
    type: "text",
    journeyKey: "issueNumber",
    validate: [
      "required"
    ],
    classes: "govuk-input--width-10",
  },
  postcode: {
    type: "text",
    journeyKey: "postcode",
    validate: [
      "required",
      { type: "regexPostcode", fn: (value) => value.match(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/) },
    ],
    classes: "govuk-input--width-10",
  },
  proveAnotherWayRadio: {
    type: "radios",
    items: ["proveAnotherWay", "retry"],
    validate: ["required"],
  },
    licenceIssuerRadio: {
      type: "radios",
      label: "",
      legend: "",
      items: [{value:"DVLA"}, {value:"DVA"}, {divider: "Or"}, {value:"noLicence"}],
      validate: ["required"],
    },
};
