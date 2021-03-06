import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';


function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data)
  }

  let onlyweather = axios.get("https://api.openweathermap.org/data/2.5/weather");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });

    console.log(onlyweather);
  }, []) 

  function roundUnit(input) {
    return (
      Math.round(input)
    )
  }

  if(location == false) {
    return (
      <h4>
        Você precisa habilitar a localização no browser.
      </h4>
    )
  } else if(weather == false) {
    return (
      <h4>
        Carregando o clima...
      </h4>
    )
  } else {
    return (
      <>
        <div className="card">
          <h3>Clima em {weather['name']} ({weather['weather'][0]['description']})</h3>
          <ul>
            <li>Temperatura atual: {roundUnit(weather['main']['temp'])} Cº</li>
            <li>Sensação de: {roundUnit(weather['main']['feels_like'])} Cº</li>
            <li>Máxima: {roundUnit(weather['main']['temp_max'])} Cº</li>
            <li>Mínima: {roundUnit(weather['main']['temp_min'])} Cº</li>
            <li>Pressão: {roundUnit(weather['main']['pressure'])}hpa</li>
            <li>Umidade: {weather['main']['humidity']}%</li>
          </ul>
        </div>
      </>
    )
  }
}

export default App;
