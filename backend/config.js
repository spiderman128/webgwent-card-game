const Config = {};

Config.WebServer = {
  port: process.env.PORT || 8000,
};

Config.SECRET = process.env.SECRET_KEY || "test";

Config.ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "accesstokensecret";
Config.REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refreshtokensecret";
Config.ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || 3600;
Config.REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || 86400;

Config.DB_URI =
  process.env.DATABASE_URL || "postgresql://postgres:password@localhost/gwent";

module.exports = Config;
