import React from 'react'

const FlashMessages = (props) => {
  return (
    <div className="floating-alerts">
      {props.flashMessages.map((msg, index) => <div key={index} className="alert alert-success text-center floating-alert shadow-sm">{msg}</div>)}
    </div>
  )
}

export default FlashMessages