import React from 'react'
import Image from './Image'

function Email({firstLicenseName, secondLicenseName, compaitibilityLevel, recommendationText}) {
    const uxlivinglabUrl = process.env.REACT_APP_UXLIVINGLAB_URL;
    return (
        <div className="bg-white">
            <div className="w-full bg-white">
                <div className="text-white flex text-center justify-center p-1">
                    <Image classes="w-36 sm:w-56 md:w-40 mx-auto" source="/dowell-logo.png" alternateText="User Experience Lab Logo"/>
                </div>
                <div className="text-center font-bold text-2xl">
                    <h2>Open Source License Compatibility</h2>
                </div>

                <div className="p-5">
                    <div className="m-5 flex flex-col gap-3 font-poppins">
                        <p>From Samanta,</p>
                        <p className="font-bold">Result from Open Source License Compatibility:</p>
                        <p className="text-base">First License : {firstLicenseName}</p>
                        <p className="text-base">Second license : {secondLicenseName}</p>
                        <p className="text-base">Compatibility level between both : {compaitibilityLevel}%</p>
                        <p className="text-base">Our recommendation : {recommendationText}</p>
                    </div>
                </div>

                <div className="email-footer-bg text-white text-center p-2">
                    <a href={uxlivinglabUrl} className="text-center underline text-white mb-5 pb-2"> DoWell UX Living Lab</a>
                    <p className="mt-2 text-sm">© {new Date().getFullYear()}-All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Email