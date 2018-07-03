export default (day) => {
  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fry', 'sat'];
  const result = weekdays[day];

  if (result) {
    return result;
  }

  throw new Error(`No weekday found for index: ${day}`);
}
