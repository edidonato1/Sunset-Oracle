# catch_the_sunset
# Project Overview

## Sunset Oracle

## Project Description

The app accepts a zip code as an input, the requests data from the OpenWeatherMap API, returning current weather data.  

It then runs specific data (i.e. clouds, humidity, wind speed, et.), and builds a score based on the specifics of the data received.  This score is based on how these conditions align with the conditions that tend to coordinate with more dramatic sunsets.  

Depending on the score, A message will appear that rates how tonight's sunset will be, using either a grade on the "A+ --> F" scale, or perhaps relatively arbitrary metrics. (i.e. "Amazing! Don't miss this one!", "Don't get your hopes up, doesn't look like a good sunset tonight", "Worth a look if you have the time, but don't get too excited")

These messages will append alongside basic information about the zip the user searched, such as state, city, and basic weather data.

## API and Data Sample

https://openweathermap.org/current

```{
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

## Wireframes

** See assets_wireframes folder **

### MVP/PostMVP

#### MVP
- Input form to accept user zip code
- Basic HTML structure that greets user to the app, and designated areas where output will appear
- Application receives input, requests specific data from API
- - Append specific data to body
- - Run additional data through a function that assigns a numerical score based on the data for that category
- - Scores from each category will be compiled to an overall score, that returns and appends an overall grade, along with a message to the user determined by the score.
- Message area is styled using CSS Flexbox
- Content scales responsively to viewport size


#### PostMVP  
- Display results from only one search at a time
- Improve responsiveness and overall page aesthetics
- "Crystal ball" styled area for background where sunset "score" will appear
- Implement one or more CSS animations
- "Sunset time" output for OpenWeatherMap returns time in a 10-digit format that I don't recognize. If there's time, I'd like like to figure out how to convert that to a usable unit to display the time the sun will set.
- - I know of one API that returns it in the right format, but in the UTC time zone.
- 


## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Sept 18-21| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|Sept 21| Project Approval | Incomplete
|Sept 22| Core Application Structure (HTML, CSS, etc.) | Incomplete
|Sept 23| MVP | Incomplete
|Sept 24| Post MVP/Styling | Incomplete
|Sept 25| Presentations | Incomplete

## Priority Matrix

** See assets_priority_matrix folder **

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: |
| Add Form | H | 3hrs| - - |
| Grab Data | H | 3hrs| - -  |
| Base HTML | M | 2.5hrs| - - |
| Assign /Compare Scores | H | 8hrs| - - |
| Append Results | H | 2.5hrs| - -  |
| Append Data | M | 1hrs| - -  |
| Flexbox Manipulation  | H | 4hrs| - -  |
| Responsive Design  | H | 4hrs| - -  |
| Additional CSS | L | 6hrs| - -  |
| Total | - -  | 34hrs| - -  |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
