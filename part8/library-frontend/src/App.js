import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { GET_BOOKS_BY_GENRE, BOOK_ADDED, ALL_AUTHORS } from './query'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const localStorageToken = localStorage.getItem('library-user-token') 
    if (localStorageToken) setToken(localStorageToken)
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: GET_BOOKS_BY_GENRE, variables: { genre: '' } }, addedBook)
      window.alert(`Added book: ${addedBook.title}`)
    }
  })

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

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter(item => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
  cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    return {
      allAuthors: allAuthors.concat(addedBook.author)
    }
  })
}

export default App
