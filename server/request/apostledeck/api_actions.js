/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */

import config from '../../config/index';

const supertest = require('supertest');
const should = require('should');
const baseActions = require('./requests');
const baseURLMapper = require('../../../UrlMapper').UrlMapper;


/** This getUserList will help us in getting all the users that are present in the database * */

exports.getEventList = async function () {
  URL = config.Event_base_url;
  const res = await baseActions.sendGETRequest(URL, baseURLMapper.EVENT, config.Event_api);
  return res;
};


exports.getMessages = async function () {
  URL = config.Desk_base_url;
  const res = await baseActions.sendGETRequest(URL, baseURLMapper.MESSAGE, config.Desk_api);
  return res;
};

exports.getAMessage = async function () {
  URL = config.Desk_base_url;
  const res = await baseActions.sendGETRequest(URL, baseURLMapper.A_MESSAGE, config.Desk_api);
  return res;
};


exports.getContent = async function (message) {
  URL = config.Desk_base_url;
  const res = await baseActions.sendGETRequest(URL, `${baseURLMapper.CONTENT}?message=${message}`, config.Desk_api);
  return res;
};
