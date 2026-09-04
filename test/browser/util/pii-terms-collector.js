const { dvlaTestUsers, dvaTestUsers } = require("./test-data-creator");

const MIN_TERM_LENGTH = 4;

const pad = (value) => {
  if (!value) return "00";
  return value.length === 1 ? `0${value}` : value;
};

const fullDob = (user) => {
  if (!user.birthYear) return null;
  return `${user.birthYear}-${pad(user.birthMonth)}-${pad(user.birthDay)}`;
};

const extractPiiTerms = (user) => [
  user.firstName,
  user.lastName,
  user.middleNames,
  user.licenceNumber,
  user.postcode,
  fullDob(user)
];

const collectFromAllTestUsers = () => {
  const allUsers = [
    ...Object.values(dvlaTestUsers),
    ...Object.values(dvaTestUsers)
  ];

  return new Set(
    allUsers
      .flatMap(extractPiiTerms)
      .filter((term) => term && term.length >= MIN_TERM_LENGTH)
  );
};

module.exports = { collectFromAllTestUsers };
