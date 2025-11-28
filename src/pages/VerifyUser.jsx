import React from 'react'
import { useState } from 'react';

const VerifyUser = () => {

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);


    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);
    };


    const handleVerify = () => {
        const code = otp.join("");
        if (code.length < 6) {
            alert("Please enter 6 digit OTP");
            return;
        }
        alert("OTP Verified: " + code);
    };


    const handleResend = () => {
        setOtp(["", "", "", "", "", ""]);
        alert("OTP Resent");
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-md rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                        Verify your account
                    </h2>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        Enter the 6 digit OTP
                    </p>


                    <div className="flex items-center justify-center gap-3 mb-6">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, idx)}
                                className="w-12 h-12 text-center text-xl rounded-md border border-gray-300 outline-none hover:border-blue-800"
                            />
                        ))}
                    </div>


                    <button
                        onClick={handleVerify}
                        className="w-full py-2.5 rounded-md text-white font-medium mb-3 bg-blue-800 hover:bg-blue-900 transition"
                    >
                        Verify OTP
                    </button>


                    <button
                        onClick={handleResend}
                        className="w-full py-2 rounded-md text-sm text-blue-800 border border-blue-800 hover:bg-blue-50 transition"
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </>
    )
}

export default VerifyUser