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
import randomstring from 'randomstring';
import { signToken } from '../utils/storeToken';
import User from '../models/Users';
import tracelogger from '../logger/tracelogger';
import responses from '../utils/responses';

const axios = require('axios').default;

const NodeGoogleLogin = require('node-google-login');
const mailjet = require('node-mailjet')
  .connect('67a7d92c947e039b9cda7c8d96cda4d3', '7ed03cd715282523453cbf5a87940d0a');

const config = {
  clientID: '874343667104-gvtprv5do8dht2g9e15kpon152etlt5t.apps.googleusercontent.com',
  clientSecret: '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',
  redirectURL: 'https://createapp22.herokuapp.com/api/auth/google/verification',
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
   *@returns {object} - status code, message and Login into user account manually response
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

  /**
   *@description Generate Google Auth Link
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and Generate Google Auth Link response
   *@memberof userController
   */
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


  /**
   *@description Google redirect
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and response
   *@memberof userController
   */
  static async googleRedirect(req, res) {
    let user;
    const data = await googleLogin.getUserProfile('AUTH_CODE');
    console.log(data);
  }


  /**
   *@description Google redirect
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and response
   *@memberof userController
   */
  static async facebookAuth(req, res) {
    const { token } = req.body;
    try {
      const response = await axios.get(`https://graph.facebook.com/USER-ID?fields=id,name,email,picture,phone&access_token=${token}`);
      console.log(response);
      const user = await User.findOne({ email: response.email });
      if (user) {
        const TokenData = {
          id: user._id,
          email: user.email,
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
      } else {
        const userObject = {
          email: response.email != null ? response.email : '',
          full_name: response.name != null ? response.name : '',
          phone: response.phone != null ? response.phone : '',
          avartar: response.picture.data.url != null ? response.picture.data.url : '',

        };

        const createdUser = await User.create(userObject);
        if (createdUser) {
          return res
            .status(201)
            .json(responses.success(201, 'Account created, kindly proceed', createdUser));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }


  /**
   *@description Initiate   Reset Password
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and Reset Password response
   *@memberof userController
   */

  static async forgetPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, user does not exist'));
      }
      const code = randomstring.generate({
        length: 4,
        charset: 'numeric',
      });

      const uObject = {
        code,
      };

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        uObject,
        { new: true }
      );

      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'testlag222@gmail.com',
              Name: 'test'
            },
            To: [
              {
                Email: updatedUser.email,
                Name: `${updatedUser.full_name}`,
              },
            ],
            Subject: 'Forgot Password',
            TextPart: 'Forgot Password has been Initiated',
            HTMLPart: `<h3>Kindly use this OTP code - ${code} to verify your account`,
            CustomID: 'AppGettingStartedTest',
          },
        ],
      });
      request
        .then((result) => {
          console.log(result.body);
          return res
            .status(200)
            .json(responses.success(200, 'Password Reset Initiated Successfully'));
        })
        .catch((err) => {
          console.log(err.statusCode);
          return res.status(500).json(responses.error(500, err));
        });
    } catch (error) {
      tracelogger(error);
      return res.status(500).json(responses.error(500, error));
    }
  }


  /**
   *@description Reset password completed
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and Reset password completed response
   *@memberof UsersController
   */
  static async confirmPassword(req, res) {
    const { code, new_password } = req.body;
    try {
      const user = await User.findOne({ code });

      if (!user) {
        return res.status(401).json(responses.error(401, 'Invalid Code'));
      }

      // Find a user from token
      User.findOne({ email: user.email }).then((user) => {
        // Save the new password

        user.password = new_password;
        user.save((err) => {
          if (err) {
            return res
              .status(500)
              .send({ msg: 'Error in saving the password' });
          }
          return res.status(200).json(responses.error(200, 'Password changed'));
        });
      });
    } catch (error) {
      return res.status(500).send({ msg: 'Error in saving the password' });
    }
  }


  /**
   *@description Resend code
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and Resend code response
   *@memberof UsersController
   */
  static async resendCode(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json(responses.error(404, 'User does not exist'));
      }

      if (user.code === '' || user.code == null) {
        return res.status(400).json(responses.error(400, '  Password reset not initiated'));
      }

      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'testlag222@gmail.com',
              Name: 'test'
            },
            To: [
              {
                Email: user.email,
                Name: `${user.full_name}`,
              },
            ],
            Subject: 'Forgot Password',
            TextPart: 'Forgot Password has been Initiated',
            HTMLPart: `<h3>Kindly use this OTP code - ${user.code} to verify your account`,
            CustomID: 'AppGettingStartedTest',
          },
        ],
      });
      request
        .then((result) => {
          console.log(result.body);
          return res
            .status(200)
            .json(responses.success(200, 'Password Reset Initiated Successfully'));
        })
        .catch((err) => {
          console.log(err.statusCode);
          return res.status(500).json(responses.error(500, err));
        });
    } catch (error) {
      return res.status(500).send({ msg: 'Error in saving the password' });
    }
  }
}
export default AuthController;
