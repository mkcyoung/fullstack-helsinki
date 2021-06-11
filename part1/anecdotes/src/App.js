import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  // get length of array
  const array_length = anecdotes.length

  let points = {}
  // creating vote state
  for  (let i = 0; i < array_length; i++){
    points[i] = 0
  }
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)


  const handleRandomClick = () => {
    // generate random int within the array length
    let random_Int = Math.floor(Math.random() * array_length)
    // if random int is the previous selected, change it to another valid value
    while (random_Int === selected){
      random_Int = Math.floor(Math.random() * array_length)
    }
    setSelected(random_Int)
  }

  const handleVoteClick = () => {
    // Add 1 to selected 
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
  }

  // find anecdote with most votes
  let maxVotes = 0
  let maxAnecdote = 0
  for (const [key,value] of Object.entries(votes)) {
    if (value > maxVotes){
      maxVotes = value
      maxAnecdote = key
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has <b>{votes[selected]}</b> votes</p>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleRandomClick} text="give me another"/>
      <Header text="Anecdote with the most votes" />
      <div>{anecdotes[maxAnecdote]}</div>
      <p>has <b>{maxVotes}</b> votes</p>
    </div>
  )
}

export default App
