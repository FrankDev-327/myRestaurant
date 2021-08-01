const set = require('../set-ups/setting');

module.exports = {
  "development": {
    "username": set.username,
    "password": set.password,
    "database": set.database,
    "host": set.host,
    "dialect": "postgres",
    "use_env_variable": set.dataurl
  },
/*   "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  } */
}