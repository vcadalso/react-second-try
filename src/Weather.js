import React, { useState } from "react";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";


export default function Weather (props) {
    const [weatherData,setWeatherData] = useState ({ready: false });
    const [city,setCity] = useState(props.defaultCity);
    function handleResponse (response) {
    console.log(response.data);
    setWeatherData({
        ready: true,
        coordinates: response.data.coord,
        temperature: response.data.main.temp,
        wind: response.data.wind.speed,
        date: new Date(response.data.dt * 1000),
        humidity: response.data.main.humidity,
        city: response.data.name,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
    });
}

function search () {
    const apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
}


function handleSubmit(event) {
    event.preventDefault();
    search(city);
}

function handleCityChange (event) {
    setCity(event.target.value);
}

if (weatherData.ready) {
    return (
        <div className="Weather"> 
        <form onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-9">
            <input type="search"  placeholder= "Enter a city..." className="form-control" autoFocus="on" onChange={handleCityChange}/> </div>
            <div className="col-3">
            <input type="submit" value="Search" className="btn btn-outline-secondary"/> </div> </div>
   
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates}/>
        </div>
    )
} else {
    search();
    return "Loading...";
}
}