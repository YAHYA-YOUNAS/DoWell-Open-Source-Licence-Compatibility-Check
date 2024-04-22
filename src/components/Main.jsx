import React, { useState } from 'react'
import Result from './Result'
import Form from './common/Form'
import Image from './common/Image'
import Button from './common/Button'
import { checkCompatibility, updateUserUsage } from '../apiCalls';

function Main({handleTryAgainClick}) {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');

  const passProps = async (email, firstLicenseEventId, secondLicenseEventId, occurrences) => {
    setEmail(email);
    const jsonData = await checkCompatibility(firstLicenseEventId, secondLicenseEventId);
    setData(jsonData);
    updateUserUsage(email, occurrences+1);
  }
  
  return (
    <>
      <div className="pt-5">
        <h1 className="text-color font-bold text-lg text-center md:text-2xl md:text-left my-5">Open Source License Compatibility Tracker</h1>
        <div className="flex flex-col md:flex-row items-center">
          <p className="font-poppins text-justify pt-2 px-2">Wondering if the licenses of two software components are a good match for your project? Our tool analyzes and compares licenses, providing a percentage rating for compatibility. Whether you’re a developer, a legal expert, or simply curious about licensing, we’ve got you covered.</p>
          <Image classes="w-36 sm:w-56 md:w-40" source="/legalzard-logo.png" alternateText="Legalzard Logo"/>
        </div>
      </div>

      <Form passProps={passProps}/>

      {data && 
        <>
          <Result data={data} email={email}/>
          <div className="w-fit mx-auto mt-5 md:mt-10">
            <Button type="button" classes="btn-green" name="Try Again" onButtonClick={handleTryAgainClick}/>
          </div>    
        </>
      }
    </>
   
  )
}

export default Main