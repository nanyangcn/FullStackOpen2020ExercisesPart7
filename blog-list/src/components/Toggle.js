import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='contained' onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
      <br />
    </div>
  )
})

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Toggle.displayName = 'Toggle'

export default Toggle
