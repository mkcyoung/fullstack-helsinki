import React, { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => {
  return (
    <tr> 
      <td>{text}</td> 
      <td>{value}</td> 
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let total = (good + bad + neutral)
  if (total === 0){
    return "No feedback given"
  }
  else{
    //Creating averaging function
    const getAverage = (good,bad,neutral) => {
      return ((good*1) + (bad*-1))/total
    }

    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + bad + neutral} />
          <Statistic text="average" value={getAverage(good,bad,neutral).toPrecision(2)} />
          <Statistic text="positive" value={ (good/(total) * 100).toPrecision(3) + "%"} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Creating event handlers
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  
  return (
    <div>
      <Header title = {"give feedback"} />
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text={'neutral'}/>
      <Button handleClick={handleBadClick} text={'bad'}/> 
      <Header title = {"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
