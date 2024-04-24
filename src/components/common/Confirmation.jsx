import React from 'react'
import Button from './Button'

function Confirmation({message, handleYesClick, loading}) {
  return (
    <div className="w-fit text-xs sm:text-sm md:text-base mx-auto my-5 flex gap-2 items-center font-poppins">
        <p>{message}</p>
        <Button type="button" classes="btn-lightgreen" name="Yes" loading={loading} onButtonClick={handleYesClick}/>
    </div>
  )
}

export default Confirmation