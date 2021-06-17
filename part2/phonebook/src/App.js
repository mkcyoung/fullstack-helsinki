import React, { useState } from 'react'


const Entry = (props) => {
  return <div>{props.name} {props.number}</div>
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '801-362-5483'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
    // update the persons state with new stuff
    setPersons(persons.concat(personObject))
    // reset the new name
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNewName}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((entry) => <Entry key={entry.name} name={entry.name} number={entry.number} />)}
      </div>
    </div>
  )
}

export default App