const { expect } = require("@playwright/test");

async function assertUrlPathContains(page, path) {
  const escapeRegExp = (string) => {
    return string.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  };
  const regex = new RegExp(escapeRegExp(path));
  await expect(page).toHaveURL(regex);
}

module.exports = { assertUrlPathContains };
