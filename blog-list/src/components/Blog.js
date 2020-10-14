import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'

import CommentForm from './CommentForm'

const Blog = ({
  loggedUser,
  blog,
  handleLikeClick,
  handleRemoveClick,
  handleCreateComment,
}) => {
  if (!blog) {
    return null
  }

  const removeButtonStyle = {
    display: loggedUser.username === blog.user.username ? '' : 'none',
  }

  return (
    <div className='blog'>
      <div>
        <h2>
          {blog.title} - {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <br />
        <br />
        <Divider />
        <br />
        <div>
          added by <b>{blog.user.name} </b>
          <Button
            style={removeButtonStyle}
            size='small'
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            id='removeButton'
            onClick={() => handleRemoveClick(blog)}
          >
            remove
          </Button>
        </div>
      </div>

      <div>
        <span className='likes'>{blog.likes} likes </span>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          id='likeButton'
          onClick={() => handleLikeClick(blog)}
        >
          <span role='img' aria-label='likeIcon'>
            &#128077;like
          </span>
        </Button>
      </div>
      <br />
      <div>
        <Divider />
        <h3>comments</h3>
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableBody>
              {blog.comments.map((comment, i) => (
                <TableRow key={i}>
                  <TableCell component='th' scope='row'>
                    {comment}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Divider />
        <br />
        <CommentForm blog={blog} handleCreateComment={handleCreateComment} />
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
}

export default Blog
