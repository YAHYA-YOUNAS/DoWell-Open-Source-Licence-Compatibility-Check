import React from 'react'
import Image from './common/Image'

function Header() {
  return (
    <div className="mx-auto">
        <Image classes="w-36 sm:w-56 md:w-48 mx-auto" source="/dowell-logo.png" alternateText="User Experience Lab Logo"/>
        <hr />
    </div>
  )
}

export default Header