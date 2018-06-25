import getTime from 'date-fns/get_time'

const addLeadingZero = (value) => (value < 10) ? `0${value}` : value;

export default function (unixTimestamp, locale = 'en-US') {
  const date = new Date(unixTimestamp * 1000);
  const utc = getTime(date) + (date.getTimezoneOffset() * 60000);
  const finalDate = new Date(utc);

  console.log('date', date);
  console.log('new Date', new Date());
  console.log('finalDate', finalDate);

  // finalDate.setUTCHours(finalDate.getUTCHours() + (date.getTimezoneOffset() / 60))

  const year = finalDate.getUTCFullYear();
  let month = finalDate.getUTCMonth() + 1;
  let day = finalDate.getUTCDate();
  let hours = finalDate.getUTCHours();
  let minutes = finalDate.getUTCMinutes();
  const weekDay = finalDate.getUTCDay();

  month = addLeadingZero(month);
  day = addLeadingZero(day);
  hours = addLeadingZero(hours);
  minutes = addLeadingZero(minutes);

  const localeDateString = finalDate.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

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

