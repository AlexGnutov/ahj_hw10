export default class InputValidation {
  static validateString(inputString) {
    const reg = /^\[?-?[0-9]{1,3}\.?[0-9]{0,5},\s?-?[0-9]{1,3}\.?[0-9]{0,5}\]?/;
    return reg.test(inputString);
  }

  static parseValues(inputString) {
    const pair = inputString.split(',');
    pair[0].trim();
    pair[1].trim();
    const arr = pair.map((value) => {
      if (value[0] === '[') {
        return value.substring(1);
      }
      return value;
    });
    const latitude = parseFloat(arr[0]);
    const longitude = parseFloat(arr[1]);
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return false;
    }
    return [latitude, longitude];
  }

  static verifyCoordinates([latitude, longitude]) {
    if (latitude > 90 || latitude < -90) {
      return false;
    }
    if (longitude > 180 || longitude < -180) {
      return false;
    }
    return [latitude, longitude];
  }
}
