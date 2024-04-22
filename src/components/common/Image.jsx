import React from 'react'

function Image({classes, source, alternateText}) {
  return (
    <img className={classes} src={source} alt={alternateText}/>
  )
}


export default Image