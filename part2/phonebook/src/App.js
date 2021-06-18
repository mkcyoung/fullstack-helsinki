import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook';

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

const Filter = (props) => {
  return (
      <> filter shown with <input
      value={props.value}
      onChange={props.onChange} 
      /> 
      </>
  )
}

const FormInput = ({text,value,handler}) => {
  return (
    <div>
      {text}: <input 
      value={value}
      onChange={handler}
      />
    </div>
  )
}

const AddForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <FormInput text='name' 
          value={props.values.name}
          handler={props.functions.name}
      />
      <FormInput text='number'
          value={props.values.number}
          handler={props.functions.number}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    console.log('effect')
    phonebookService
      .getAll()
      .then(initialEntries => {
        setPersons(initialEntries)
      })
  }, [])

  const namesToShow = newSearch === ''
    ? persons
    : persons.filter( (entry) => {
      return entry.name.toLowerCase().includes(newSearch.toLowerCase())
    })

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const addName = (event) => {
    // prevent the page from reloading
    event.preventDefault()
    
    // Check if name is already in state
    if (persons.map((entry) => entry.name).includes(newName) ){
      // return alert
      window.alert(`${newName} is already added to the phonebook, nerd.`)
      // Then break
      return
    }
    // create new person object with name, etc.
    const personObject = {
      name: newName,
      number: newNumber
    }

    // post the new entry to the backend 
    phonebookService
      .create(personObject)
      .then(returnedEntry => {
        // update the persons state with new stuff
        setPersons(persons.concat(returnedEntry))
        // reset hooks
        setNewName('')
        setNewNumber('')
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newSearch}
          onChange={handleSearch}
      />

      <h2>add a new</h2>

      <AddForm onSubmit={addName}
          values={
            {
              name:newName,
              number:newNumber
            }
          } 
          functions={
            {
              name:handleNewName,
              number:handleNewNumber
            }
          } 
      />

      <h2>Numbers</h2>

      <Entries names={namesToShow} />
      
    </div>
  )
}

export default App