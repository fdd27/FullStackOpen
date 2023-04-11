import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initVotes = Array(8).fill(0)
  const [votes, setVotes] = useState(initVotes)

  const [selected, setSelected] = useState(0)
  const [highest, setHighest] = useState(0)

  const handleClick = () => {
    const random = Math.floor((Math.random() * 8))
    setSelected(random)
    
  }

  const voteClick = () => {
    const copy = { ...votes }
    copy[selected]++
    setVotes(copy)

    if (copy[selected] > copy[highest]) {
      setHighest(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteClick}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highest]}</p>
      <p>has {votes[highest]} votes</p>
    </div>
  )
}

export default App