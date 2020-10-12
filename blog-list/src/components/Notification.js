import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message) {
    return (
      <div>
        <p className={notification.type}>{notification.message}</p>
      </div>
    )
  }
  return null
}

export default Notification
