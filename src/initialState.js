export default {
  showInfo: false,
  dataLoaded: false,
  latitude: 0,
  longitude: 0,
  updating: false,
  lastUpdate: "00:00",
  currentCondition: {
    currentCondition: {
      location: "--",
      temperature: 0,
      date: "--",
      weather: "Clear",
      dayTime: false,
      humidity: 0,
      dataLoaded: false
    },
    foreCastDaily: [
      {
        weekDay: "mon",
        rainProbability: 0,
        icon: "wi-day-sunny",
        temperature: {
          max: 0,
          min: 0
        }
      },
      {
        weekDay: "tue",
        rainProbability: 0,
        icon: "wi-day-sunny",
        temperature: {
          max: 0,
          min: 0
        }
      },
      {
        weekDay: "wed",
        rainProbability: 0,
        icon: "wi-day-sunny",
        temperature: {
          max: 0,
          min: 0
        }
      },
      {
        weekDay: "Thu",
        rainProbability: 0,
        icon: "wi-day-sunny",
        temperature: {
          max: 0,
          min: 0
        }
      },
      {
        weekDay: "Fry",
        rainProbability: 0,
        icon: "wi-fog",
        temperature: {
          max: 0,
          min: 0
        }
      }
    ],
    foreCastHourly: [
      {
        time: 0,
        rainProbability: 0,
        temperature: 23,
        icon: "wi-fog"
      },
      {
        time: 0,
        rainProbability: 0,
        temperature: 25,
        icon: "wi-day-sunny"
      },
      {
        time: 0,
        rainProbability: 0,
        temperature: 15,
        icon: "wi-day-sunny"
      },
      {
        time: 0,
        rainProbability: 0,
        temperature: 16,
        icon: "wi-day-sunny"
      },
      {
        time: 0,
        rainProbability: 0,
        temperature: 24,
        icon: "wi-day-sunny"
      }
    ],
    location: "São Paulo",
    date: "Sunday, August 12, 2018",
    temperature: 17,
    weather: "Mostly Cloudy"
  },
  foreCastHourly: [
    {
      time: 0,
      rainProbability: 0,
      temperature: 0,
      icon: "wi-day-cloudy"
    },
    {
      time: 0,
      rainProbability: 0,
      temperature: 0,
      icon: "wi-day-cloudy"
    },
    {
      time: 0,
      rainProbability: 0,
      temperature: 0,
      icon: "wi-day-cloudy"
    },
    {
      time: 0,
      rainProbability: 0,
      temperature: 0,
      icon: "wi-night-clear"
    },
    {
      time: 0,
      rainProbability: 0,
      temperature: 14,
      icon: "wi-night-clear"
    }
  ],
  foreCastDaily: [
    {
      weekDay: "mon",
      rainProbability: 0,
      icon: "wi-day-sunny",
      temperature: {
        max: 0,
        min: 0
      }
    },
    {
      weekDay: "tue",
      rainProbability: 0,
      icon: "wi-day-sunny",
      temperature: {
        max: 0,
        min: 0
      }
    },
    {
      weekDay: "wed",
      rainProbability: 0,
      icon: "wi-night-alt-cloudy",
      temperature: {
        max: 0,
        min: 0
      }
    },
    {
      weekDay: "thu",
      rainProbability: 0,
      icon: "wi-cloudy",
      temperature: {
        max: 0,
        min: 0
      }
    },
    {
      weekDay: "fry",
      rainProbability: 0,
      icon: "wi-cloudy",
      temperature: {
        max: 0,
        min: 0
      }
    }
  ]
}
