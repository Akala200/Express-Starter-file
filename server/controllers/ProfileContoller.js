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
  .connect('67a7d92c947e039b9cda7c8d96cda4d3', '7ed03cd715282523453cbf5a87940d0a');

/**
 * @description Defines the actions to for the users endpoints
 * @class ProfileContoller
 */
class ProfileContoller {
  /**
   *@description The user class
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created wallet
   *@memberof ProfileContoller
   */


  /**
   *@description Get a User
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created User
   *@memberof ProfileContoller
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
   *@description Update a user profile
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and Updated user profile
   *@memberof ProfileContoller
   */
  static async updateUser(req, res) {
    const { id } = req.user;
    if (!req.body) {
      return res
        .status(400)
        .json(responses.error(400, 'Data to update can not be empty!'));
    }

    if (req.body.email) {
      return res
        .status(400)
        .json(responses.error(400, 'You need to verify the email before you can update it!'));
    }
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );

      if (updatedUser) {
        return res
          .status(200)
          .json(responses.success(200, 'User successfully updated', updatedUser));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }
}

export default ProfileContoller;
