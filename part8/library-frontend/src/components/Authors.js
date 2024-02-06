import { useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_BORN } from '../query'
import Select from 'react-select'

const BornForm = () => {
  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const options = allAuthorsResult.data.allAuthors.map(a => ({ value: a.name, label: a.name }))

  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')


  const [ editBorn, result ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if (result.data && result.data.editBorn === null) console.error('Author not found')
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    editBorn({ variables: { name: selectedOption.value, born } })

    setSelectedOption(null)
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
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
