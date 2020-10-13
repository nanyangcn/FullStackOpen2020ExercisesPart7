import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ loggedUser, blog, handleLikeClick, handleRemoveClick }) => {
  if (blog && loggedUser) {
    const removeButtonStyle = {
      backgroundColor: '#3D75FF',
      borderRadius: '4px',
      display: loggedUser.username === blog.user.username ? '' : 'none',
    }

    return (
      <div className='blog'>
        <div>
          <h2>
            {blog.title} {blog.author}
          </h2>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          <span className='likes'>{blog.likes} likes</span>
          <button id='likeButton' onClick={() => handleLikeClick(blog)}>
            like
          </button>
        </div>
        <div>added by {blog.user.username}</div>
        <button
          id='removeButton'
          style={removeButtonStyle}
          onClick={() => handleRemoveClick(blog)}
        >
          remove
        </button>
        <div>
          <h3>comments</h3>
          <ul></ul>
        </div>
      </div>
    )
  }
  return null
}

Blog.propTypes = {
  loggedUser: PropTypes.object,
  blog: PropTypes.object,
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
}

export default Blog
