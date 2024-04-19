import React from 'react'
import Button from './common/Button'

function Result({data}) {
    const handleYesClick = () => {
        // TODO Send Mail
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
      <div className="w-fit text-xs sm:text-sm md:text-base mx-auto flex gap-2 items-center ">
        <p>Do you want to mail this?</p>
        <Button type="button" classes="btn-lightgreen" name="Yes" onButtonClick={handleYesClick}/>
      </div>
    </div>
  )
}

export default Result