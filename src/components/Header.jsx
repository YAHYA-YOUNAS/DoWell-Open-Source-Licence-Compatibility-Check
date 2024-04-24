import React from 'react'
import Image from './common/Image'

function Header({classes}) {
  return (
    <div className="mx-auto w-full">
        <Image classes={classes} source="/dowell-logo.png" alternateText="User Experience Lab Logo"/>
        <hr />
    </div>
  )
}

export default Header