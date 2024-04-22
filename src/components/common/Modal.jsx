import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Message from "./Message";

function Modal({email, setInvokeCheckBtn, setShowModal}) {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const redeemCouponUrl = process.env.REACT_APP_REDEEM_COUPON_URL;
    const productNumber = process.env.REACT_APP_PRODUCT_NUMBER;

    // Redeem coupon from the API
    const redeemCoupon = async () => {
        try {
            const response = await fetch(redeemCouponUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    coupon : code,
                    product_number : productNumber
                }),
            });
            if (!response.ok && response.status !== 401) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            const jsonData = await response.json();
            if (jsonData.success) {
                setMessage(jsonData.message);
                setInvokeCheckBtn(true)
            } else {
                setError(jsonData.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleInput = (value) => {
        setCode(value);
    }

    const handleRedeemClick = (event) => {
        event.preventDefault();
        if (!code) {
            setError('Please enter your coupon code')
        } else {
            setError('');
            redeemCoupon();
        }
    }

    const handleCloseClick = (event) => {
        event.preventDefault();
        setShowModal(false);
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-poppins">
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <h3 className="text-xl md:text-3xl font-semibold text-center pt-5">Redeem Coupon</h3>
                    <h3 className="text-center pt-5 font-light mb-2">Enter Coupon Code:</h3>

                    {message && <Message classes="text-green-500" message={`Congratulations! ${message}`}/> }

                    {error && <h3 className="text-center text-sm pt-5 font-bold text-red-500">{error}</h3> }
                    
                    <div className="p-5 flex-auto">
                        <Input type="text" inputValue={code} name="text" id="text" placeholder="Enter your code" onInputChange={handleInput} />
                    </div>
                    <div className="flex gap-5 items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <Button type="button" classes="btn-lightgreen" name="Redeem" onButtonClick={handleRedeemClick}/>
                        <Button type="button" classes="btn-lightred" name="Close" onButtonClick={handleCloseClick}/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default Modal