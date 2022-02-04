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
 * @param value Object to be evaluated
 * @param error ArkError
 * @param message optionally a custom error message
 */
export const arkAssert = (value, error: new (...any: unknown[]) => T, message = '') => {
  if (value === true || !_.isEmpty(value)) {
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
    this.name = 'ArkValidationOther';
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
    this.name = 'ArkValidationError';
    this.code = 422;
    // Error.captureStackTrace(this, ArkValidationError);
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
 * Unauthorized Error
 */
export class ArkErrorInvalidToken extends ArkError {
  constructor(message) {
    super(message);
    this.name = 'ArkValidationError';
    this.code = 401;
  }
}

/**
 * check if message if the message is not empty
 * @param message
 * @param value
 * @private
 */
export const arkValidateAssert = (value, message) => {
  if (_.isEmpty(value)) {
    throw new ArkErrorValidation(message);
  }

  return true;
};
