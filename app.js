const input = document.querySelector('#zip')
const search = document.querySelector('#search')


search.addEventListener('click', async (e) => {
  e.preventDefault()
  let zip = input.value
  try {
    const URL = `http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${zip}&appid=2f4f1d57fc6cf6ee573d93ac14c4a050`
    const RESPONSE = await axios.get(URL);
    const DATA = RESPONSE.data
    console.log(DATA)

    // Additional API accepts zip and gives city and state
    const zipURL = `http:api.zippopotam.us/us/${zip}`
    const zipRESPONSE = await axios.get(zipURL);
    const city = zipRESPONSE.data.places[0]['place name']
    const state = zipRESPONSE.data.places[0].state

    // Separate div to append City, State, and Temperature
    const places = document.querySelector('#place') 
    const cityTitle = document.querySelector('#city')
    cityTitle.innerHTML = `${city}, ${state}`

    reset() 

    //Temperature
    const temperature = DATA.main.temp
    let showTemperature = document.querySelector('#temp')
    showTemperature.innerHTML = `${temperature}°F`

    // Append location and temperature data
    places.appendChild(cityTitle)
    places.appendChild(showTemperature)

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
    showWindSpeed.innerHTML = `Wind speed: ${wind} mph ${windDirection(deg)}`

    // Append relevant weather data
    const weatherData = document.querySelector('#data')
    weatherData.appendChild(showDescription)
    weatherData.appendChild(showClouds)
    weatherData.appendChild(showHumidity)
    weatherData.appendChild(showWindSpeed)

    // call compareData() within gradeScore()
    const grade = document.querySelector('#grade')
    grade.innerHTML = gradeScore(compareData(temperature, wind, clouds, description, humidity))
    const finalScore = gradeScore(compareData(temperature, wind, clouds, description, humidity))
    
    // Compare Data and Score to compile message
    const messageText = document.querySelector('#message')
    messageText.innerHTML = message(finalScore) 



  } catch (error) {
    console.log(error)
  }
})

function reset() {
let displayArea = document.querySelector('#data')
data.innerHTML = null
}

// Convert API numerical output (degrees) to compass direction
function windDirection (deg) {
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

// Returns score based on API output
function compareData(temperature, wind, clouds, description, humidity) {
  let score = 0;

  // Bonus for comfortable temperature
  if (temperature > 70 && temperature < 90) {
    score += 3
  }
  if (temperature > 50 && temperature <= 70) {
    score += 1
  } 
 
  // Wind Scores
  if (wind <= 3) {
    score += 10
  }
  if (wind > 3 && wind <= 7) {
    score += 8
  }
  if (wind > 7 && wind <= 12) {
    score += 6
  }
  if (wind > 12 && wind <= 18) {
    score += 4
  }
  if (wind > 18 && wind <= 24) {
    score +=2
  }
  if (wind > 24 && wind <= 30) {
    score += 1
  }

  // Cloud Scores
  if (clouds >=30 && clouds <= 70) {
    score += 10
  } 
  if (clouds < 30) {
    score += 5
  }
  if (clouds > 70 && clouds < 90) {
    score += 5
  }
  
 // Specific descriptor bonuses & detractions
  if (description == "scattered clouds" || description == "broken clouds") {
    score += 5
  }
  if (description == "light rain " || description == "moderate rain" || description == "heavy rain") {
    score -= 2
  }
if (description == "haze") {
  score += 2
} 

// Humidity Scores
if (humidity >= 70 && humidity < 90) {
  score += 3
}
if (humidity >= 50 && humidity < 70) {
  score += 5
}
if (humidity >= 30 && humidity < 50) {
  score += 7
}
if (humidity >= 20 && humidity < 30) {
  score += 5
}
if (humidity >= 10 && humidity < 20) {
  score += 3
}
if (humidity >= 5 && humidity < 10) {
  score += 2
}
return score
}

function gradeScore(score) {
let grade = ""
if (score >= 32) {
  grade = "A+"
}
if (score < 32 && score >= 29) {
  grade = "A"
}
if (score < 29 && score >= 26) {
  grade = "A-"
}
if (score < 26 && score >= 23) {
  grade = "B+"
}
if (score < 23 && score >= 20) {
  grade = "B"
}
if (score < 20 && score >= 17) {
  grade = "B-"
}
if (score < 17 && score >= 14) {
  grade = "C+"
} 
if (score < 14 && score >= 11) {
  grade = "C"
}
if (score < 11 && score >= 8) {
  grade = "C-"
}
if (score < 8 && score >= 5) {
  grade = "D"
}
if (score < 5) {
  grade = "F"
}
// console.log(grade)
return grade
}

// Creates Message based on letter grade and other conditions
function message(grade) {
  let finalMessage = ""
  const gradeA = "Looks like an amazing sunset tonight!!"
  const gradeB = "There's a chance you'll get a great sunset tonight!"
  const gradeC = "Chances are low, but you could still get a nice sunset this evening!"
  const gradeD = "Not looking too good, but things could always change."
  const gradeF = "Stay home and get stuff done. No chasing sunsets tonight."
  const niceOut = "Looks like a beautiful evening!"
  if (grade.includes("A"))
  {
    finalMessage += gradeA
  } else if (grade.includes("B")) {
    finalMessage += gradeB
  } else if (grade.includes("C")) {
    finalMessage += gradeC
  } else if (grade.includes("D")) {
    finalMessage += gradeD
  } else if (grade.includes("F")) {
    finalMessage += gradeF
  } else if (grade == "A+") {
    finalMessage += "Conditions are perfect for a stunning sunset this evening!"
  }
    return finalMessage
}


// Build score 

//  Perfect conditions: 
//    Moderate temperature (70-90) -- 3 points
//    Low wind (< 10) -- 10 points
//    Cloud coverage between 30 and 70 percent -- 10 points
//    description - scattered clouds -- 5 points
//    No fog
//    Humidity between 30 and 50 percent --  7 points

// Total score/35


// Possible cloud conditions: 

// main: "Clear" description: "clear sky"
// main: "Clouds" decription: "scattered clouds"
// main: "Smoke" description: "smoke"
// main: "Clouds" description: "overcast clouds"
// main: "Rain" description: "light rain"
// main: "Rain" description: "heavy intensity rain"
// main: "Haze" description: "haze"
// main: "Clouds" description: "few clouds"



