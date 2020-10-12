import React from 'react'
import { Formik, Form, Field } from 'formik'

const LoginForm = ({ handleLogin }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor='username'>username:</label>
              <Field id='username' type='text' name='username' />
            </div>
            <div>
              <label htmlFor='password'>password:</label>
              <Field id='password' type='password' name='password' />
            </div>
            <button id='loginButton' type='submit' disabled={isSubmitting}>
              login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
