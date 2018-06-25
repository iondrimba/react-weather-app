import time from '../../src/helpers/time';

const unixTimeStamp = 1529886488;

describe('Time', () => {
  it('matches localeDateString with Monday, June 25, 2018', () => {
    const result = time(unixTimeStamp);

    expect(result.localeDateString).toEqual('Monday, June 25, 2018');
  });

  it('matches weekDay with 1', () => {
    const result = time(unixTimeStamp);

    expect(result.weekDay).toEqual(1);
  });

  it('matches day with 25', () => {
    const result = time(unixTimeStamp);

    expect(result.day).toEqual(25);
  });

  it('matches month with "06"', () => {
    const result = time(unixTimeStamp);

    expect(result.month).toEqual('06');
  });

  it('matches year with 2018', () => {
    const result = time(unixTimeStamp);

    expect(result.year).toEqual(2018);
  });

  it('matches hours with 00', () => {
    const result = time(unixTimeStamp);

    expect(result.hours).toEqual('00');
  });

  it('matches minutes with 28', () => {
    const result = time(unixTimeStamp);

    expect(result.minutes).toEqual(28);
  });
});
