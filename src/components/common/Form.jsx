import React, { useState, useEffect, useRef } from 'react'
import Input from './Input'
import Button from './Button'
import Message from './Message'
import Selection from './Selection'
import { getLicenses, validateEmail, getUserEmailInfo } from '../../apiCalls';

function Form({passProps}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstSelection, setFirstSelection] = useState('');
  const [secondSelection, setSecondSelection] = useState('');
  const [email, setEmail] = useState('');
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

  const handleExperienceClick = async (event) => {
    event.preventDefault();
    setValidationError('');
    if (!email || !firstSelection || !secondSelection) {
      setValidationError('Fill in the form completely!');
    } else {
      setLoading(true);
      const response = await validateEmail(email);
      if (response.success) {
        const emailInfodata = await getUserEmailInfo(email);
        passProps({email, firstSelection, secondSelection, occurrences : emailInfodata.occurrences});
      } else {
        setValidationError(response.message);
      }
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-4 py-8">
        {validationError && <Message classes="text-red-500 font-bold w-50 mx-auto px-4" message={validationError}/> }
        <Selection title="Select First License" selectedValue={firstSelection} data={data} onSelectChange={(value) => setFirstSelection(value)}/>
        <Selection title="Select Second License" selectedValue={secondSelection} data={data} onSelectChange={(value) => setSecondSelection(value)}/>
        <Input type="email" inputValue={email} name="email" id="email" placeholder="Enter your email address" onInputChange={(value) => setEmail(value)} />

        <div className="flex flex-wrap justify-center md:flex-row md:gap-3 mx-auto">
            <Button type="button" classes="btn-red" name="Close" onButtonClick={handleCloseClick}/>
            <Button type="button" classes="btn-yellow" name="Reset" onButtonClick={handleResetClick}/>
            <Button type="button" classes="btn-green" name="Experience" loading={loading} showIcon="experience" onButtonClick={handleExperienceClick}/>
        </div>
    </form>
  )
}

export default Form