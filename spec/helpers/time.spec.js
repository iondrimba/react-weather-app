import time, { addLeadingZero, setupDate } from '../../src/helpers/time';

const unixTimeStamp = 1529886488;

describe('Time', () => {
  const fixture = setupDate(unixTimeStamp);

  it('matches localeDateString', () => {
    const result = time(unixTimeStamp);

    expect(result.localeDateString).toEqual(fixture.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  });

  it('matches weekDay', () => {
    const result = time(unixTimeStamp);

    expect(result.weekDay).toEqual(fixture.getDay());
  });

  it('matches day', () => {
    const result = time(unixTimeStamp);

    expect(result.day).toEqual(addLeadingZero(fixture.getDate()));
  });

  it('matches month', () => {
    const result = time(unixTimeStamp);

    expect(result.month).toEqual(addLeadingZero(fixture.getMonth() + 1));
  });

  it('matches year', () => {
    const result = time(unixTimeStamp);

    expect(result.year).toEqual(fixture.getFullYear());
  });

  it('matches hours', () => {
    const result = time(unixTimeStamp);

    expect(result.hours).toEqual(addLeadingZero(fixture.getHours()));
  });

  it('matches minutes with 28', () => {
    const result = time(unixTimeStamp);

    expect(result.minutes).toEqual(addLeadingZero(fixture.getMinutes()));
  });
});
