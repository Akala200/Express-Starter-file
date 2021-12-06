/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import tracelogger from '../logger/tracelogger';
import responses from '../utils/responses';
import Event from '../request/apostledeck/api_actions';


/**
 * @description Defines the actions to for the Ping endpoint
 * @class ApostleDeskController
 */
class ApostleDeskController {
  /**
   *@description The Ping class for ApostleDeskController
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof ApostleDeskController
   */


  /**
   *@description Ping Server
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof ApostleDeskController
   */
  static async getAllEvent(req, res) {
    try {
      const event = await Event.getEventList();
      console.log(event.data);
      const data = event.body.data;

      return res
        .status(200)
        .json(responses.success(200, 'Events successfully retrieved', data));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Ping Server
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof ApostleDeskController
   */
  static async getAllMessage(req, res) {
    try {
      const event = await Event.getMessages();
      const data = event.body.data;

      return res
        .status(200)
        .json(responses.success(200, 'Messages successfully retrieved', data));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Ping Server
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof ApostleDeskController
   */
  static async getAMessage(req, res) {
    try {
      const message = await Event.getAMessage();
      const data = message.body.data;

      return res
        .status(200)
        .json(responses.success(200, 'Message successfully retrieved', data));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Ping Server
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof ApostleDeskController
   */
  static async getContent(req, res) {
    const { message } = req.query;

    try {
      const content = await Event.getContent(message);
      const data = content.body.data;

      return res
        .status(200)
        .json(responses.success(200, 'Content successfully retrieved', data));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }
}

export default ApostleDeskController;
