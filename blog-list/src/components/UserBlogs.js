import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const UserBlogs = ({ userSelected }) => {
  const users = useSelector((state) => state.users)
  if (!userSelected) {
    return null
  }

  const user = users.find((user) => user.username === userSelected.username)

  return (
    <div>
      <h2>{userSelected.name}</h2>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>added blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map((blog) => {
              return (
                <TableRow key={blog.id}>
                  <TableCell component='th' scope='row'>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserBlogs
