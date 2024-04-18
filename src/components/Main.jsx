import React from 'react'
import Image from './common/Image'
import Form from './common/Form'

function Main() {
  return (
    <>
    <div className="pt-5">
      <h1 className="text-color font-bold text-lg text-center md:text-2xl md:text-left my-5">Open Source License Compatibility Tracker</h1>
      <div className="flex flex-col md:flex-row items-center">
        <p className="font-poppins text-justify pt-2 px-2">Wondering if the licenses of two software components are a good match for your project? Our tool analyzes and compares licenses, providing a percentage rating for compatibility. Whether you’re a developer, a legal expert, or simply curious about licensing, we’ve got you covered.</p>
        <Image classes="w-36 sm:w-56 md:w-40" source="/legalzard-logo.png" alternateText="Legalzard Logo"/>
      </div>
    </div>
    
    <div className="pb-28">
       <Form />
    </div>
    </>
   
  )
}

export default Main