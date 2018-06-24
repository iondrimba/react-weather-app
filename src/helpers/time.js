const addLeadingZero = (value) => (value < 10) ? `0${value}` : value;

export default function (unixTimestamp, locale = 'en-US') {
  const date = new Date(unixTimestamp * 1000);
  console.log('date', new Date(unixTimestamp * 1000));
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const weekDay = date.getDay();

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
