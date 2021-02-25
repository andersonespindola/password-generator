import React, { FormEvent, useState } from 'react'

import Switch from '@material-ui/core/Switch'
import {
  Button,
  FormControlLabel,
  FormGroup,
  Slider,
  TextField,
  Typography
} from '@material-ui/core'

const FormGenerator: React.FC = () => {
  /**
   * States.
   */
  const [size, setSize] = useState<number>(16)
  const [password, setPassword] = useState<string>('')

  const [state, setState] = useState({
    numbers: false,
    capitalLetters: false,
    specialCharacters: false
  })

  const marks = [
    { value: 4, label: '4' },
    { value: 32, label: '32' }
  ]

  const changeSize = (event: any, newValue: number | number[]) => {
    setSize(newValue as number)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const newPassword = () => {
    const getRandomLetter = () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 97)

    const getCapitalLetters = () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 65)

    const getNumbers = () =>
      String.fromCharCode(Math.floor(Math.random() * 10) + 48)

    const symbols = '~!@#$%^&*()_+{}":?><;.,'

    const getSpecialCharacters = () =>
      symbols[Math.floor(Math.random() * symbols.length)]

    const generators = [
      getRandomLetter,
      getCapitalLetters,
      getNumbers,
      getSpecialCharacters
    ]

    const filters = [
      state.capitalLetters ? 1 : '',
      state.numbers ? 2 : '',
      state.specialCharacters ? 3 : ''
    ]

    const normalizedFilters = [0, ...filters.filter(select => select)]

    const randomFilter = () =>
      normalizedFilters[Math.floor(Math.random() * normalizedFilters.length)]

    return new Array(size)
      .fill('')
      .map(_ => generators[+randomFilter()]())
      .join('')
  }

  const generatePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPassword(newPassword)
  }

  return (
    <form onSubmit={generatePassword}>
      <h1 style={{ textAlign: 'center' }}>Password generator</h1>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.capitalLetters}
              onChange={handleChange}
              color="primary"
              name="capitalLetters"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Capital letters"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.numbers}
              onChange={handleChange}
              color="primary"
              name="numbers"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Numbers"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.specialCharacters}
              onChange={handleChange}
              color="primary"
              name="specialCharacters"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Special Characters"
        />
        <Typography
          id="discrete-slider-always"
          gutterBottom
          style={{ marginTop: '15px' }}
        >
          Characters quantity
        </Typography>
        <Slider
          value={size}
          onChange={changeSize}
          aria-labelledby="discrete-slider-always"
          min={4}
          max={32}
          step={1}
          marks={marks}
          valueLabelDisplay="on"
          style={{ width: '80%', alignSelf: 'center' }}
        />
        <TextField
          id="password-input"
          label="Generated password"
          value={password}
          InputProps={{
            readOnly: true
          }}
          style={{ marginTop: '10px' }}
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: '10px', alignSelf: 'center' }}
          color="primary"
        >
          Generate
        </Button>
      </FormGroup>
    </form>
  )
}

export default FormGenerator
