
// Define global variables
const input = document.querySelector('#zip')
const search = document.querySelector('#search')
const places = document.querySelector('#place')
const showTemperature = document.querySelector('#temp')
const cityTitle = document.querySelector('#city')
const weatherData = document.querySelector('#data')


search.addEventListener('click', async (e) => {
  e.preventDefault()
  let zip = input.value
  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${zip}&appid=2f4f1d57fc6cf6ee573d93ac14c4a050`
    const RESPONSE = await axios.get(URL);
    const DATA = RESPONSE.data
    reset()

    // Additional API accepts zip and gives city and state
    const zipURL = `https://api.zippopotam.us/us/${zip}`
    const zipRESPONSE = await axios.get(zipURL);
    const city = zipRESPONSE.data.places[0]['place name']
    const state = zipRESPONSE.data.places[0].state

    // Separate container to append City, State, and Temperature
    cityTitle.style.background = `rgba(76, 107, 169, .6)`
    cityTitle.innerHTML = `${city}, ${state}`

    // Call animation for input field
    searchAnimation()

    //Temperature
    const temperature = Math.round(DATA.main.temp)
    hotInHere(temperature, showTemperature)
    showTemperature.innerHTML = `${temperature} °F`

    // Append location and temperature data
    places.appendChild(cityTitle)
    places.appendChild(showTemperature)

    // Local time of sunset
    const time = DATA.sys.sunset
    const timeZone = DATA.timezone
    const showTime = document.createElement('p')
    showTime.innerHTML = `Sets at: ${convertTime(time, timeZone)}pm`

    // Current weather description
    const description = DATA.weather[0].description
    let showDescription = document.createElement('p')
    showDescription.innerHTML = `Currently: ${description}`

    // Humidity 
    const humidity = DATA.main.humidity
    let showHumidity = document.createElement('p')
    showHumidity.innerHTML = `Humidity: ${humidity}%`

    // Clouds
    let clouds = DATA.clouds.all
    let showClouds = document.createElement('p')
    showClouds.innerHTML = `Cloud cover: ${clouds}%`;

    // Wind
    let wind = Math.round(DATA.wind.speed)
    let deg = DATA.wind.deg
    let showWindSpeed = document.createElement('p')
    showWindSpeed.innerHTML = `Wind: ${wind} mph ${windDirection(deg)}`

    // Append relevant weather data
    weatherData.style.background = `rgba(76, 107, 169, .6)`
    weatherData.append(showTime, showDescription, showClouds, showHumidity, showWindSpeed)

    // Create percentage-based score
    const grade = document.querySelector('#grade')
    let score = compareData(temperature, wind, clouds, description, humidity)
    const percentScore = (score) => Math.round((score / 35) * 100)
    grade.innerHTML = percentScore(score)

    // Compare Data and Score to compile message
    const finalScore = compareData(temperature, wind, clouds, description, humidity)
    const messageText = document.querySelector('#message')
    messageText.innerHTML = finalMessage(finalScore)
  } catch (error) {
    // Clear display / append error message
    if (error.toString().includes('404')) {
      reset()
      cityTitle.innerHTML = `Please enter a valid zip code`
      cityTitle.style.background = `rgba(76, 107, 169, .6)`
      showTemperature.style.background = 'none'
      weatherData.style.background = 'none'
      places.append(cityTitle)
    }
    console.log(error)
  }
})

// "blink" effect when search is entered
function searchAnimation() {
  input.classList.add('send')
  setTimeout(() => input.value = '', 1000)
}

// Reset text in DOM and toggle search animation
function reset() {
  input.classList.remove('send')
  showTemperature.innerHTML = null
  weatherData.innerHTML = null
}

// Change background color for temperature element based on temperature
function hotInHere(temp, element) {
  if (temp >= 90) {
    element.style.background = `rgba(228, 63, 21, 0.5)`
  } else if (temp < 90 && temp >= 75) {
    element.style.background = `rgba(240, 141, 11, 0.5)`
  } else if (temp < 75 && temp >= 65) {
    element.style.background = `rgba(235, 231, 12, 0.5)`
  } else if (temp < 65 && temp >= 50) {
    element.style.background = `rgba(99, 216, 53, 0.5)`
  } else if (temp < 50 && temp >= 35) {
    element.style.background = `rgba(28, 218, 154, 0.5)`
  } else if (temp < 35) {
    element.style.background = `rgba(7, 110, 194, 0.5)`
  }
}

// Convert UNIX time from API to local time at searched location
// ** Done with base algorithm from https://www.geeksforgeeks.org/how-to-convert-unix-timestamp-to-time-in-javascript/
// ** Slice method to remove seconds borrowed from https://stackoverflow.com/questions/41630068/i-would-like-to-remove-seconds-and-milliseconds-from-my-date/41630118
function convertTime(time, timeZone) {
  let localTime = time + timeZone - 7200
  let dateObj = new Date(localTime * 1000);
  let utcString = dateObj.toUTCString();
  let newTime = utcString.slice(-11, -4, -3)
  let finalTime = newTime.slice(0, newTime.lastIndexOf(':'))
  return finalTime
}

// Convert API numerical output (degrees) to compass direction
function windDirection(deg) {
  let direction = ""
  if (deg >= 337.5 || deg < 22.5) {
    direction = "N"
  } else if (deg >= 22.5 && deg < 67.5) {
    direction = "NE"
  } else if (deg >= 67.5 && deg < 112.5) {
    direction = "E"
  } else if (deg >= 112.5 && deg < 157.5) {
    direction = "SE"
  } else if (deg >= 157.5 && deg < 202.5) {
    direction = "S"
  } else if (deg >= 202.5 && deg < 247.5) {
    direction = "SW"
  } else if (deg >= 247.5 && deg < 292.5) {
    direction = "W"
  } else if (deg >= 292.5 && deg < 337.5) {
    direction = "NW"
  }
  return direction
}

// Return cumulative score based on API output
function compareData(temperature, wind, clouds, description, humidity) {
  let score = 0;

  // Bonus for comfortable temperature
  if (temperature > 70 && temperature < 90) {
    score += 3
  } else if (temperature > 50 && temperature <= 70) {
    score += 1
  }

  // Wind Scores
  if (wind <= 3) {
    score += 10
  } else if (wind > 3 && wind <= 7) {
    score += 8
  } else if (wind > 7 && wind <= 12) {
    score += 6
  } else if (wind > 12 && wind <= 18) {
    score += 4
  } else if (wind > 18 && wind <= 24) {
    score += 2
  } else if (wind > 24 && wind <= 30) {
    score += 1
  }

  // Cloud Scores
  if (clouds >= 30 && clouds <= 70) {
    score += 10
  } else if (clouds < 30) {
    score += 5
  } else if (clouds > 70 && clouds < 90) {
    score += 5
  }

  // Specific descriptor bonuses & detractions
  if (description == "scattered clouds" || description == "broken clouds") {
    score += 5
  } else if (description == "clear sky") {
    score += 3
  } else if (description == "haze" || description == "smoke") {
    score -= 2
  } else if (description == "light rain ") {
    score += 1
  } else if (description == "moderate rain" || description == "heavy rain") {
    score -= 1
  }

  // Humidity Scores
  if (humidity >= 70 && humidity < 90) {
    score += 3
  } else if (humidity >= 50 && humidity < 70) {
    score += 5
  } else if (humidity >= 30 && humidity < 50) {
    score += 7
  } else if (humidity >= 20 && humidity < 30) {
    score += 5
  } else if (humidity >= 10 && humidity < 20) {
    score += 3
  } else if (humidity >= 5 && humidity < 10) {
    score += 2
  }
  return score
}


// Return custom message for ranges of scores
function finalMessage(score) {
  let message = ""
  if (score >= 32) {
    message = "Chances are high you'll get an amazing sunset tonight!!"
  } else if (score < 32 && score >= 29) {
    message = "Get your camera ready, the odds are in your favor."
  } else if (score < 29 && score >= 26) {
    message = "If these conditions hold, you're looking at an awesome sunset tonight!"
  } else if (score < 26 && score >= 23) {
    message = "There's a chance you'll get a great sunset tonight."
  } else if (score < 23 && score >= 20) {
    message = "No promises, but your conditions look pretty good."
  } else if (score < 20 && score >= 17) {
    message = "Don't get your hopes up, but we still like your odds."
  } else if (score < 17 && score >= 14) {
    message = "Not a bad chance. You could get lucky!"
  } else if (score < 14 && score >= 11) {
    message = "Chances are low, but there's still hope!"
  } else if (score < 11 && score >= 8) {
    message = "A stunning sunset doesn't look likely, but conditions could change."
  } else if (score < 8 && score >= 5) {
    message = "Not looking too likely."
  } else if (score < 5) {
    message = "Stay home and get stuff done. No chasing sunsets tonight."
  }
  return message
}
