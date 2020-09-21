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

    const humidity = DATA.main.humidity
    let showHumidity = document.createElement('p')
    showHumidity.innerHTML = `Humidity: ${humidity}%`

    let clouds = DATA.clouds.all
    let showClouds = document.createElement('p')
    showClouds.innerHTML = `Cloud cover: ${clouds}%`;

    let windSpeed = Math.round(DATA.wind.speed) 
    let deg = DATA.wind.deg
    let showWindSpeed = document.createElement('p')
    showWindSpeed.innerHTML = `Wind speed: ${windSpeed} mph ${windDirection(deg)}`


    const weatherData = document.querySelector('#data')
    weatherData.appendChild(showClouds)
    weatherData.appendChild(showHumidity)
    weatherData.appendChild(showWindSpeed)
    
  } catch (error) {
    console.log(error)
  }
})

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



// async function getData(zip) {
//   try {
//     // let zip = input.value;
//     const URL = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&=units=imperial&appid=2f4f1d57fc6cf6ee573d93ac14c4a050`
//     const RESPONSE = await axios.get(URL);
//     const DATA = RESPONSE.data
//     console.log(DATA)
//     // let clouds = DATA.clouds.all
//     // addScore(clouds)
//   } catch (error) {
//     console.log(error)
//   }
// }

// getData(06410)

// const form = document.querySelector('#input-area')

// form.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const zip = document.querySelector('#zip').value
//   getData(zip)
// })