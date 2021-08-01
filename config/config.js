const set = require('../set-ups/setting');

module.exports = {
  "development": {
    "username": process.env._USER_,
    "password": process.env._PASS_,
    "database": process.env._DBNAME_,
    "host": process.env._HOST_,
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