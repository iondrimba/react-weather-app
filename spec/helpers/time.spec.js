import time from '../../src/helpers/time';

const unixTimeStamp = 1529886488;

describe('Time', () => {
  it('matches localeDateString with Sunday, June 24, 2018', () => {
    const result = time(unixTimeStamp);

    expect(result.localeDateString).toEqual('Sunday, June 24, 2018');
  });

  it('matches weekDay with 0', () => {
    const result = time(unixTimeStamp);

    expect(result.weekDay).toEqual(0);
  });

  it('matches day with 24', () => {
    const result = time(unixTimeStamp);

    expect(result.day).toEqual(24);
  });

  it('matches month with "06"', () => {
    const result = time(unixTimeStamp);

    expect(result.month).toEqual('06');
  });

  it('matches year with 2018', () => {
    const result = time(unixTimeStamp);

    expect(result.year).toEqual(2018);
  });

  it('matches hours with 21', () => {
    const result = time(unixTimeStamp);

    expect(result.hours).toEqual(21);
  });

  it('matches minutes with 28', () => {
    const result = time(unixTimeStamp);

    expect(result.minutes).toEqual(28);
  });
});
