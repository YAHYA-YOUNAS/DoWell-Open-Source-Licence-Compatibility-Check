import React, { useEffect, useState, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import Header from "../Header";
import Result from "../Result";
import Message from "./Message";
import Confirmation from "./Confirmation";
import { checkCompatibility, updateUserUsage, registerUser, redeemCoupon } from '../../apiCalls';

function Modal({userData, setShowModal, handleTryAgainClick}) {
    const [email, ] = useState(userData.email);
    const [firstSelection, ] = useState(userData.firstSelection);
    const [secondSelection, ] = useState(userData.secondSelection);
    const [occurrences, ] = useState(userData.occurrences);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showCoupon, setShowCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const hasFetchedData = useRef(false);

    const appName = process.env.REACT_APP_NAME;

    // Registration when user visits for the first time
    useEffect(() => {
        const handleRegistration = async () => {
            if (occurrences === 0) {
                await registerUser(email);
            }
        };

        if (hasFetchedData.current === false) {         // to avoid API call twice
        handleRegistration();
        hasFetchedData.current = true;
        } 
    }, [occurrences]);


    // Get compatibility results from API
    const getResults = async() => {
        setLoading(true);
        const response = await checkCompatibility(firstSelection, secondSelection);
        setResult(response);
        await updateUserUsage(email, occurrences+1);
        setLoading(false);
        setShowResult(true);
    }

    const handleCheckClick = (event) => {
        event.preventDefault();
        getResults();
    }

    const handleContributeClick = (event) => {
        event.preventDefault();
        const paymentApiUrl = process.env.REACT_APP_PAYMENT_API_URL
        window.open(paymentApiUrl,  '_blank');
    }

    const handleYesClick = (event) => {
        event.preventDefault();
        setShowCoupon(true);
    }

    const handleRedeemClick = async(event) => {
        event.preventDefault();
        if (!couponCode) {
            setCouponError('Please enter your coupon code');
        } else {
            setCouponError('');
            setLoading(true);
            const response = await redeemCoupon(email, couponCode);
            if (response.success) {
                await getResults();
                setShowCoupon(false);
            } else {
                setCouponError(response.message);
            }
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none font-poppins">
                <div className="relative w-11/12 my-6 mx-auto max-w-2xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-screen overflow-y-auto">
                        <Header classes="w-36 mx-auto"/>
                        <h2 className="text-lg font-semibold text-center pt-5">{appName}</h2>
                        <Message classes="text-black w-50 mx-auto my-5" message={`You have used open source license ${occurrences} times`}/>
                        
                        {showResult ?
                            <>
                                <Result data={result} email={email}/>
                                <div className="w-fit mx-auto mt-5 md:mt-10">
                                    <Button type="button" classes="btn-tryagain" name="Try Again" onButtonClick={handleTryAgainClick}/>
                                </div>
                            </>
                            :
                            <div className="flex gap-5 items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <Button type="button" classes="btn-lightred" name="Cancel" onButtonClick={() => setShowModal(false)}/>
                            
                                {(occurrences >= 0 && occurrences <= 6) &&
                                    <Button type="button" classes="btn-lightgreen" name="Check" showIcon="check" loading={loading} onButtonClick={handleCheckClick}/>
                                }

                                {occurrences >=4 && 
                                    <Button type="submit" classes="btn-lightgreen" name="Contribute" onButtonClick={handleContributeClick} />
                                }
                            </div>
                        }

                        {(occurrences >=4 && showCoupon === false && showResult === false) &&
                            <div className="border-t border-solid border-blueGray-200"><Confirmation message="Do you have a coupon?" handleYesClick={handleYesClick}/></div>
                        }

                        {showCoupon &&
                            <>
                                {couponError && <h3 className="text-center text-sm py-3 font-bold text-red-500">{couponError}</h3> }
                                <div className="flex flex-col px-4 pb-3 gap-2 justify-center items-center">
                                    <Input type="text" inputValue={couponCode} name="text" id="text" placeholder="Enter your code" onInputChange={(value) => setCouponCode(value)} />
                                    <Button type="button" classes="btn-lightgreen" name="Redeem" loading={loading} onButtonClick={handleRedeemClick}/>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default Modal