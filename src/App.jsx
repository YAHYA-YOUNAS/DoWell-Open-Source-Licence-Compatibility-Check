import React, { useState } from 'react';
import Main from './components/Main'
import Header from './components/Header'

function App() {
  const [tryAgain, setTryAgain] = useState(0);

  const handleTryAgainClick = (event) => {
    event.preventDefault();
    setTryAgain(key => key + 1);
  }
  return (
    <div id="main" className="text-sm w-full md:w-8/12 lg:w-6/12 sm:text-md md:text-base mx-auto px-6 py-5 my-10 rounded-md border border-gray-400 md:border-none">
      <Header classes="w-36 sm:w-56 md:w-48 mx-auto"/>
      <Main key={tryAgain} handleTryAgainClick={handleTryAgainClick}/>
    </div>
  )
}

export default App
