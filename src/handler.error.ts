import * as Sentry from '@sentry/node';

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
  if (res.headersSent) {
    next(err);
  }

  const statusCode = err.code || 500;
  const message: ArkErrorInterface = err.message || 'An error occurred';
  res.status(statusCode);

  // different errors and statuses
  if (statusCode < 500) return res.jsonp({ message, error: true });
  if (statusCode === 11000) return res.status(422).jsonp(getUniqueErrorMessage(err));
  Sentry.captureException(message);
  return res.jsonp({ error: true, statusCode, message });
}

export default errorHandler;