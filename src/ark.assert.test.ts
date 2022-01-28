import { arkAssert, ArkErrorNotFound, ArkErrorOther, ArkErrorValidation } from './ark.assert';

describe('Ark Error Handler Tests', () => {
  test('Validation Error Tests - should return error if object is null, false or an empty object', () => {
    expect(() => {
      return arkAssert(null, ArkErrorValidation, 'Object is required');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return arkAssert(false, ArkErrorValidation, 'Object is required');
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return arkAssert({}, ArkErrorValidation, 'Object is required');
    }).toThrowErrorMatchingSnapshot();
  });

  test('Validation Error Tests - should not return an error if object is not empty or true', () => {
    expect(() => {
      return arkAssert(true, ArkErrorValidation, 'Object is required');
    }).toMatchSnapshot();

    expect(() => {
      return arkAssert({ name: 'name' }, ArkErrorValidation, 'Object is required');
    }).toMatchSnapshot();
  });

  test('404 Error Tests - should return error 404 if value is null.false or empty', () => {
    expect(() => {
      return arkAssert(null, ArkErrorNotFound);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return arkAssert(false, ArkErrorNotFound);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return arkAssert({}, ArkErrorNotFound);
    }).toThrowErrorMatchingSnapshot();
  });

  test('404 Error Tests - should NOT return error 404 if value is NOT null,false or empty', () => {
    expect(() => {
      return arkAssert(true, ArkErrorNotFound);
    }).toMatchSnapshot();

    expect(() => {
      return arkAssert({ name: 'name' }, ArkErrorNotFound);
    }).toMatchSnapshot();
  });

  test('500 Error Tests - should return error 500 if value is null.false or empty', () => {
    expect(() => {
      return arkAssert(null, ArkErrorOther);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return arkAssert(false, ArkErrorOther);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      return arkAssert({}, ArkErrorOther);
    }).toThrowErrorMatchingSnapshot();
  });

  test('500 Error Tests - should NOT return error 500 if value is NOT null,false or empty', () => {
    expect(() => {
      return arkAssert(true, ArkErrorOther);
    }).toMatchSnapshot();

    expect(() => {
      return arkAssert({ name: 'name' }, ArkErrorOther);
    }).toMatchSnapshot();
  });
});
