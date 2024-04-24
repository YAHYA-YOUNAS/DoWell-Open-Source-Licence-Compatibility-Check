import React from 'react'
import Scale from './Scale';
import Confirmation from './common/Confirmation';
import { sendEmail } from '../apiCalls';

function Result({data, email}) {
  const handleYesClick = async(event) => {
    event.preventDefault();
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
    const jsonData = await sendEmail(email, emailBody);
    if (jsonData.success) {
      console.log('Email Sent');
    } else {
      console.log(jsonData.message)
    }
  }

  return (
    <div id="results" className="w-full font-poppins p-5 mt-5 rounded">
      <h1 className="text-lg text-center md:text-xl mb-5">Compatibility level between <span style={{color: '#D6BB41'}}>{data.license_1.license_name}</span> and <span style={{color: '#D6BB41'}}>{data.license_2.license_name}</span></h1>
      <h2 className="text-center text-3xl">{data.percentage_of_compatibility}%</h2>
      <h2 className="text-center text-xl font-bold my-3">
        {data.percentage_of_compatibility >= 80 && 'Highly recommended'}
        {data.percentage_of_compatibility >= 50 &&  data.percentage_of_compatibility < 80 &&  'Recommended' }
        {data.percentage_of_compatibility < 50 && 'Not recommended'}
      </h2>
      <p className="text-justify mb-5"><span className="font-bold">Our recommendation:</span> Consult your legal team for license amendments, If not fully compatible, follow conditions and add required liabilities & copyright notices for compliance.</p>
      <hr/>
      <h2 className="text-center md:text-xl my-5">Compatibility Check By Dowell UX Livinglab</h2>

      <Confirmation message="Do you want to mail this?" handleYesClick={handleYesClick}/>

      <Scale/>
    </div>
  )
}

export default Result