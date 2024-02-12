//state
let currCity = `London`;
let units = `metric`;

// Selectors
let city = document.querySelector('.weather__city');
let datetime = document.querySelector('.weather__datetime');
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector('.weather__temperature');
let weather__icon = document.querySelector('.weather__icon');
let weather__minmax = document.querySelector('.weather__minmax');
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

// search
document.querySelector('.weather__search').addEventListener('submit', e => {
    let search = document.querySelector('.weather__searchform');
    // prevent default action - when you submit form page reload so to prevent it 
    e.preventDefault();
    // Change current city
    currCity = search.value;
    // get weather forecast
    getWeather();
    search.value = ''; 
    console.log('submitted')
})

// units
document.querySelector('.weather_units_celsius').addEventListener('click', ()=> {
    if(units !== `metric`) {
        units = `metric`;
        getWeather();
        console.log('metric unit')
        document.querySelector('.weather_units_celsius').style.color = 'red';
        document.querySelector('.weather_units_farenheit').style.color = '#fff';
        document.querySelector('.weather_units_celsius').style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
        document.querySelector('.weather_units_farenheit').style.boxShadow = 'none';
    }
})
document.querySelector('.weather_units_farenheit').addEventListener('click', ()=> {
    if(units !== `imperial`) {
        units = `imperial`;
        getWeather();
        console.log('imperial unit')
        document.querySelector('.weather_units_farenheit').style.color = 'red';
        document.querySelector('.weather_units_celsius').style.color = '#fff';
        document.querySelector('.weather_units_farenheit').style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
        document.querySelector('.weather_units_celsius').style.boxShadow = 'none';
    }
})

// convert country code to name
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(['en'],{type:'region'});
    return regionNames.of(country);
}

// Convert timestamp and timezone in time
function convertTimeStamp(timestamp, timezone) {
    const convertTimeZone = timezone/3600; // convert seconds to hours

    const date = new Date(timestamp * 1000);

    const options ={
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: `Etc/GMT${convertTimeZone >= 0? '-' : '+'}${Math.abs(convertTimeZone)}`,
        hour12: true  
    };
    return date.toLocaleString('en-US', options);
}

function getWeather() {
    const API_KEY = `d1619ac16cac10bc33092f13aea9a95d`;

    fetch( `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
    .then(res => res.json())
    .then(data => {
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        console.log(data);
        weather__forecast.innerHTML = `<p>${data.weather[0].main}`;
        weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176${units === 'metric'? 'C':'F'}`;
        weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`;
        weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176${units === 'metric'? 'C':'F'}</p><p>Max: ${data.main.temp_max.toFixed()}&#176${units === 'metric'? 'C':'F'}</p>`;
        weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176${units === 'metric'? 'C':'F'}`
        weather__humidity.innerHTML = `${data.main.humidity}%`;
        weather__wind.innerHTML = `${data.wind.speed} ${units === 'imperial'? 'mph':'m/s'}`;
        weather__pressure.innerHTML = `${data.main.pressure} hPa`;
        console.log("done")
    })
}

document.body.addEventListener('load', getWeather());
