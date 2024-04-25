import React, { useEffect, useState } from 'react'
import Scale from './Scale';
import Message from './common/Message';
import Confirmation from './common/Confirmation';
import { sendEmail } from '../apiCalls';

function Result({data, email}) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Display Email confirmation for 5 seconds
  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => setMessage(false), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  const handleYesClick = async(event) => {
    event.preventDefault();
    setLoading(true);
    // Send mail
    const emailBody = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Open Source License Compatibility</title>
      </head>
      <body
        style="
          font-family: Arial, sans-serif;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
        "
      >
        <div style="width: 100%; background-color: #ffffff;">
          <header
            style="
              color: #fff;
              display: flex;
              text-align: center;
              justify-content: center;
              padding: 5px;
            "
          >
            <img
              src="https://dowellfileuploader.uxlivinglab.online/hr/logo-2-min-min.png"
              height="140px"
              width="140px"
              style="display: block; margin: 0 auto;"
            />
          </header>
          <article style="margin-top: 20px; text-align: center;">
            <h2>Open Source License Compatibility</h2>
          </article>
    
          <main style="padding: 20px;">
            <section style="margin: 20px;">
              <p>From Samanta,</p>
              <p style="font-weight: bold; font-size: 14px;">
                Result from Open Source License Compatibility
              </p>
              <p className="text-base">First License : ${data.license_1.license_name}</p>
              <p className="text-base">Second license : ${data.license_2.license_name}</p>
              <p className="text-base">Compatibility level between both : ${data.percentage_of_compatibility}%</p>
              <p className="text-base">Our recommendation : Consult your legal team for license amendments, If not fully compatible, follow conditions and add required liabilities & copyright notices for compliance.</p>
            </section>
          </main>
    
          <footer
            style="
              background-color: #005733;
              color: #fff;
              text-align: center;
              padding: 10px;
            "
          >
            <a
              href="https://www.uxlivinglab.org/"
              style="
                text-align: center;
                color: white;
                margin-bottom: 20px;
                padding-bottom: 10px;
              "
              >DoWell UX Living Lab</a
            >
            <p style="margin-top: 10px; font-size: 13px;">
              © ${new Date().getFullYear()}-All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>`;
    const response = await sendEmail(email, emailBody);
    if (response.success) {
      setMessage(true);
    } else {
      console.log(response.message)
    }
    setLoading(false);
  }

  return (
    <div id="results" className="w-11/12 mx-auto text-sm font-poppins p-5 mt-5 rounded">
      <h1 className="text-center md:text-lg mb-5">Compatibility level between <span style={{color: '#D6BB41'}}>{data.license_1.license_name}</span> and <span style={{color: '#D6BB41'}}>{data.license_2.license_name}</span></h1>
      <h2 className="text-center text-2xl">{data.percentage_of_compatibility}%</h2>
      <h2 className="text-center text-lg font-bold my-3">
        {data.percentage_of_compatibility >= 80 && 'Highly recommended'}
        {data.percentage_of_compatibility >= 50 &&  data.percentage_of_compatibility < 80 &&  'Recommended' }
        {data.percentage_of_compatibility < 50 && 'Not recommended'}
      </h2>
      <p className="text-justify mb-5"><span className="font-bold">Our recommendation:</span> Consult your legal team for license amendments, If not fully compatible, follow conditions and add required liabilities & copyright notices for compliance.</p>
      <hr/>
      <h2 className="text-center md:text-lg my-5">Compatibility Check By Dowell UX Livinglab</h2>

      <Confirmation message="Do you want to mail this?" loading={loading} handleYesClick={handleYesClick}/>

      {message && <Message classes="text-black w-50 mx-auto my-2" message={`Results are mailed to ${email}`}/> }

      <Scale/>
    </div>
  )
}

export default Result