/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */

const supertest = require('supertest');
const should = require('should');
const baseActions = require('./requests');
const baseURLMapper = require('../../../UrlMapper').UrlMapper;


/** This getUserList will help us in getting all the users that are present in the database * */

exports.getUserList = async function (token) {
  URL = baseActions.getBaseURL();
  const res = await baseActions.sendGETRequest(URL, baseURLMapper.ALLUSER);
  return res;
};
