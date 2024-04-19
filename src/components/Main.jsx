import React, { useState } from 'react'
import Image from './common/Image'
import Form from './common/Form'
import Button from './common/Button'
import Result from './Result'

function Main({handleTryAgainClick}) {
  const [data, setData] = useState(null);
  const licencesApiUrl = process.env.REACT_APP_LICENSES_API_URL;
  const licenseApiKey = process.env.REACT_APP_LICENSES_API_KEY;

  // Function to fetch licenses from the API
  const fetchCheckCompatibility = async () => {
    try {
      const response = await fetch(licencesApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + licenseApiKey
        },
        body: JSON.stringify({
          action_type: "check-compatibility",
          license_event_id_one: "FB1010000000166123835456631894",     // TODO update with real
          license_event_id_two: "FB1010000000167644773552170851",     // TODO update with real
          user_id: 609,                                               // TODO update with real
          organization_id: "63cf89a0dcc2a171957b290b"                 // TODO update with real
        })
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckClick = (event) => {
    event.preventDefault();
    fetchCheckCompatibility();
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

      <Form handleCheckClick={handleCheckClick}/>

      {data && 
        <>
          <Result data={data}/>
          <div className="w-fit mx-auto mt-5 md:mt-10">
            <Button type="button" classes="btn-green" name="Try Again" onButtonClick={handleTryAgainClick}/>
          </div>    
        </>
      }
    </>
   
  )
}

export default Main