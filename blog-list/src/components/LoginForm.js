import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import Button from '@material-ui/core/Button'

const LoginForm = ({ handleLogin }) => {
  const loginFormStyle = {
    textAlign: 'center',
    margin: 'auto',
    position: 'absolute',
    width: '300px',
    height: '400px',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
  return (
    <div style={loginFormStyle}>
      <h2>Log in to application</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          handleLogin(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                component={TextField}
                label='username'
                variant='outlined'
                id='username'
                type='text'
                name='username'
              />
            </div>
            <br />
            <div>
              <Field
                component={TextField}
                label='password'
                variant='outlined'
                id='password'
                type='password'
                name='password'
              />
            </div>
            <br />
            <div>
              <Button
                id='loginButton'
                type='submit'
                disabled={isSubmitting}
                variant='contained'
                color='primary'
                style={{
                  maxWidth: '210px',
                  maxHeight: '55px',
                  minWidth: '210px',
                  minHeight: '55px',
                }}
              >
                login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
