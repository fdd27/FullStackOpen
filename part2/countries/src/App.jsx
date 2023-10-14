import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

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
        if (c.name.common.toLowerCase().includes(event.target.value.toLowerCase()) || c.name.official.toLowerCase().includes(event.target.value.toLowerCase())) return c
      }))
    }
    else {
      setFilteredCountries(null)
    }
  }

  const handleClick = country => {
    setFilteredCountries([country])
    document.getElementById('inp').value = `${country.name.common}`
  }

  if (!allCountries || filteredCountries === null) {
    return (
      <>
        find countries <input id='inp' onChange={handleChange} />
      </>
    )
  }
  if (filteredCountries.length > 10) {
    return (
      <>
        find countries <input id='inp' onChange={handleChange} />
        <p>Too many matches, specify another filter</p>
      </>
    )
  }
  if (filteredCountries.length > 1) {
    return (
      <>
        find countries <input id='inp' onChange={handleChange} />
        {filteredCountries.map(c =>
          <div key={c.name.official} className='country'>
            {c.name.common}
            <button onClick={() => handleClick(c)}>show</button>
          </div>)}
      </>
    )
  }
  if (filteredCountries.length === 1) {
    return (
      <>
        find countries <input id='inp' onChange={handleChange} />
        <h1>{filteredCountries[0].name.common}</h1>
        <p>{filteredCountries[0].capital}</p>
        <p>{filteredCountries[0].area}</p>
        <strong>languages:</strong>
        <ul>
          {Object.entries(filteredCountries[0].languages).map(lang => <li key={lang[0]}>{lang[1]}</li>)}
        </ul >
        <img src={filteredCountries[0].flags.png} alt="flag" />
      </>
    )
  }
  return (
    <>
      find countries <input id='inp' onChange={handleChange} />
    </>
  )
}

export default App
