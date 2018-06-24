export default {
  currentCondition: {
    location: 'Rio',
    temperature: 23,
    date: '--',
    weather: 'Clear',
    dayTime: false,
    humidity: 30,
    dataLoaded: false
  },
  foreCastDaily: [
    {
      weekDay: 'mon',
      rainProbability: 47,
      icon: 'wi-day-sunny',
      temperature: {
        max: 23,
        min: 12
      }
    },
    {
      weekDay: 'tue',
      rainProbability: 35,
      icon: 'wi-day-sunny',
      temperature: {
        max: 33,
        min: 14
      }
    },
    {
      weekDay: 'wed',
      rainProbability: 1,
      icon: 'wi-day-sunny',
      temperature: {
        max: 22,
        min: 21
      }
    },
    {
      weekDay: 'Thu',
      rainProbability: 10,
      icon: 'wi-day-sunny',
      temperature: {
        max: 30,
        min: 25
      }
    },
    {
      weekDay: 'Fry',
      rainProbability: 20,
      icon: 'wi-fog',
      temperature: {
        max: 19,
        min: 11
      }
    }
  ],
  foreCastHourly: [
    {
      time: 8,
      rainProbability: 20,
      temperature: 23,
      icon: 'wi-fog'
    },
    {
      time: 9,
      rainProbability: 22,
      temperature: 25,
      icon: 'wi-day-sunny'
    },
    {
      time: 10,
      rainProbability: 40,
      temperature: 15,
      icon: 'wi-day-sunny'
    },
    {
      time: 11,
      rainProbability: 15,
      temperature: 16,
      icon: 'wi-day-sunny'
    },
    {
      time: 12,
      rainProbability: 5,
      temperature: 24,
      icon: 'wi-day-sunny'
    }
  ]
}
