/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */


const supertest = require('supertest');
const should = require('should');
const baseActions = require('../common/BaseActions');
const baseURLMapper = require('../../../../UrlMapper').UrlMapper;
const reqBody = require('../../testData/Payloads/CommonPayload');


/** This createUser will help us to create a user with user-id and user name as a request body
        this request body can be changed as per your project api * */


exports.createUser = async function (username, password, role) {
  const requestBody = reqBody.userBody(username, password, role);
  URL = baseActions.getBaseURL();
  console.log(URL + baseURLMapper.CREATE, requestBody);
  const res = await baseActions.sendPOSTRequest(URL, baseURLMapper.CREATE, requestBody);
  return res;
};
exports.loginUser = async function (username, password) {
  const requestBody = reqBody.userBody(username, password);
  URL = baseActions.getBaseURL();
  console.log(URL + baseURLMapper.LOGIN, requestBody);
  const res = await baseActions.sendPOSTRequest(URL, baseURLMapper.LOGIN, requestBody);
  return res;
};

/** This getUserList will help us in getting all the users that are present in the database * */