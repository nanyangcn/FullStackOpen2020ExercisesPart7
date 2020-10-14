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
  createCommentAction,
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
  }, [dispatch, loggedUser])

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsersAction())
  }, [dispatch, blogs])

  const createBlogRef = useRef()

  const handleCreateBlog = (blog) => {
    createBlogRef.current.toggleVisibility()
    dispatch(createBlogAction(blog, loggedUser))
  }

  const handleLikeClick = (blog) => {
    dispatch(likeBlogAction(blog))
  }

  const handleRemoveClick = (blog) => {
    dispatch(removeBlogAction(blog))
    history.push('/')
  }

  const handleLogin = (userLoggedIn) => {
    dispatch(loginAction(userLoggedIn))
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    history.push('/')
  }

  const handleCreateComment = (blog, comment) => {
    dispatch(createCommentAction(blog, comment, loggedUser))
  }

  let match = useRouteMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null
  match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (!loggedUser) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Menu handleLogout={handleLogout} />
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
            handleCreateComment={handleCreateComment}
          />
        </Route>
        <Route path='/'>
          <BlogForm
            handleCreateBlog={handleCreateBlog}
            handleLikeClick={handleLikeClick}
            handleRemoveClick={handleRemoveClick}
            createBlogRef={createBlogRef}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App
