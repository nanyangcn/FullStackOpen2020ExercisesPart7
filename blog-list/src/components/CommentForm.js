import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const CommentForm = ({ blog, handleCreateComment }) => {
  return (
    <div>
      <Formik
        initialValues={{ comment: '' }}
        onSubmit={(values, { setSubmitting }) => {
          handleCreateComment(blog, values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                component={TextField}
                label='new comment'
                variant='filled'
                fullWidth
                type='text'
                name='comment'
                id='inputComment'
              />
              <Button
                variant='contained'
                color='primary'
                startIcon={<CloudUploadIcon />}
                id='createCommentButton'
                type='submit'
                disabled={isSubmitting}
              >
                add comment
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CommentForm
