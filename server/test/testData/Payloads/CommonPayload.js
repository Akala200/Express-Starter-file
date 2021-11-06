/* eslint-disable camelcase */
/** This module is user for creating the Body Structure
       this needs to be modified according to the api body structure * */

exports.getRequestBody = (username, password) => ({
  user: {
    username,
    password
  }
});

exports.userBody = (username, password) => ({
  username,
  password,
});
