import { useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_BORN } from '../query'

const BornForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editBorn, result ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if (result.data && result.data.editBorn === null) console.error('Author not found')
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    editBorn({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name <input type='text' onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          born <input type='text' onChange={({ target }) => setBorn(Number(target.value))} />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) return null
  if (result.loading) return <div>loading...</div>

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BornForm />
    </div>
  )
}

export default Authors
