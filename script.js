class City{
    constructor(cityName,description,temp,maxTemp,minTemp,feelTemp,humidity,windSpeed){
        this._cityName = cityName
        this._description = description
        this._temp = temp
        this._maxTemp = maxTemp
        this._minTemp = minTemp
        this._feelTemp = feelTemp
        this._humidity = humidity
        this._windSpeed = windSpeed
    }
     get cityName(){return this._cityName}
     get description(){return this._description}
     get temp(){return this._temp}
     get maxTemp(){return this._maxTemp}
     get minTemp(){return this._minTemp}
     get feelTemp(){return this._feelTemp}
     get humidity(){return this._humidity}
     get windSpeed(){return this._windSpeed}

}
const searchButton = document.querySelector('#search-button')
const searchBar = document.querySelector('#search-bar')

async function getWeather(city){
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27e1317dd7a01c91b570e159116336c3`)
    .then((response)=>{
        return response.json()
    })
    .then(data=>{
        
        const city = new City(data.name,data.weather[0].description,data.main.temp,data.main.temp_max,data.main.temp_min,data.main.feels_like,data.main.humidity,data.wind.speed)
        displayWeather(city)
    })
    .catch(e=>{
        searchBar.value='No such city found'
    })
};

const tempEl = document.querySelector('.temp')
const cityNameEl = document.querySelector('.city-name')
const descriptionEl = document.querySelector('.description')
const maxTempEl = document.querySelector('.max-temp')
const minTempEl = document.querySelector('.min-temp')
const feelTempEl = document.querySelector('.feel-temp')
const humidityEl = document.querySelector('.humidity')
const windEl = document.querySelector('.wind-speed')

function toCelsius(temp){
    return Math.floor((temp-273.15)*100)/100
}


function displayWeather(city){
    tempEl.innerText = toCelsius(city.temp) + '°C'
    cityNameEl.innerText = city.cityName
    descriptionEl.innerText = city.description
    maxTempEl.innerText = toCelsius(city.maxTemp)+ '°C'
    minTempEl.innerText = toCelsius(city.minTemp)+ '°C'
    feelTempEl.innerText = toCelsius(city.feelTemp)+ '°C'
    humidityEl.innerText = 'humidity: '+city.humidity +'%'
    windEl.innerText = 'wind: '+city.windSpeed +'m/s'

    if(toCelsius(city.temp)<0){
        getGif('cold')
        
    }if(toCelsius(city.temp)>0 && toCelsius(city.temp)<=15){
        getGif('spring')
    } 
    
    if(toCelsius(city.temp)>15 && toCelsius(city.temp)<20){
        getGif('warm weather')
    }if(toCelsius(city.temp)>=20){
        getGif('hot weather')
    }
    
}


searchButton.addEventListener('click',()=>{
    let cityName = searchBar.value
    getWeather(cityName)
})

getWeather('North Pole')

const gifPlaceholder = document.querySelector('#gif')

async function getGif(phrase){
    await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=zHzpKXatsicUHz4432yThOewzfKpB57k&s=${phrase}`)
    .then(response=>{return response.json()})
    .then(data=>{
        console.log(data)
        gifPlaceholder.src = data.data.images.original.url
    })

    

}