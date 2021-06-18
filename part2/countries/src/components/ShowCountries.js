import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Button = ({text, country, handler}) => {
    return (
        <button name={country.name} onClick={handler}>
            {text}
        </button>
    )
}

const ShowCountry = ({country}) => {
    const [ weather, setNewWeather ] = useState('')

    const params = {
        access_key: api_key,
        query: country.capital
      }
    // Make a request - not sure if I should use use-effect here?
    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                console.log('promise fulfilled')
                console.log(response.data)
                setNewWeather(response.data)
            })
    }, [])

    return (
      <div>
        <h1> {country.name} </h1>
        <div> capital {country.capital}</div>
        <div> population {country.population}</div>
        <h2> Spoken languages </h2>
        <ul>
          {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} height={'100px'}/>
        <ShowWeather weather={weather}/>
      </div>
      
    )
  }

  const ShowWeather = ({weather}) => {
      if (weather !== ''){
        return (
            <div>
                <h2> Weather in {weather.location.name} </h2>
                <div> <b>temperature:</b> {weather.current.temperature} Celcius</div>
                <img src={weather.current.weather_icons[0]} height={'100px'}/>
                <div><b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
            </div>
        )
      }
      return null
  }
  
  const ShowCountries = ({countries,onButtonClick}) => {
    // If > 10, prompt to be more specific 
    if (countries.length > 10){
      return <div>{'Too many countries, be more specific'}</div>
    }
    // If between 10 and 1, display list
    else if (countries.length > 1){
      return (
        <>
            {countries.map( (country) => < div key={country.name}> {country.name} 
                <Button text={'show'} country={country} handler={onButtonClick} /> 
                </div>)}  
        </>
      )
    }
    // If exactly 1, display more detailed info
    else if (countries.length === 1){
        return (
            <>
                <ShowCountry country={countries[0]}/>
            </>
        )
        
    }
    else{
      return null
    }
  }
  
export default ShowCountries
  