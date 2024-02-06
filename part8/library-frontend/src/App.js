import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const localStorageToken = localStorage.getItem('library-user-token') 
    if (localStorageToken) setToken(localStorageToken)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommended')}>recommended</button>
              <button onClick={logout}>logout</button>
            </>
            : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setPage={setPage} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
      <Recommended show={page === 'recommended'} />
    </div>
  )
}

export default App
