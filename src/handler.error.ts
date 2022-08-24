import * as Sentry from '@sentry/node';
import { dconsole } from './console';

interface ArkErrorInterface {
  error: boolean;
  message: string;
}

/**
 * Get friendly unique error from Mongodb
 * @param err
 */
function getUniqueErrorMessage(err): ArkErrorInterface {
  const key = Object.keys(err.keyPattern)[0];
  const value = Object.values(err.keyValue)[0];
  const message = `${key} (${value}) already exists`;
  return { message, error: true };
}

/**
 * Global Error for express, all errors from catchAsync will go to this handler
 * @param err Error/ArkError
 * @param req Express Request
 * @param res Express Response
 * @param next Express Next
 */
// eslint-disable-next-line consistent-return
function errorHandler(err, req, res, next) {
  if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  if (res.headersSent) {
    next(err);
  }

  const validStatusCode = [
    200, 201, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306,
    307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416,
    417, 418, 420, 422, 423, 424, 425, 426, 428, 429, 431, 444, 449, 450, 451, 499, 500, 501, 502,
    503, 504, 505, 506, 507, 508, 509, 510, 511, 598, 599,
  ];

  const statusCode =
    validStatusCode.includes(err?.code || 500) && Object.prototype.hasOwnProperty.call(err, 'code')
      ? err.code
      : 500;
  const message: ArkErrorInterface = err.message || 'An error occurred';

  res.status(statusCode);

  // dev only
  dconsole(message);

  // different errors and statuses
  if (statusCode === 418 && err.name === 'ArkErrorTeapot') return res.render('error', { message });
  else if (statusCode < 500) return res.jsonp({ message, error: true });
  else if (statusCode === 11000) return res.status(422).jsonp(getUniqueErrorMessage(err));
  else if (err.name === 'JsonWebTokenError') {
    return res.status(401).jsonp({ message: 'Invalid JWT', error: true });
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(422).jsonp({ message: 'Maximum file is only 20MB.', error: true });
  } else {
    // render html for teapot error
    // we are only going to send sentry errors for errors below
    Sentry.captureException(message);

    return res.jsonp({ error: true, statusCode, message });
  }
}

export default errorHandler;
