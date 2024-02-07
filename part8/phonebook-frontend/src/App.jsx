import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const App = () => {
    const result = useQuery(ALL_PERSONS)
    const [error, setError] = useState(null)
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useSubscription(PERSON_ADDED, {
        onData: ({ data, client }) => {
            const addedPerson = data.data.personAdded
            notify(`${addedPerson.name} added`)
            updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
        }
    })

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

export const updateCache = (cache, query, addedPerson) => {
    const uniqByName = (a) => {
        let seen = new Set()
        return a.filter(item => {
            let k = item.name
            return seen.has(k) ? false : seen.add(k)
        })
    }

    cache.updateQuery(query, ({ allPersons }) => {
        return {
            allPersons: uniqByName(allPersons.concat(addedPerson))
        }
    })
}

export default App