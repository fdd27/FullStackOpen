import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../query'

const Books = (props) => {
  const [filter, setFilter] = useState('')

  const result = useQuery(ALL_BOOKS)

  if (!props.show) return null
  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks
  const booksToShow = filter ? books.filter(b => b.genres.includes(filter)) : books

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
            <div key={book.id}>
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
