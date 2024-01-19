import { useState } from "react"

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => setValue(event.target.value)

  return { type, value, onChange }
}

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('Number')

  return (
    <div>
      <form>
        name: <input type={name.type} value={name.value} onChange={name.onChange} /> 
        <br/> 
        birthdate: <input {...born} />
        <br /> 
        height: <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value} 
      </div>
    </div>
  )
}

export default App