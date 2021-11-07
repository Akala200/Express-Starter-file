import config from '../config';

exports.myHeaders = {
  APPLICATION_JSON: { 'Content-Type': 'application/json' },
  ACCEPT_JSON: { Accept: 'application/json' },
  API_KEY: { api_key: `${config.user_service_key}` }
};

/** Status messages helps us to assert with the response status Messages * */

exports.statusMessages = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  ERROR: 'ERROR',
};
