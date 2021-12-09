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
 * @description Defines the actions for the bible endpoint
 * @class BibleController
 */
class BibleController {
  /**
   *@description The bible class for BibleController
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof BibleController
   */


  /**
   *@description Get Bible Book
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, bible book
   *@memberof BibleController
   */
  static async getBibleBook(req, res) {
    const {
      version,
      book
    } = req.query;
    try {
      const bible = await Event.getBibleBook(version, book);
      const value = bible.body.data;
      const data = value != null ? value : 'No data available';
      return res
        .status(200)
        .json(responses.success(200, 'Bible Book successfully retrieved', data));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Get Bible Book
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, bible book
   *@memberof BibleController
   */
  static async getBibleBooks(req, res) {
    const {
      version,
    } = req.query;
    try {
      const bible = await Event.getBibleBooks(version);
      const value = bible.body.data;
      const data = value != null ? value : 'No data available';
      return res
        .status(200)
        .json(responses.success(200, 'Bible Book successfully retrieved', data));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Get Bible chapter
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, bible chapter
   *@memberof BibleController
   */
  static async getBibleChapter(req, res) {
    const {
      version,
      book,
      chapter,
    } = req.query;
    try {
      const bible = await Event.getBibleChapter(version, book, chapter);
      const value = bible.body.data;
      const data = value != null ? value : 'No data available';

      return res
        .status(200)
        .json(responses.success(200, 'Bible chapter successfully retrieved', data));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Get Bible verse
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, bible verse
   *@memberof BibleController
   */
  static async getBibleVerse(req, res) {
    const {
      version,
      book,
      chapter,
      verse
    } = req.query;

    try {
      const bible = await Event.getBibleVerse(version, book, chapter, verse);
      const value = bible.body.data;
      const data = value != null ? value : 'No data available';

      return res
        .status(200)
        .json(responses.success(200, 'Bible verse successfully retrieved', data));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }
  // getBibleBooks

  /**
   *@description Ping Server
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message
   *@memberof BibleController
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
   *@memberof BibleController
   */
  static async getAMessage(req, res) {
    const { id } = req.query;

    try {
      const message = await Event.getAMessage(id);
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
   *@memberof BibleController
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

export default BibleController;
