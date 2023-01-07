import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const buttonStyle = {
    marginLeft: 2,
    marginTop: 25,
    marginBottom: 35,
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="outline-secondary"
          style={buttonStyle}
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="light" style={buttonStyle} onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'
export default Togglable
