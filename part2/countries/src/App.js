import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import ShowCountries from './components/ShowCountries';

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])


  // Returns all countries matching some part of input text
  const countriesToShow = newSearch === ''
        ? [] 
        : countries.filter( (country) => {
      return country.name.toLowerCase().includes(newSearch.toLowerCase())
    })
  

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <Filter
          value={newSearch}
          handler={handleSearch}
      />
      <ShowCountries countries={countriesToShow} />

    </div>
  )
}

export default App