/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import { signToken } from '../utils/storeToken';
import User from '../models/Users';
import tracelogger from '../logger/tracelogger';
import responses from '../utils/responses';

const NodeGoogleLogin = require('node-google-login');

const config = {
  clientID: '874343667104-gvtprv5do8dht2g9e15kpon152etlt5t.apps.googleusercontent.com',
  clientSecret: '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',
  redirectURL: 'https://createapp22.herokuapp.com/api/google/verification',
  defaultScope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ]
};
const googleLogin = new NodeGoogleLogin(config);

/**
 * @description Defines the actions to for the users endpoints
 * @class UsersController
 */
class AuthController {
  /**
   *@description The authentication class
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created wallet
   *@memberof UsersController
   */

  /**
   *@description Login into user account manually
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created wallet
   *@memberof userController
   */

  static async manualLogin(req, res) {
    let user;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(responses.error(400, 'Kindly fill all required information'));
    }
    try {
      user = await User.findOne({ email });
    } catch (error) {
      return res
        .status(500)
        .json(responses.error(500, { msg: 'Server error' }));
    }

    if (!user) {
      return res.status(401).json(responses.error(401, 'Unable to login'));
    }


    if (user.account_verification === false) {
      return res.status(400).json(responses.error(400, 'Kindly verify your account'));
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json(responses.error(401, 'Unable to login'));
    }

    const TokenData = {
      id: user._id,
      email,
    };

    //  Generate Token
    const token = await signToken(TokenData);

    const userData = {
      user,
      token,
    };

    return res
      .status(200)
      .json(responses.success(200, 'Login successfully', userData));
  }


  static async generateAuthGoogleUrl(req, res) {
    try {
      const authURL = googleLogin.generateAuthUrl();
      console.log(authURL);

      return res
        .status(200)
        .json(responses.success(200, 'auth url received', authURL));
    } catch (error) {
      return res
        .status(500)
        .json(responses.error(500, { msg: 'Server error' }));
    }
  }

  static async googleRedirect(req, res) {
    let user;
    const data = await googleLogin.getUserProfile('AUTH_CODE');
    console.log(data);
  }
}

export default AuthController;
