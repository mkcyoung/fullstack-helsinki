import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entry = (props) => {
  return <div>{props.name} {props.number}</div>
}

const Entries = ({names}) => {
  return (
    <div>
      {names.map((entry) => <Entry key={entry.name} name={entry.name} number={entry.number} />)}
    </div>
  )
}

const Filter = ({ value, handler }) => {
  return (
      <> find countries <input
      value={value}
      onChange={handler} 
      /> 
      </>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setPersons(response.data)
  //     })
  // }, [])

  const countriesToShow = newSearch === ''
    ? persons
    : persons.filter( (entry) => {
      return entry.name.toLowerCase().includes(newSearch.toLowerCase())
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
    </div>
  )
}

export default App