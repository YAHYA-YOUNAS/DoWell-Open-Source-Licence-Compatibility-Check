import React, { useState } from 'react'
import Image from './common/Image'
import Form from './common/Form'
import Button from './common/Button'
import Result from './Result'

function Main({handleTryAgainClick}) {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');

  const licencesApiUrl = process.env.REACT_APP_LICENSES_API_URL;
  const licenseApiKey = process.env.REACT_APP_LICENSES_API_KEY;
  const userId = process.env.REACT_APP_USER_ID
  const organizationId = process.env.REACT_APP_ORGANIZATION_ID
  const updateUserUsageUrl = process.env.REACT_APP_UPDATE_USER_USAGE_URL

  // Function to check compatibility from the API
  const checkCompatibility = async (firstLicenseEventId, secondLicenseEventId) => {
    try {
      const response = await fetch(licencesApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + licenseApiKey
        },
        body: JSON.stringify({
          action_type: "check-compatibility",
          license_event_id_one: firstLicenseEventId,
          license_event_id_two: secondLicenseEventId,
          user_id: userId,                                            
          organization_id: organizationId
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

  // Function to update user usage from the API
  const updateUserUsage = async (email, occurrences) => {
    try {
      const response = await fetch(updateUserUsageUrl + email + '&occurrences=' +  occurrences, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const passProps = (email, firstLicenseEventId, secondLicenseEventId, occurrences) => {
    setEmail(email);
    checkCompatibility(firstLicenseEventId, secondLicenseEventId);
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