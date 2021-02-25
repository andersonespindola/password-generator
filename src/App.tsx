import React from 'react'
import { Card, Container } from '@material-ui/core'

import './App.css'
import FormGenerator from './components/FormGenerator'

function App() {
  return (
    <Container maxWidth="sm">
      <Card style={{ padding: '10px', marginTop: '12%' }}>
        <FormGenerator />
      </Card>
    </Container>
  )
}

export default App
