# catch_the_sunset
# Project Overview

## Sunset Oracle

## Project Description

The app accepts a zip code as an input, the requests data from the OpenWeatherMap API, returning current weather data.  

It then runs specific data (i.e. clouds, humidity, wind speed, etc.), and builds a score based on the specifics of the data received.  This score is based on how these conditions align with the conditions that tend to coordinate with more dramatic sunsets.  

Depending on the score, A message will appear that rates how tonight's sunset will be, using either a grade on the "A+ --> F" scale, or perhaps relatively arbitrary metrics. (i.e. "Amazing! Don't miss this one!", "Don't get your hopes up, doesn't look like a good sunset tonight", "Worth a look if you have the time, but don't get too excited")

These messages will append alongside basic information about the zip the user searched, such as state, city, and basic weather data.

## API and Data Sample

https://openweathermap.org/current

```
{
    "coord": {
        "lon": -117.12,
        "lat": 32.76
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 304.01,
        "feels_like": 303.44,
        "temp_min": 299.82,
        "temp_max": 307.59,
        "pressure": 1012,
        "humidity": 43
    }
```

http://api.zippopotam.us/us/90210

```{
    "post code": "90210",
    "country": "United States",
    "country abbreviation": "US",
    "places": [
        {
            "place name": "Beverly Hills",
            "longitude": "-118.4065",
            "state": "California",
            "state abbreviation": "CA",
            "latitude": "34.0901"
        }
    ]
}
```

## Wireframes

** See assets_wireframes folder

https://github.com/edidonato1/catch_the_sunset/tree/master/assets_wireframes

### MVP/PostMVP

#### MVP
- Input form to accept user zip code -[x]
- Basic HTML structure that greets user to the app, and designated areas where output will appear -[x]
- Application receives input, requests specific data from API -[x]
- - Append specific data to body -[x]
- - Run additional data through a function that assigns a numerical score based on the data for that category -[x]
- - Scores from each category will be compiled to an overall score, that returns and appends an overall grade, along with a message to the user determined by the score. -[x]
- Message area is styled using CSS Flexbox -[x]
- Content scales responsively to viewport size -[x]


#### PostMVP  
- Display results from only one search at a time -[x]
- Improve responsiveness and overall page aesthetics -[x]
- "Crystal ball" styled area for background where sunset "score" will appear -[x]
- Implement one or more CSS animations -[x]
- "Sunset time" output for OpenWeatherMap returns time in a 10-digit format that I don't recognize. If there's time, I'd like like to figure out how to convert that to a usable unit to display the time the sun will set. -[x]
- - I know of one API that returns it in the right format, but in the UTC time zone. -[x]


## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Sept 18-21| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|Sept 21| Project Approval | Complete 
|Sept 22| Core Application Structure (HTML, CSS, etc.) | Complete
|Sept 23| MVP | Complete
|Sept 24| Post MVP/Styling | Complete
|Sept 25| Presentations | Incomplete

## Priority Matrix

** See assets_priority_matrix folder

https://github.com/edidonato1/catch_the_sunset/tree/master/assets_%20priority_matrix

## Timeframes

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: |
| Add Form | H | 3hrs| 1hr |
| Grab Data | H | 3hrs| 1hr |
| Base HTML | M | 2.5hrs| 1hr |
| Assign /Compare Scores | H | 8hrs| 3hrs |
| Append Results | H | 2.5hrs| 1hr  |
| Append Data | M | 2hrs| 1hr  |
| Flexbox Manipulation  | H | 4hrs| 5hrs  |
| Responsive Design  | H | 4hrs| 4hrs  |
| Additional CSS | L | 6hrs| 14hrs  |
| Total | - -  | 35hrs| 31hrs  |


## Code Snippet

Snippet from the end of the asynchronous event listener expression:
```
    // Compare Data and Score to compile message
    const finalScore = compareData(temperature, wind, clouds, description, humidity)
    const messageText = document.querySelector('#message')
    console.log(finalMessage(finalScore))
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
```

Use setTimeout() to give effect that text from input area is erased by the "blink" animation:
```
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
```


## Change Log
 
 ### Switch from letter grade to percentage score
 Feels more legitimate  when score is presented to user as product of computation rather than an artibrary letter grade. Simple Math.round and a little math returns a clean score out of 100.

 ### Render background color for temperature display that changes based on the temp.
 Adds contrast to the aesthetic of the page.

### Add time of sunset to weather data
Adds a useful element to the functionality and purpose of the app.

### Remove custom message
Was overcrowding the message area.  Didn't add much to the experience.

### Add error message 
Able to append error message, targeting 404 errors for data that isn't found. In other words, when an invalid zip code is entered, the "catch" identifies this error and notifies the user to use a valid zip code.  This alert fits into the aesthetics of the page.