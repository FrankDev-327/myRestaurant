var set = require('../set-ups/setting');

module.exports = {
  "development": {
    "username": set.username,
    "password": set.password,
    "database": set.database,
    "host": set.host,
    "dialect": "postgres",
    "use_env_variable": set.dataurl
  }
}