import InputValidation from '../js/services/input-validation';

test.each([
  ['10.10,10.10', true],
  ['-10.10, 10.10', true],
  ['[-10.10, 10.10]', true],
  ['10.1 10.2', false],
  ['(10.1,10.2)', false],
  ['10 / 53', false],
])(
  ('Test pattern validation function'),
  (string, expected) => {
    const result = InputValidation.validateString(string);
    expect(result).toBe(expected);
  },
);

test.each([
  ['10.10,10.10', [10.1, 10.1]],
  ['-10.10, 10.10', [-10.1, 10.1]],
  ['[-10.10, 10.10]', [-10.1, 10.1]],
  ['a, 10.2', false],
])(
  ('Test parsing'),
  (string, expected) => {
    const result = InputValidation.parseValues(string);
    expect(result).toEqual(expected);
  },
);

test.each([
  [[10.1, 10.1], [10.1, 10.1]],
  [[-91, 10.1], false],
  [[-10.1, 181], false],
])(
  ('Test values control'),
  (string, expected) => {
    const result = InputValidation.verifyCoordinates(string);
    expect(result).toEqual(expected);
  },
);
