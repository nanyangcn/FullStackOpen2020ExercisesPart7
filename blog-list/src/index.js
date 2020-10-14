import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import App from './App'
import store from './store'
import './App.css'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Container maxWidth='lg'>
        <App />
      </Container>
    </Provider>
  </Router>,
  document.getElementById('root')
)
