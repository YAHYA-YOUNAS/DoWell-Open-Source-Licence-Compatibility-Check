import React from 'react'
import Button from './Button'

function Confirmation({message, handleYesClick}) {
  return (
    <div className="w-fit text-xs sm:text-sm md:text-base mx-auto flex gap-2 items-center ">
        <p>{message}</p>
        <Button type="button" classes="btn-lightgreen" name="Yes" onButtonClick={handleYesClick}/>
    </div>
  )
}

export default Confirmation