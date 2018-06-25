const addLeadingZero = (value) => (value < 10) ? `0${value}` : value;

export default function (unixTimestamp, locale = 'en-US') {
  const date = new Date(unixTimestamp * 1000);
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const finalDate = new Date(utc);

  const year = finalDate.getFullYear();
  let month = finalDate.getMonth() + 1;
  let day = finalDate.getDate();
  let hours = finalDate.getHours();
  let minutes = finalDate.getMinutes();
  const weekDay = finalDate.getDay();

  month = addLeadingZero(month);
  day = addLeadingZero(day);
  hours = addLeadingZero(hours);
  minutes = addLeadingZero(minutes);

  const localeDateString = finalDate.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });;

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

