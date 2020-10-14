import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CreateBlogForm from './CreateBlogForm'
import Toggle from './Toggle'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'

const BlogForm = ({ handleCreateBlog, createBlogRef }) => {
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = blogs.map((blog) => blog)
  sortedBlogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Toggle buttonLabel={'new blog'} ref={createBlogRef}>
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Toggle>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell component='th' scope='row'>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell component='th' scope='row'>
                  {blog.author}
                </TableCell>
                <TableCell>{blog.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogForm
