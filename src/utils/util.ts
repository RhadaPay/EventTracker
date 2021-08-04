import { HttpException } from "@/exceptions/HttpException";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
type requestDataType = string | number | object;

export const isEmpty = (value: requestDataType): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const emptyValidation = (data: requestDataType) => {
  if (isEmpty(data)) throw new HttpException(400, "Passed data was empty");
}
