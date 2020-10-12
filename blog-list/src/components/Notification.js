import React from 'react'

const Notification = ({ notification, className }) => {
  if (notification) {
    return (
      <div>
        <p className={className}>{notification}</p>
      </div>
    )
  }
  return null
}

export default Notification
