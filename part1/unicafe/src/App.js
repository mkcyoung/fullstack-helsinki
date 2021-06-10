import React, { useState } from 'react'

const Header = (props) => {
  return <h1>{props.title}</h1>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Stat = ({ text, value }) => (
  <div> {text} {value} </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Creating event handlers
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  //Creating averaging function
  const average = (good,bad,neutral) => {
    let total = (good + bad + neutral)
    if (total == 0){
      return "click to give feedback!"
    }
    return ((good*1) + (bad*-1))/total
  }
  
  return (
    <div>
      <Header title = {"give feedback"} />
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/> 
      <Header title = {"statistics"} />
      <Stat text="good" value={good} />
      <Stat text="neutral" value={neutral} />
      <Stat text="bad" value={bad} />
      <Stat text="all" value={good + bad + neutral} />
      <Stat text="average" value={average(good,bad,neutral)} />
      <Stat text="positive" value={good/(good+bad+neutral) + " %"} />
    </div>
  )
}

export default App
