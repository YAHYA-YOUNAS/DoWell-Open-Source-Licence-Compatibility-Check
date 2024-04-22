import React, { useEffect, useState } from 'react';
import Button from './common/Button';
import Message from './common/Message';

function Scale () {
  const [feedback, setFeedback] = useState(false);

  const recommendationScaleUrl = process.env.REACT_APP_RECOMMENDATION_SCALE_URL;
  const appName = process.env.REACT_APP_NAME;

  // Display Feedback for 5 seconds
  useEffect(() => {
    if (feedback) {
      const timeoutId = setTimeout(() => setFeedback(false), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [feedback]);

  // Scale API Call
  const scaleAPI = async (index) => {
    try {
      const response = await fetch(recommendationScaleUrl + index, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      setFeedback(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = async (event, index) => {
    event.preventDefault();
    scaleAPI(index);
  };

  return (
    <div className="mt-10">
      <div className="text-sm md:text-base font-poppins p-3 rounded text-center bg-neutral-100">
        <h1>On a scale of 0-10, how likely are you to recommend <span className="font-bold text-green-800">{appName}</span>  to a friend or a colleague?</h1>
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: 11 }, (_, i) => (
            <Button key={i} index={i} type="button" classes="btn-lightgreen" name={i} onButtonClick={handleClick}/>
          ))}
        </div>
        
      </div>
      {feedback && <Message classes="text-green-800 font-bold" message="Thank you for your feedback!"/> }
    </div>
  );
};

export default Scale;
