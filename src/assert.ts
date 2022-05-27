import * as _ from 'lodash';

/**
 * Usage: assert(object,MyError,'optional message)
 * eg: assert(user,ArkValidationError,'User is not found)
 *  Must be used in conjunction with catchAsync
 *
 *
 export const profile = catchAsync(async (req: Request, res: Response) => {
    const user = await User.findById(req.user);
    assert(user, ErrorNotFound);
    return res.jsonp(user);
  });

 */

/**
 class T - placeholder
 **/
class T {}

/**
 * Checks if the first parameter is false, empty object, collection, map, or set. and returns error
 * @param value Object,string,number, boolean or string to be evaluated
 * @param error KError
 * @param message optionally a custom error message
 */
export const assert = (value, error: new (...any: unknown[]) => T, message = '') => {
  if (value === true || typeof value === 'number' || !_.isEmpty(value)) {
    return true;
  }
  throw new error(message);
};

/**
 * Generic Error for Ark
 */
export class KError extends Error {
  protected code: number;
}

/**
 * All other errors
 * @name ErrorOther
 */
export class ErrorOther extends KError {
  constructor(message) {
    super(message);
    this.name = 'ErrorOther';
    this.message = message || 'An Error Occurred';
    this.code = 500;
    Error.captureStackTrace(this, ErrorOther);
  }
}

/**
 * Errors for Validation
 */
export class ErrorValidation extends KError {
  constructor(message) {
    super(message);
    this.name = 'ErrorValidation';
    this.code = 422;
  }
}

/**
 * 404 not found error and when _id is not found in the database
 */
export class ErrorNotFound extends KError {
  constructor(message) {
    super(message);
    this.name = 'ErrorNotFound';
    this.code = 404;
    this.message = '404 Not Found';
    Error.captureStackTrace(this, ErrorNotFound);
  }
}

/**
 * Errors that will not send back as json header type
 * useful if the service is not an API
 * Can be use if the error responses are not content-type/json, eg: html responses
 */
export class ErrorTeapot extends KError {
  constructor(message) {
    super(message);
    this.name = 'ErrorTeapot';
    this.code = 418;
    this.message = message || 'ErrorTeapot';
    Error.captureStackTrace(this, ErrorTeapot);
  }
}

/**
 * Unauthorized Error
 */
export class ErrorInvalidToken extends KError {
  constructor(message) {
    super(message);
    this.name = 'ErrorInvalidToken';
    this.code = 401;
    this.message = 'JWT Token is invalid';
    Error.captureStackTrace(this, ErrorInvalidToken);
  }
}
