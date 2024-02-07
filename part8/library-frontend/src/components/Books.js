import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_BOOKS_BY_GENRE } from '../query'

const Books = (props) => {
  const [filter, setFilter] = useState('')

  const allBooksResult = useQuery(ALL_BOOKS)
  const filteredBooksResult = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: filter },
  })

  if (!props.show) return null
  if (allBooksResult.loading) return <div>loading...</div>
  if (filteredBooksResult.loading) return <div>loading...</div>

  const books = allBooksResult.data.allBooks
  const booksToShow = filteredBooksResult.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex' }}>
        {books.map(book => {
          return (
            <div key={book.title}>
              {book.genres.map(genre => (
                <button onClick={({ target }) => setFilter(target.textContent)} key={genre}>{genre}</button>
              ))}
            </div>
          )
        })}
        <button onClick={() => setFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
