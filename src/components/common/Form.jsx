import React, { useState, useEffect } from 'react'
import Selection from './Selection'
import Input from './Input'
import Button from './Button'
import Message from './Message'

function Form({passProps}) {
  const [data, setData] = useState([]);
  const [firstSelection, setFirstSelection] = useState('');
  const [secondSelection, setSecondSelection] = useState('');
  const [email, setEmail] = useState('');
  const [occurrences, setOccurrences] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [validationError, setValidationError] = useState('');

  const licencesApiUrl = process.env.REACT_APP_LICENSES_API_URL;
  const licenseApiKey = process.env.REACT_APP_LICENSES_API_KEY;
  const userEmailInfoUrl = process.env.REACT_APP_USER_EMAIL_INFO_URL;
  const validateEmailUrl = process.env.REACT_APP_VALIDATE_EMAIL_URL;
  const registerUserUrl = process.env.REACT_APP_REGISTER_USER_URL;
  const productNumber = process.env.REACT_APP_PRODUCT_NUMBER;
  

  // Function to fetch licenses from the API
  const fetchLicenses = async () => {
    try {
      const response = await fetch(licencesApiUrl, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + licenseApiKey
        }
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData.data.sort((a, b) => a.softwarelicense.license_name.localeCompare(b.softwarelicense.license_name)));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to fetch user email info from the API
  const fetchUserEmailInfo = async () => {
    try {
      const response = await fetch(userEmailInfoUrl + email, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      setOccurrences(jsonData.occurrences);
      setClicked(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to validate user email from the API
  const fetchValidateEmail = async () => {
    try {
      const response = await fetch(validateEmailUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name : "",
          fromName : "",
          fromEmail : "",
          subject : "",
          body : ""
        }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      if (jsonData.success) {
        fetchUserEmailInfo();
      } else {
        setValidationError(jsonData.message)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to register an user from the API
  const fetchRegisterUser = async () => {
    try {
      const response = await fetch(registerUserUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_number : productNumber,
          email
        }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      if (response.status === 201) {
        console.log("Registered");
      } else {
        console.log(jsonData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);


  const handleFirstSelection = (value) => {
    setFirstSelection(value);
  };

  const handleSecondSelection = (value) => {
    setSecondSelection(value);
  };

  const handleInput = (value) => {
    setEmail(value);
  }

  const handleCloseClick = (event) => {
    event.preventDefault();
    // fetchUserEmailInfo();
    console.log('clicked');
    window.open("about:blank", "_self");
    window.close();
  }

  const handleResetClick = (event) => {
    event.preventDefault();
    setFirstSelection('');
    setSecondSelection('');
    setEmail('');
  }

  const handleExperienceClick = (event) => {
    event.preventDefault();
    setValidationError('');
    if (!email || !firstSelection || !secondSelection) {
      alert('Fill in the form completely!');
    } else {
      fetchValidateEmail();
      if (occurrences === 0) {
        fetchRegisterUser();
      } else {
        console.log("Unable to register user");
      }
    }
  }

  const handleCheckClick = (event) => {
    event.preventDefault();
    passProps(email);
  }

  const handleContributeClick = (event) => {
    event.preventDefault();
    // TODO
  }

  return (
    <form className="flex flex-col gap-4 py-8">
        <Selection title="Select First License" selectedValue={firstSelection} data={data} onSelectChange={handleFirstSelection}/>
        <Selection title="Select Second License" selectedValue={secondSelection} data={data} onSelectChange={handleSecondSelection}/>
        <Input type="email" inputValue={email} name="email" id="email" placeholder="Enter your email address" onInputChange={handleInput} />
        
        {clicked && <Message textColor="text-black" message={`You have used open source license ${occurrences} times`}/> }
        {validationError && <Message textColor="text-red-500" message={validationError}/> }

        <div className="flex flex-wrap justify-center md:flex-row md:gap-3 mx-auto">
            <Button type="button" classes="btn-red" name="Close" onButtonClick={handleCloseClick}/>
            <Button type="button" classes="btn-yellow" name="Reset" onButtonClick={handleResetClick}/>

            {(occurrences === null || occurrences === 0) &&
              <Button type="submit" classes="btn-green" name="Experience" showIcon="experience" onButtonClick={handleExperienceClick}/>
            }

            {(occurrences >= 1 && occurrences <= 4) &&
              <Button type="submit" classes="btn-green" name="Check" showIcon="check" onButtonClick={handleCheckClick}/>
            }

            {occurrences >= 5 &&
              <Button type="submit" classes="btn-green" name="Contribute" onButtonClick={handleContributeClick} />
            }
        </div>
    </form>
  )
}

export default Form