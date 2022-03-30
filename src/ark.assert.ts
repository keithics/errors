import * as _ from 'lodash';

/**
 * Usage: arkAssert(object,MyError,'optional message)
 * eg: arkAssert(user,ArkValidationError,'User is not found)
 *  Must be used in conjunction with catchAsync
 *
 *
 export const profile = catchAsync(async (req: Request, res: Response) => {
    const user = await User.findById(req.user);
    arkAssert(user, ArkErrorNotFound);
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
 * @param error ArkError
 * @param message optionally a custom error message
 */
export const arkAssert = (value, error: new (...any: unknown[]) => T, message = '') => {
  if (value === true || typeof value === 'number' || !_.isEmpty(value)) {
    return true;
  }
  throw new error(message);
};

/**
 * Generic Error for Ark
 */
export class ArkError extends Error {
  protected code: number;
}

/**
 * All other errors
 * @name ArkErrorValidation
 */
export class ArkErrorOther extends ArkError {
  constructor(message) {
    super(message);
    this.name = 'ArkErrorOther';
    this.message = message || 'An Error Occurred';
    this.code = 500;
    Error.captureStackTrace(this, ArkErrorOther);
  }
}

/**
 * Errors for Validation
 */
export class ArkErrorValidation extends ArkError {
  constructor(message) {
    super(message);
    this.name = 'ArkErrorValidation';
    this.code = 422;
  }
}

/**
 * 404 not found error and when _id is not found in the database
 */
export class ArkErrorNotFound extends ArkError {
  constructor(message) {
    super(message);
    this.name = 'ArkErrorNotFound';
    this.code = 404;
    this.message = '404 Not Found';
    Error.captureStackTrace(this, ArkErrorNotFound);
  }
}

/**
 * Errors that will not send back as json header type
 * useful if the service is not an API
 * used in funnel pages where error responses are html pages
 */
export class ArkErrorTeapot extends ArkError {
  constructor(message) {
    super(message);
    this.name = 'ArkErrorTeapot';
    this.code = 418;
    this.message = message || 'ArkErrorTeapot';
    Error.captureStackTrace(this, ArkErrorTeapot);
  }
}

/**
 * Unauthorized Error
 */
export class ArkErrorInvalidToken extends ArkError {
  constructor(message) {
    super(message);
    this.name = 'ArkErrorInvalidToken';
    this.code = 401;
    this.message = 'JWT Token is invalid';
    Error.captureStackTrace(this, ArkErrorInvalidToken);
  }
}
