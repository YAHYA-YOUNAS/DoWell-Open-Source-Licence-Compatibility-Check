import React from 'react'

function Input({type, inputValue, name, id, placeholder, onInputChange}) {
  return (  
    <input className="w-full input-color border border-slate-500 rounded-md p-2 pl-3 focus:outline-none focus:shadow-inner" 
        type={type}
        value={inputValue}
        name={name} 
        id={id}
        placeholder={placeholder} 
        onChange={(event) => onInputChange(event.target.value)}
        required={true}/>
  )
}

export default Input