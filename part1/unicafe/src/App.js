import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>Noo feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.all} />
          <StatisticLine text='average' value={props.avg} />
          <StatisticLine text='positive' value={props.pos} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // state for total, average and % of positive
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  // feedback var takes 1 for positive, 0 for neutral and -1 for negative feedback
  const handleClick = (feedback) => {
    let newGood = good
    let newNeutral = neutral
    let newBad = bad
    let newAll = all + 1

    if (feedback === 1) {
      newGood++
      setGood(newGood)
    }
    else if (feedback === 0) {
      newNeutral++
      setNeutral(newNeutral)
    }
    else if (feedback === -1) {
      newBad++
      setBad(newBad)
    }

    setAll(newAll)
    setAverage((newGood - newBad) / newAll)
    setPositive((newGood + newNeutral - newBad) / newAll * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick(1)} text='good' />
      <Button handleClick={() => handleClick(0)} text='neutral' />
      <Button handleClick={() => handleClick(-1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={average} pos={positive} />
    </div>
  )
}

export default App