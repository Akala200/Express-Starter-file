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
  const res = await baseActions.sendGETRequest(URL, baseURLMapper.ALL_MESSAGE, config.Desk_api);
  return res;
};

exports.getAMessage = async function (id) {
  URL = config.Desk_base_url;
  const res = await baseActions.sendGETRequest(URL, `${baseURLMapper.ONE_MESSAGE}?id=${id}`, config.Desk_api);
  return res;
};


exports.getContent = async function (message) {
  URL = config.Desk_base_url;
  const res = await baseActions.sendGETRequest(URL, `${baseURLMapper.CONTENT}?message=${message}`, config.Desk_api);
  return res;
};

exports.getBibleBook = async function (version, book) {
  URL = config.Bible_base_url;
  const res = await baseActions.sendGETRequest(URL, `${baseURLMapper.BIBLE_BOOK}?version=${version}&book=${book}`, config.Bible_api);
  return res;
};

exports.getBibleBooks = async function (version) {
  URL = config.Bible_base_url;
  const res = await baseActions.sendGETRequest(URL, `${baseURLMapper.BIBLE_TITLE}?version=${version}`, config.Bible_api);
  return res;
};


exports.getBibleChapter = async function (version, book, chapter) {
  URL = config.Bible_base_url;
  const res = await baseActions.sendGETRequest(URL, `${baseURLMapper.BIBLE_CHAPTER}?version=${version}&book=${book}&chapter=${chapter}`, config.Bible_api);
  return res;
};

exports.getBibleVerse = async function (version, book, chapter, verse) {
  URL = config.Bible_base_url;
  const res = await baseActions.sendGETRequest(URL, `${baseURLMapper.BIBLE_VERSE}?version=${version}&book=${book}&chapter=${chapter}&verse=${verse}`, config.Bible_api);
  return res;
};
