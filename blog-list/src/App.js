import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import Blog from './components/Blog'
import Menu from './components/Menu'

import {
  initialBlogs,
  createBlogAction,
  likeBlogAction,
  removeBlogAction,
} from './reducers/blogsReducer'
import {
  initializeLoggedUser,
  loginAction,
  logoutAction,
} from './reducers/loggedUserReducer'
import { initializeUsersAction } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const loggedUser = useSelector((state) => state.loggedUser)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsersAction())
  }, [dispatch])

  const createBlogRef = useRef()

  const handleCreateBlog = (blog) => {
    createBlogRef.current.toggleVisibility()
    // TODO: update user.blogs
    dispatch(createBlogAction(blog, loggedUser))
  }

  const handleLikeClick = (blog) => {
    dispatch(likeBlogAction(blog))
  }

  const handleRemoveClick = (blog) => {
    // TODO: update users.blogs
    dispatch(removeBlogAction(blog))
  }

  const handleLogin = (userLoggedIn) => {
    dispatch(loginAction(userLoggedIn))
  }

  const handleLogout = () => {
    history.push('/')
    dispatch(logoutAction())
  }

  let match = useRouteMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null
  match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  return (
    <div>
      {loggedUser !== null && <Menu handleLogout={handleLogout} />}
      <h1>blog app</h1>
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <UserBlogs userSelected={user} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog
            loggedUser={loggedUser}
            blog={blog}
            handleLikeClick={handleLikeClick}
            handleRemoveClick={handleRemoveClick}
          />
        </Route>
        <Route path='/'>
          {loggedUser === null && <LoginForm handleLogin={handleLogin} />}
          {loggedUser !== null && (
            <BlogForm
              handleLogout={handleLogout}
              handleCreateBlog={handleCreateBlog}
              handleLikeClick={handleLikeClick}
              handleRemoveClick={handleRemoveClick}
              createBlogRef={createBlogRef}
            />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App
