import React, { useEffect, useState, useRef } from "react";
import Button from "./Button";
import Header from "../Header";
import Result from "../Result";
import Message from "./Message";
import CouponModal from "./CouponModal";
import Confirmation from "./Confirmation";
import { checkCompatibility, updateUserUsage, registerUser } from '../../apiCalls';

function ResultModal({userData, loading, setLoading, setShowModal, handleTryAgainClick}) {
    const [data, setData] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [couponModal, setCouponModal] = useState(false);
    const hasFetchedData = useRef(false);

    const appName = process.env.REACT_APP_NAME;

    // Registration when user visits for the first time
    useEffect(() => {
        const handleRegistration = async () => {
            if (userData.occurrences === 0) {
                await registerUser(userData.email);
            }
        };

        if (hasFetchedData.current === false) {         // to avoid API call twice
        handleRegistration();
        hasFetchedData.current = true;
        } 
    }, [userData.occurrences]);

    const handleCheckClick = async (event) => {
        event.preventDefault();
        setLoading(true);
        const jsonData = await checkCompatibility(userData.firstSelection, userData.secondSelection);
        setData(jsonData);
        await updateUserUsage(userData.email, userData.occurrences+1);
        setLoading(false);
        setToggle(true);
    }

    const handleContributeClick = (event) => {
        event.preventDefault();
        const paymentApiUrl = process.env.REACT_APP_PAYMENT_API_URL
        window.open(paymentApiUrl,  '_blank');
    }

    return (
        <>
            <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none font-poppins">
                <div className="relative w-11/12 my-6 mx-auto max-w-2xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-screen overflow-y-auto">
                        <Header classes="w-36 mx-auto"/>
                        <h2 className="text-lg font-semibold text-center pt-5">{appName}</h2>
                        <Message classes="text-black w-50 mx-auto my-5" message={`You have used open source license ${userData.occurrences} times`}/>
                        
                        {toggle ?
                            <>
                                <Result data={data} email={userData.email} loading={loading} setLoading={setLoading}/>
                                <div className="w-fit mx-auto mt-5 md:mt-10">
                                    <Button type="button" classes="btn-tryagain" name="Try Again" onButtonClick={handleTryAgainClick}/>
                                </div>
                            </>
                            :
                            <div className="flex gap-5 items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <Button type="button" classes="btn-lightred" name="Cancel" onButtonClick={() => setShowModal(false)}/>
                            
                                {(userData.occurrences >= 0 && userData.occurrences <= 6) &&
                                    <Button type="button" classes="btn-lightgreen" name="Check" showIcon="check" loading={loading} onButtonClick={handleCheckClick}/>
                                }

                                {userData.occurrences >=4 && 
                                    <Button type="submit" classes="btn-lightgreen" name="Contribute" onButtonClick={handleContributeClick} />
                                }
                            </div>
                        }

                        {userData.occurrences >=4 && 
                            <div className="border-t border-solid border-blueGray-200"><Confirmation message="Do you have a coupon?" handleYesClick={() => setCouponModal(true)}/></div>
                        }

                        {couponModal ? <CouponModal email={userData.email} loading={loading} setLoading={setLoading} setCouponModal={setCouponModal} /> : null}
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ResultModal