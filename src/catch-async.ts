/**
 * A helper function that will return a next(error) if an error occurred during an async/await operations
 * @param fn
 */
export const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
