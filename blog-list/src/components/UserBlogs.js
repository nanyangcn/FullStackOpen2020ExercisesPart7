import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserBlogs = ({ userSelected }) => {
  const users = useSelector((state) => state.users)

  if (userSelected === undefined) {
    return null
  }
  const user = users.find((user) => user.username === userSelected.username)
  return (
    <div>
      <h2>{userSelected.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserBlogs
