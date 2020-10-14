import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

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
              <Field
                component={TextField}
                label='title'
                variant='filled'
                type='text'
                name='title'
                id='inputTitle'
                fullWidth
              />
            </div>
            <div>
              <Field
                component={TextField}
                label='author'
                variant='filled'
                type='text'
                name='author'
                id='inputAuthor'
              />
            </div>
            <div>
              <Field
                component={TextField}
                label='url'
                variant='filled'
                type='text'
                name='url'
                id='inputUrl'
                fullWidth
              />
            </div>
            <Button
              variant='contained'
              color='primary'
              startIcon={<CloudUploadIcon />}
              id='createButton'
              type='submit'
              disabled={isSubmitting}
            >
              create
            </Button>
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
