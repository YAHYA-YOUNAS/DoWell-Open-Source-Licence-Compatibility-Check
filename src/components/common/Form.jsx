import React, { useState, useEffect, useRef } from 'react'
import Modal from './Modal'
import Input from './Input'
import Button from './Button'
import Message from './Message'
import Selection from './Selection'
import Confirmation from './Confirmation'
import { getLicenses, validateEmail, getUserEmailInfo, registerUser } from '../../apiCalls';

function Form({loading, setLoading, passProps}) {
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

  // Fetch all licenses
  const fetchLicenses = async () => {
    const data = await getLicenses();
    setData(data);
  }

  useEffect(() => {
    if (hasFetchedData.current === false) {         // to avoid API call twice
      fetchLicenses();
      hasFetchedData.current = true;
    } 
  }, []);

  // Handle registration when user visits first time
  useEffect(() => {
    const handleRegistration = async () => {
      if (occurrences === 0) {
        await registerUser(email);
        setInvokeCheckBtn(true);
      }
    };
  
    if (occurrences !== null) {
      handleRegistration();
    }
  }, [occurrences]);  

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
    setShowMessage(false);
    setOccurrences(null);
  }

  const handleExperienceClick = async (event) => {
    event.preventDefault();
    setValidationError('');
    if (!email || !firstSelection || !secondSelection) {
      alert('Fill in the form completely!');
    } else {
      setLoading(true);
      const jsonData = await validateEmail(email);
      if (jsonData.success) {
        const data = await getUserEmailInfo(email);
        setOccurrences(data.occurrences);
        setShowMessage(true);
      } else {
        setValidationError(jsonData.message);
      }
      setLoading(false);
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
        
        {showMessage && <Message classes="text-black" message={`You have used open source license ${occurrences} times`}/> }
        {validationError && <Message classes="text-red-500" message={validationError}/> }

        <div className="flex flex-wrap justify-center md:flex-row md:gap-3 mx-auto">
            <Button type="button" classes="btn-red" name="Close" onButtonClick={handleCloseClick}/>
            <Button type="button" classes="btn-yellow" name="Reset" onButtonClick={handleResetClick}/>

            {(occurrences === null || occurrences === 0) && (invokeCheckBtn === false) &&
              <Button type="submit" classes="btn-green" name="Experience" loading={loading} showIcon="experience" onButtonClick={handleExperienceClick}/>
            }

            {(occurrences >= 1 && occurrences <= 6 || invokeCheckBtn) &&
              <Button type="submit" classes="btn-green" name="Check" showIcon="check" loading={loading} onButtonClick={handleCheckClick}/>
            }

            {occurrences >=4 && 
              <Button type="submit" classes="btn-green" name="Contribute" onButtonClick={handleContributeClick} />
            }

        </div>
      
        {occurrences >=4 && <Confirmation message="Do you have a coupon?" handleYesClick={handleYesClick}/> }

        {showModal ? <Modal email={email} loading={loading} setLoading={setLoading} setInvokeCheckBtn={setInvokeCheckBtn} setShowModal={setShowModal} /> : null}
        
    </form>
  )
}

export default Form