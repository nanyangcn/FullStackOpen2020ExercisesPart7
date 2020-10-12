import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'

const CreateBlogForm = ({ handleCreateBlog }) => {
  return (
    <div>
      <Formik
        initialValues={{ title: '', author: '', url: '' }}
        onSubmit={(values, { setSubmitting }) => {
          handleCreateBlog(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor='title'>title:</label>
              <Field type='text' name='title' id='inputTitle' />
            </div>
            <div>
              <label htmlFor='author'>author:</label>
              <Field type='text' name='author' id='inputAuthor' />
            </div>
            <div>
              <label htmlFor='url'>url:</label>
              <Field type='text' name='url' id='inputUrl' />
            </div>
            <button id='createButton' type='submit' disabled={isSubmitting}>
              create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

CreateBlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm
