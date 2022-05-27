import { assert, ErrorNotFound, ErrorOther, ErrorTeapot, ErrorValidation } from './assert';

describe('Ark Error Handler Tests', () => {
  test('Validation Error Tests - should return error if object is null, false or an empty object', () => {
    expect(() => {
      return assert(null, ErrorValidation, 'Object is required');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return assert(false, ErrorValidation, 'Object is required');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return assert({}, ErrorValidation, 'Object is required');
    }).toThrowErrorMatchingSnapshot();
  });

  test('Validation Error Tests - should not return an error if object is not empty or true', () => {
    expect(assert(true, ErrorValidation, 'Object is required')).toMatchSnapshot();
    expect(assert({ name: 'name' }, ErrorValidation, 'Object is required')).toMatchSnapshot();
  });

  test('404 Error Tests - should return error 404 if value is null.false or empty', () => {
    expect(() => {
      return assert(null, ErrorNotFound);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return assert(false, ErrorNotFound);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return assert({}, ErrorNotFound);
    }).toThrowErrorMatchingSnapshot();
  });

  test('404 Error Tests - should NOT return error 404 if value is NOT null,false or empty', () => {
    expect(assert(true, ErrorNotFound)).toMatchSnapshot();
    expect(assert({ name: 'name' }, ErrorNotFound)).toMatchSnapshot();
  });

  test('418 Error Tests - should return html', () => {
    expect(assert(true, ErrorTeapot, 'This is a sample html error')).toMatchSnapshot();
  });

  test('500 Error Tests - should return error 500 if value is null.false or empty', () => {
    expect(() => {
      return assert(null, ErrorOther);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return assert(false, ErrorOther);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return assert({}, ErrorOther);
    }).toThrowErrorMatchingSnapshot();
  });

  test('500 Error Tests - should NOT return error 500 if value is NOT null,false or empty', () => {
    expect(assert(true, ErrorOther)).toMatchSnapshot();
    expect(assert({ name: 'name' }, ErrorOther)).toMatchSnapshot();
  });

  test('500 Error Tests - should NOT return error 500 if value is a STRING or NUMBER', () => {
    expect(assert(1, ErrorOther)).toMatchSnapshot();
    expect(assert('this is a string', ErrorOther)).toMatchSnapshot();
    expect(assert([1, 2, 3, 4], ErrorOther)).toMatchSnapshot();
    expect(assert(['1', 'this is an array of string'], ErrorOther)).toMatchSnapshot();
  });
});
