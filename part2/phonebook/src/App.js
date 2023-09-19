import { useState } from 'react'

const Filter = ({ handleChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleChange} />
    </div>
  )
}

const PersonForm = ({ handleAdd, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleAdd}>
      <div>
        name: <input onChange={handleNameChange} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <Person name={person.name} number={person.number} />)}
    </div>
  )
}

const Person = ({ name, number }) => {
  return (
    <p key={name}>{name} {number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearchChange = (event) => {
    if (event.target.value !== '') setShowAll(false)
    else setShowAll(true)

    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = { name: newName, number: newNum }

    const isFound = persons.some(person => {
      if (person.name === newPersonObject.name && person.number === newPersonObject.number) return true
      else return false
    })

    if (isFound) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setPersons(persons.concat(newPersonObject))
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        handleAdd={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App