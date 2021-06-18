import React from 'react';

const ShowCountry = ({country}) => {
    return (
      <div>
        <h1> {country.name} </h1>
        <div> capital {country.capital}</div>
        <div> population {country.population}</div>
        <h2> languages </h2>
        <ul>
          {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} height={'100px'}/>
      </div>
    )
  }
  
  const ShowCountries = ({countries}) => {
    // If > 10, prompt to be more specific 
    if (countries.length > 10){
      return <div>{'Too many countries, be more specific'}</div>
    }
    // If between 10 and 1, display list
    else if (countries.length > 1){
      return (
        <>
            {countries.map( (countries) => < div key={countries.name}> {countries.name} </div>)}  
        </>
      )
    }
    // If exactly 1, display more detailed info
    else if (countries.length === 1){
      return (
        <ShowCountry country={countries[0]}/>
      )
    }
    else{
      return null
    }
  }
  
export default ShowCountries
  