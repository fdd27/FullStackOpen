import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'

const App = () => {
    const [error, setError] = useState(null)

    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        return <div>loading...</div>
    }

    const notify = (message) => {
        setError(message)
        setTimeout(() => {
            setError(null)
        }, 5000)
    }

    return (
        <div>
            <Notify errorMsg={error} />
            <Persons persons={result.data.allPersons}/>
            <PersonForm setError={notify} />
            <PhoneForm />
        </div>
    )
}

const Notify = ({ errorMsg }) => {
    if (!errorMsg) return null
    return (
        <div style={{ color: 'red' }}>
            {errorMsg}
        </div>
    )
}

export default App