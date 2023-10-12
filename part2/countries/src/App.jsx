import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [allCountries, setAllCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAllCountries(response.data))
  }, [])

  const handleChange = (event) => {
    if (event.target.value !== '') {
      setFilteredCountries(allCountries.filter(c => {
        if (c.name.common.includes(event.target.value) || c.name.official.includes(event.target.value)) return c
      }))
    }
    else {
      setFilteredCountries(null)
    }
  }

  if (!allCountries || filteredCountries === null) {
    return (
      <>
        find countries <input onChange={handleChange} />
      </>
    )
  }
  if (filteredCountries.length > 10) {
    return (
      <>
        find countries <input onChange={handleChange} />
        <p>Too many matches, specify another filter</p>
      </>
    )
  }
  if (filteredCountries.length > 1) {
    return (
      <>
        find countries <input onChange={handleChange} />
        {filteredCountries.map(c => <p key={c.name.official}>{c.name.common}</p>)}
      </>
    )
  }
  if (filteredCountries.length === 1) {
    return (
      <>
        find countries <input onChange={handleChange} />
        <h1>{filteredCountries[0].name.common}</h1>
        <p>{filteredCountries[0].capital}</p>
        <p>{filteredCountries[0].area}</p>
        <strong>languages:</strong>
        <ul>
          {filteredCountries[0].languages > 1 ? filteredCountries[0].languages.forEach(l => <p>{l.value}</p>) : filteredCountries[0].languages.value}
        </ul>
        <img src={filteredCountries[0].flags.png} alt="flag" />
      </>
    )
  }
  return (
    <>
      find countries <input onChange={handleChange} />
    </>
  )
}

export default App
