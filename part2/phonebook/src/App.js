import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [type, setType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

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
    const newPersonObject = { name: newName, phone: newNum }

    const isFound = persons.some(person => {
      if (person.name.toLowerCase() === newPersonObject.name.toLocaleLowerCase() && person.phone === newPersonObject.phone) return true
      else return false
    })

    if (isFound) {
      alert(`${newName} is already in the phonebook`)
    }
    // If same name but different phone, update
    else if (persons.some(person => person.name.toLowerCase() === newPersonObject.name.toLowerCase())) {

      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const id = persons.find(p => p.name === newPersonObject.name).id

        personService
          .update(id, newPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))

            setNewName('')
            document.getElementById('name').value = ''

            setNewNum('')
            document.getElementById('number').value = ''

            showNotification(`Updated ${newPersonObject.name}`, 'success')
          })
          .catch(error => {
            showNotification(`Information of ${newPersonObject.name} has already been removed from the server`, 'error')
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    }
    else {
      personService
        .create(newPersonObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))

          setNewName('')
          document.getElementById('name').value = ''

          setNewNum('')
          document.getElementById('number').value = ''

          showNotification(`Added ${newPersonObject.name}`, 'success')
        })
        .catch(error => showNotification(error.response.data.error, 'error'))
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteEntry(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          showNotification(`Information of ${name} has already been removed from the server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const showNotification = (message, type) => {
    setType(type)
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} type={type} />

      <Filter handleChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        handleAdd={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App