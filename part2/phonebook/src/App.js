import React, { useState } from 'react'


const Number = (props) => {
  return <div>{props.name}</div>
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    // prevent the page from reloading
    event.preventDefault()
    // create new person object with name, etc.
    const personObject = {
      name: newName
    }
    // update the persons state with new stuff
    setPersons(persons.concat(personObject))
    // reset the new name
    setNewName('')
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
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((entry) => <Number key={entry.name} name={entry.name} />)}
      </div>
    </div>
  )
}

export default App