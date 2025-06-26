// const { mean } = require('../utils');
const { mean } = require('../utils/stats');

describe('mean()', () => {
  it('should return average of numeric array', () => {
    expect(mean([10, 20, 30])).toBe(20);
  });

  it('should return NaN for empty array', () => {
    expect(mean([])).toBeNaN();
  });
});
