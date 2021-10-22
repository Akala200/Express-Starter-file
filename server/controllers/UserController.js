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
      username, password, role
    } = req.body;

    if (!username || !password || !role) {
      return res
        .status(400)
        .json(responses.error(400, 'Kindly fill all required information'));
    }

    try {
      console.log('here');
      const user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, this user already exist'));
      }

      const userObject = {
        username,
        password,
        role,
      };

      const createdUser = await User.create(userObject);
      if (createdUser) {
        return res
          .status(201)
          .json(responses.success(201, 'User successfully created', createdUser));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }

  /**
   *@description Login into user account
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created wallet
   *@memberof userController
   */

  static async login(req, res) {
    let user;
    const { username, password } = req.body;

    try {
      user = await User.findOne({ username });
    } catch (error) {
      return res
        .status(500)
        .json(responses.error(500, { msg: 'Server error' }));
    }

    if (!user) {
      return res.status(401).json(responses.error(401, 'Unable to login'));
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json(responses.error(401, 'Unable to login'));
    }

    const TokenData = {
      id: user._id,
      username,
    };

    //  Generate Token
    const token = await signToken(TokenData);

    const userData = {
      username: user.username,
      deposit: user.deposit,
      role: user.role,
      id: user._id,
      token,
    };

    return res
      .status(200)
      .json(responses.success(200, 'Login successfully', userData));
  }
 
}

export default UserController;
