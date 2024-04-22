import React, { useState, useEffect, useRef } from 'react'
import Selection from './Selection'
import Input from './Input'
import Button from './Button'
import Message from './Message'
import Confirmation from './Confirmation'
import Modal from './Modal'

function Form({passProps}) {
  const [data, setData] = useState([]);
  const [firstSelection, setFirstSelection] = useState('');
  const [secondSelection, setSecondSelection] = useState('');
  const [email, setEmail] = useState('');
  const [occurrences, setOccurrences] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [invokeCheckBtn, setInvokeCheckBtn] = useState(false);
  const [validationError, setValidationError] = useState('');
  const hasFetchedData = useRef(false);

  const licencesApiUrl = process.env.REACT_APP_LICENSES_API_URL;
  const licenseApiKey = process.env.REACT_APP_LICENSES_API_KEY;
  const userEmailInfoUrl = process.env.REACT_APP_USER_EMAIL_INFO_URL;
  const validateEmailUrl = process.env.REACT_APP_VALIDATE_EMAIL_URL;
  const registerUserUrl = process.env.REACT_APP_REGISTER_USER_URL;
  const productNumber = process.env.REACT_APP_PRODUCT_NUMBER;
  

  // Get all licenses from the API
  const getLicenses = async () => {
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
      const sortedData = jsonData.data.sort((a, b) => a.softwarelicense.license_name.localeCompare(b.softwarelicense.license_name));
      setData(sortedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (hasFetchedData.current === false) {         // to avoid API call twice
      getLicenses();
      hasFetchedData.current = true;
    } 
  }, []);

  // Validate user email from the API
  const validateEmail = async () => {
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
        return jsonData.success;
      } else {
        setValidationError(jsonData.message)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get user email info from the API
  const getUserEmailInfo = async () => {
    try {
      const response = await fetch(userEmailInfoUrl + email, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      setOccurrences(jsonData.occurrences);
      setShowMessage(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Register an user from the API
  const registerUser = async () => {
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
        console.log("User Registered");
      } else {
        console.log(jsonData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFirstSelection = (eventId) => {
    setFirstSelection(eventId);
  };

  const handleSecondSelection = (eventId) => {
    setSecondSelection(eventId);
  };

  const handleInput = (value) => {
    setEmail(value);
  }

  const handleCloseClick = (event) => {
    event.preventDefault();
    window.open("about:blank", "_self");
    window.close();
  }

  const handleResetClick = (event) => {
    event.preventDefault();
    setFirstSelection('');
    setSecondSelection('');
    setEmail('');
  }

  // Handle registration when user visits first time
  useEffect(() => {
    const handleRegistration = async () => {
      if (occurrences === 0) {
        await registerUser();
        setInvokeCheckBtn(true);
      }
    };
  
    if (occurrences !== null) {
      handleRegistration();
    }
  }, [occurrences]);

  const handleExperienceClick = async (event) => {
    event.preventDefault();
    setValidationError('');
    if (!email || !firstSelection || !secondSelection) {
      alert('Fill in the form completely!');
    } else {
      const isValid = await validateEmail();
      if (isValid) {
        await getUserEmailInfo();
      }
    }
  }

  const handleCheckClick = (event) => {
    event.preventDefault();
    passProps(email, firstSelection, secondSelection, occurrences);
  }

  const handleContributeClick = (event) => {
    event.preventDefault();
    const paymentApiUrl = process.env.REACT_APP_PAYMENT_API_URL
    window.open(paymentApiUrl,  '_blank');
  }
  
  const handleYesClick = (event) => {
    event.preventDefault();
    setShowModal(true)
  }

  return (
    <form className="flex flex-col gap-4 py-8">
        <Selection title="Select First License" selectedValue={firstSelection} data={data} onSelectChange={handleFirstSelection}/>
        <Selection title="Select Second License" selectedValue={secondSelection} data={data} onSelectChange={handleSecondSelection}/>
        <Input type="email" inputValue={email} name="email" id="email" placeholder="Enter your email address" onInputChange={handleInput} />
        
        {showMessage && <Message textColor="text-black" message={`You have used open source license ${occurrences} times`}/> }
        {validationError && <Message textColor="text-red-500" message={validationError}/> }

        <div className="flex flex-wrap justify-center md:flex-row md:gap-3 mx-auto">
            <Button type="button" classes="btn-red" name="Close" onButtonClick={handleCloseClick}/>
            <Button type="button" classes="btn-yellow" name="Reset" onButtonClick={handleResetClick}/>

            {(occurrences === null || occurrences === 0) && (invokeCheckBtn === false) &&
              <Button type="submit" classes="btn-green" name="Experience" showIcon="experience" onButtonClick={handleExperienceClick}/>
            }

            {(occurrences >= 1 && occurrences <= 6 || invokeCheckBtn) &&
              <Button type="submit" classes="btn-green" name="Check" showIcon="check" onButtonClick={handleCheckClick}/>
            }

            {occurrences >=4 && 
              <Button type="submit" classes="btn-green" name="Contribute" onButtonClick={handleContributeClick} />
            }

        </div>
      
        {occurrences >=4 && <Confirmation message="Do you have a coupon?" handleYesClick={handleYesClick}/> }

        {showModal ? <Modal email={email} setInvokeCheckBtn={setInvokeCheckBtn} setShowModal={setShowModal} /> : null}
        
    </form>
  )
}

export default Form