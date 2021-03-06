import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if (name !== '') {
      const baseUrl = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
      axios
        .get(baseUrl)
        .then((response) => {
          const countryReceived = {}
          countryReceived.found = true
          countryReceived.data = response.data[0]
          setCountry(countryReceived)
        })
        .catch(() => {
          const countryReceived = { found: false }
          setCountry(countryReceived)
        })
    }
  }, [name])

  return country
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
