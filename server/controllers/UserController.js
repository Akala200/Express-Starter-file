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

      const userObject = {
        email,
        password,
        full_name,
        phone
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
    const id = req.userId;


    if (!date_of_birth || !church_group || !branch || !country) {
      return res
        .status(400)
        .json(responses.error(400, 'Kindly fill all required information'));
    }

    try {
      const user = await User.findById({ id });

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
