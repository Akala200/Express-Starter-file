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


/**
 * @description Defines the actions to for the Ping endpoint
 * @class PingController
 */
class PingController {
  /**
   *@description The Ping class for PingController
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof PingController
   */


  /**
   *@description Ping Server
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof PingController
   */
  static async pingHeroku(req, res) {
    const { id } = req.query;

    try {
      return res
        .status(200)
        .json(responses.success(200, 'Ponging the server'));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }
}

export default PingController;
