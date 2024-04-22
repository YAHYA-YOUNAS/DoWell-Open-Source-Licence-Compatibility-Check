import React from 'react'
import Confirmation from './common/Confirmation';

function Result({data, email}) {

  const sendEmailUrl = process.env.REACT_APP_SEND_EMAIL_URL;
  const name = process.env.REACT_APP_EMAIL_NAME
  const fromName = process.env.REACT_APP_EMAIL_FROM_NAME
  const fromEmail = process.env.REACT_APP_EMAIL_FROM_EMAIL
  const subject = process.env.REACT_APP_EMAIL_SUBJECT
  // const uxlivinglabUrl = process.env.REACT_APP_UXLIVINGLAB_URL;

  // Function to send email from the API
  const fetchSendEmail = async (emailBody) => {
    try {
      const response = await fetch(sendEmailUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          fromName,
          fromEmail,
          subject,
          body : emailBody
        }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const jsonData = await response.json();
      if (jsonData.success) {
        console.log('Sent');
      } else {
        setValidationError(jsonData.message)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleYesClick = (event) => {
    event.preventDefault();
    // const emailBody = `<!DOCTYPE html>
    // <html lang="en">
    //   <head>
    //     <meta charset="UTF-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //     <script src="https://cdn.tailwindcss.com"></script>
    //     <title>Open Source License Compatibility</title>
    //   </head>
    //   <body>
    //     <div className="bg-white">
    //       <div className="w-full bg-white">
    //         <div className="text-white flex text-center justify-center p-1">
    //           <Image classes="w-36 sm:w-56 md:w-40 mx-auto" source="https://dowellfileuploader.uxlivinglab.online/hr/logo-2-min-min.png" alternateText="User Experience Lab Logo"/>
    //         </div>
    //         <div className="text-center font-bold text-2xl">
    //           <h2>Open Source License Compatibility</h2>
    //         </div>

    //         <div className="p-5">
    //           <div className="m-5 flex flex-col gap-3 font-poppins">
    //             <p>From Samanta,</p>
    //             <p className="font-bold">Result from Open Source License Compatibility:</p>
    //             <p className="text-base">First License : ${data.license_1.license_name}</p>
    //             <p className="text-base">Second license : ${data.license_2.license_name}</p>
    //             <p className="text-base">Compatibility level between both : ${data.percentage_of_compatibility}%</p>
    //             <p className="text-base">Our recommendation : Consult your legal team for license amendments, If not fully compatible, follow conditions and add required liabilities & copyright notices for compliance.</p>
    //           </div>
    //         </div>

    //         <div className="email-footer-bg text-white text-center p-2">
    //           <a href=${uxlivinglabUrl} className="text-center underline text-white mb-5 pb-2"> DoWell UX Living Lab</a>
    //           <p className="mt-2 text-sm">© ${new Date().getFullYear()}-All rights reserved.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </body>
    {/* </html>` */}
    
    // Send Mail
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
    fetchSendEmail(emailBody);
  }

  return (
    <div id="results" className="w-full font-poppins p-5 mt-10 rounded">
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
    </div>
  )
}

export default Result