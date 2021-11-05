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

const mailjet = require('node-mailjet')
  .connect('acb15f6ba3f5163faa7eda63b49538ec', '04f6cd2f6facba7695ccf98afeefece6');

/**
 * @description Defines the actions to for the users endpoints
 * @class UsersController
 */
class UserController {
  /**
   *@description The user class
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created wallet
   *@memberof UsersController
   */


  /**
   *@description Creates a new User
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created User
   *@memberof UsersController
   */
  static async newUser(req, res) {
    const {
      email, password, full_name, phone
    } = req.body;

    if (!email || !password || !full_name || !phone) {
      return res
        .status(400)
        .json(responses.error(400, 'Kindly fill all required information'));
    }

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, this user already exist'));
      }
      const code = randomstring.generate({
        length: 4,
        charset: 'numeric',
      });

      const userObject = {
        email,
        password,
        full_name,
        phone,
        code
      };

      const createdUser = await User.create(userObject);
      if (createdUser) {
        const request = mailjet.post('send', { version: 'v3.1' }).request({
          Messages: [
            {
              From: {
                Email: 'test1@gmail.com',
                Name: 'Church Application',
              },
              To: [
                {
                  Email: email,
                  Name: `${full_name}`,
                },
              ],
              Subject: 'Account Verification',
              TextPart: 'Verify your account',
              HTMLPart: `<h3>Kindly use this OTP code - ${code} to verify your account`,
              CustomID: 'AppGettingStartedTest',
            },
          ],
        });
        request
          .then((result) => {
            console.log(result.body);
            return res
              .status(201)
              .json(responses.success(201, 'Account created, kindly proceed.', code));
          })
          .catch((err) => {
            console.log(err.statusCode);
            return res.status(500).json(responses.success(500, err));
          });
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Verify User Account
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created wallet
   *@memberof userController
   */

  static async verify(req, res) {
    const { code } = req.body;
    const updatedCode = '';
    const user = await User.findOne({ code });

    if (!user) {
      return res.status(404).json(responses.error(404, 'Invalid Code'));
    }

    const data = {
      account_verification: true,
      code: ''
    };
    const TokenData = {
      id: user._id,
      email: user.email,
    };

    //  Generate Token
    const token = await signToken(TokenData);


    await User.findOneAndUpdate(
      // eslint-disable-next-line no-undef
      { email: user.email },
      {
        account_verification: true,
        code: ''
      },
      {
        new: true,
      },
      (err, user) => {
        if (err) {
          console.log('Something wrong when updating data!');
          return res.status(500).json(responses.error(500, 'Something wrong when updating data!', err));
        } else {
          const userData = {
            user,
            token,
          };

          return res
            .status(200)
            .json(responses.success(200, 'Account verified successfully', userData));
        }
      }
    );
  }

  /**
   *@description Get a User
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created User
   *@memberof UsersController
   */
  static async getUser(req, res) {
    const { id } = req.user;

    try {
      const user = await User.findById({ _id: id });

      if (!user) {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, this user does not exist'));
      } else {
        return res
          .status(201)
          .json(responses.success(200, 'User successfully retrieved', user));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }

  /**
   *@description Complete user registration
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created User
   *@memberof UsersController
   */
  static async completeUserReg(req, res) {
    const {
      date_of_birth, church_group, branch, country
    } = req.body;
    const { id } = req.user;
    console.log(id);


    if (!date_of_birth || !church_group || !branch || !country) {
      return res
        .status(400)
        .json(responses.error(400, 'Kindly fill all required information'));
    }

    try {
      const user = await User.findById({ _id: id });

      if (!user) {
        return res
          .status(404)
          .json(responses.error(400, 'User does not exists'));
      }

      const userObject = {
        date_of_birth, church_group, branch, country
      };

      const updatedUser = await User.findOneAndUpdate({ _id: id }, userObject, { new: true, runValidators: true, });

      if (updatedUser) {
        return res
          .status(201)
          .json(responses.success(200, 'User successfully created', updatedUser));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }
}

export default UserController;
