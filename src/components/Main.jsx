import React, { useState } from 'react'
import Form from './common/Form'
import Image from './common/Image'
import Modal from './common/Modal'

function Main({handleTryAgainClick}) {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const passProps = (userData) => {
    setUserData(userData);
    setShowModal(true);
  }
  
  return (
    <>
      <div className="pt-5">
        <h1 className="text-color font-bold text-lg text-center md:text-xl md:text-left my-5">Open Source License Compatibility Tracker</h1>
        <div className="flex flex-col md:flex-row items-center">
          <p className="font-poppins text-justify pt-2 px-2">Wondering if the licenses of two software components are a good match for your project? Our tool analyzes and compares licenses, providing a percentage rating for compatibility. Whether you’re a developer, a legal expert, or simply curious about licensing, we’ve got you covered.</p>
          <Image classes="w-36 sm:w-56 md:w-36" source="/legalzard-logo.png" alternateText="Legalzard Logo"/>
        </div>
      </div>

      <Form passProps={passProps}/>

      { showModal && <Modal userData={userData} setShowModal={setShowModal} handleTryAgainClick={handleTryAgainClick}/>}
    </>
  )
}

export default Main