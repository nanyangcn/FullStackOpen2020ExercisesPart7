import React from 'react'
import { useSelector } from 'react-redux'

import Alert from '@material-ui/lab/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message) {
    return (
      <div>
        <Alert severity={notification.type}>{notification.message}</Alert>
      </div>
    )
  }
  return null
}

export default Notification
