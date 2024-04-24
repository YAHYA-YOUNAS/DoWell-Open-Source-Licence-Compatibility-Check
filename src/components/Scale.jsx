import React, { useEffect, useState } from 'react';
import Button from './common/Button';
import Message from './common/Message';
import { scaleAPI } from '../apiCalls';

function Scale () {
  const [feedback, setFeedback] = useState(false);

  const appName = process.env.REACT_APP_NAME;

  // Display Feedback for 5 seconds
  useEffect(() => {
    if (feedback) {
      const timeoutId = setTimeout(() => setFeedback(false), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [feedback]);

  const handleClick = async (event, index) => {
    event.preventDefault();
    const response = await scaleAPI(index);
    if (response) {
      setFeedback(true);
    }
  };

  return (
    <div id="scale" className="mt-10">
      <div className="text-sm font-poppins py-4 rounded text-center bg-neutral-100">
        <h1>On a scale of 0-10, how likely are you to recommend <span className="font-bold text-green-800">{appName}</span>  to a friend or a colleague?</h1>
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: 11 }, (_, i) => (
            <Button key={i} index={i} type="button" classes="btn-lightgreen" name={i} onButtonClick={handleClick}/>
          ))}
        </div>
        
      </div>
      {feedback && <Message classes="text-slate-600 font-bold" message="Thank you for your feedback!"/> }
    </div>
  );
};

export default Scale;
