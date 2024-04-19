import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Button({type, classes, name, showIcon, onButtonClick}) {
  return (
    <button type={type} className={"btn " + classes} onClick={(event) => onButtonClick(event)}>
        {showIcon === "experience" &&
            <FontAwesomeIcon icon={faPaperPlane} style={{color: "#ffffff",}} /> }
        {showIcon === "check" &&
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff",}} /> }
        <span> {name} </span>
    </button>
  )
}

export default Button