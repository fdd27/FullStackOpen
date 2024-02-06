import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const App = () => {
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)
    const client = useApolloClient()

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

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (!token) {
        return (
            <>
                <Notify errorMsg={error} />
                <LoginForm setToken={setToken} setError={notify} />
            </>
        )
    }

    return (
        <>
            <Notify errorMsg={error} />
            <button onClick={logout}>logout</button>
            <Persons persons={result.data.allPersons}/>
            <PersonForm setError={notify} />
            <PhoneForm setError={notify} />
        </>
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