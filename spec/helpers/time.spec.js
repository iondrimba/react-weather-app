import time from '../../src/helpers/time';

const unixTimeStamp = 1529716706;

describe('Time', () => {
  it('matches localeDateString with Saturday, June 23, 2018', () => {
    const result = time(unixTimeStamp);

    expect(result.localeDateString).toEqual('Saturday, June 23, 2018');
  });

  it('matches weekDay with 6', () => {
    const result = time(unixTimeStamp);

    expect(result.weekDay).toEqual(6);
  });

  it('matches day with 23', () => {
    const result = time(unixTimeStamp);

    expect(result.day).toEqual(23);
  });

  it('matches month with "06"', () => {
    const result = time(unixTimeStamp);

    expect(result.month).toEqual('06');
  });

  it('matches year with 2018', () => {
    const result = time(unixTimeStamp);

    expect(result.year).toEqual(2018);
  });

  it('matches hours with 04', () => {
    const result = time(unixTimeStamp);

    expect(result.hours).toEqual('04');
  });

  it('matches minutes with 18', () => {
    const result = time(unixTimeStamp);

    expect(result.minutes).toEqual(18);
  });
});
