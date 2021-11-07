import config from '../config/index';

const apiCheck = (req, res, next) => {
  const authHeader = req.headers.api_key;

  if (authHeader) {
    if (authHeader !== config.api_key) {
      return res.sendStatus(401);
    }
    next();
  } else {
    res.sendStatus(401);
  }
};

export default apiCheck;
