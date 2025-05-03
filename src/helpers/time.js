const addLeadingZero = (value) => (value < 10) ? `0${value}` : value;

const addTimezonOffset = (date, time) => {
  const match = /GMT\+\d+/.test(date.toString());
  let result = time;

  if (match) {
    result = time + date.getTimezoneOffset() * 60000;
  }

  return result;
};

const setupDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const utc = date.getTime();

  return new Date(addTimezonOffset(date, utc));
};

export default function (unixTimestamp, locale = 'en-US') {
  const finalDate = setupDate(unixTimestamp);

  const year = finalDate.getFullYear();
  const weekDay = finalDate.getDay();
  let month = finalDate.getMonth() + 1;
  let day = finalDate.getDate();
  let hours = finalDate.getHours();
  let minutes = finalDate.getMinutes();

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

export { addTimezonOffset, addLeadingZero, setupDate };
