import React from 'react'
import { useSelector } from 'react-redux'

import CreateBlogForm from './CreateBlogForm'
import Toggle from './Toggle'
import Blog from './Blog'

const BlogForm = ({
  handleLogout,
  handleCreateBlog,
  handleLikeClick,
  handleRemoveClick,
  createBlogRef,
}) => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = blogs.map((blog) => blog)
  sortedBlogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button id='logoutButton' onClick={handleLogout}>
        log out
      </button>
      <Toggle buttonLabel={'new blog'} ref={createBlogRef}>
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Toggle>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          handleLikeClick={handleLikeClick}
          handleRemoveClick={handleRemoveClick}
        />
      ))}
    </div>
  )
}

export default BlogForm
