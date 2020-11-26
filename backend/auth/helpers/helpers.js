const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
} = require("../../config");

/** return signed JWT from user data. */

function createAccessToken(user) {
  let payload = {
    username: user.username,
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_LIFE,
  });
}

function createRefreshToken(user) {
  let payload = {
    username: user.username,
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFE,
  });
}

module.exports = { createAccessToken, createRefreshToken };
