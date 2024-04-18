import React from 'react'

function Input({type, name, id, placeholder}) {
  return (  
    <input className="input-color border border-slate-500 rounded-md p-2 pl-3 focus:outline-none focus:shadow-inner" 
        type={type}
        name={name} 
        id={id}
        placeholder={placeholder} />
  )
}

export default Input