const input = document.querySelector('#zip')
const search = document.querySelector('#search')


search.addEventListener('click', async (e) => {
  e.preventDefault()
  let zip = input.value
  try {
    const URL = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&=units=imperial&appid=2f4f1d57fc6cf6ee573d93ac14c4a050`
    const RESPONSE = await axios.get(URL);
    const DATA = RESPONSE.data
    const weatherData = document.querySelector('#data')
    let cloudCover = DATA.clouds.all
    let clouds = document.createElement('p')
    console.log(weatherData)
    clouds.innerHTML = `Cloud cover: ${cloudCover}%`;
    weatherData.appendChild(clouds)
    
    // let clouds = DATA.clouds.all
    // addScore(clouds)
  } catch (error) {
    console.log(error)
  }
})


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