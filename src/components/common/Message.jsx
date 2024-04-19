import React from 'react'

function Message({textColor, message}) {
  return (
    <div className={"font-poppins p-2 rounded text-center bg-neutral-100 " + textColor}>
        <p>{message}</p>
    </div>
  )
}

export default Message