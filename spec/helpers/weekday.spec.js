import weekdays from '../../src/helpers/weekdays';

const days = [0, 1, 2, 3, 4, 5, 6];

describe('Week Days', () => {
  it('finds all weekdays', () => {
    const result = days.filter((key) => weekdays(key) !== undefined);

    expect(result.length).toEqual(days.length);
  });

  it('throws error for invalid day index', () => {
    expect(() => {
      weekdays(7);
    }).toThrowError('No weekday found for index: 7');
  });
});
