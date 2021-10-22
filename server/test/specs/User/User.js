/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-concat */
/* eslint-disable max-len */ /* eslint-disable no-unused-vars */
import { StatusCode as statusCode } from '../../../../StatusCode';

const mocha = require('mocha');
const User = require('../../actions/User/UserApiActions');
const data = require('../../testData/LoginUserInfo.js').UserLoginData;


describe('Performing CRUD Operations on User', () => {
  const { username, password } = data.USER_DETAILS;


  describe('POST Request: Create a User', () => {
    it('creating a User', async () => {
      const res = await User.createUser(username, password, role);
      res.status.should.equal(statusCode.CREATED);
    });
  });


});
