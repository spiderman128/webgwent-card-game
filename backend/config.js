const Config = {};

Config.Server = {
  hostname: "127.0.0.1",
  port: 16918,
};

Config.WebServer = {
  port: 3000,
};

Config.SECRET = process.env.SECRET_KEY || "test";

Config.DB_URI =
  process.env.DATABASE_URL || "postgresql://postgres:password@localhost/gwent";

module.exports = Config;
