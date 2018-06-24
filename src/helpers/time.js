const addLeadingZero = (value) => (value < 10) ? `0${value}` : value;

export default function (unixTimestamp, locale = 'en-US') {
  const date = new Date(unixTimestamp * 1000);
  console.log('date', date);
  console.log('date', date.getTimezoneOffset());
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  const weekDay = date.getUTCDay();

  month = addLeadingZero(month);
  day = addLeadingZero(day);
  hours = addLeadingZero(hours);
  minutes = addLeadingZero(minutes);

  const localeDateString = date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return {
    localeDateString,
    weekDay,
    day,
    month,
    year,
    hours,
    minutes
  };
}
