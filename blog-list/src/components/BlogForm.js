import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CreateBlogForm from './CreateBlogForm'
import Toggle from './Toggle'

const BlogForm = ({ handleLogout, handleCreateBlog, createBlogRef }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const loggedUser = useSelector((state) => state.loggedUser)
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = blogs.map((blog) => blog)
  sortedBlogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {loggedUser.name} logged in
      <button id='logoutButton' onClick={handleLogout}>
        log out
      </button>
      <Toggle buttonLabel={'new blog'} ref={createBlogRef}>
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Toggle>
      {sortedBlogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogForm
