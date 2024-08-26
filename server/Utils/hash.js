const bcryptjs = require("bcryptjs");
const hash = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};
const hashcmp = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};
module.exports = { hash, hashcmp };
