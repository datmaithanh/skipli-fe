import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { createCreateNewAccessCode } from "../../apis/ai-apis/aiapi";
import { useNavigate } from "react-router-dom";

const PhoneLogin = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSendCode = async () => {
        try {
            setIsLoading(true);
            await createCreateNewAccessCode(phone);
            setIsLoading(false);
            localStorage.setItem("phoneNumber", phone);
            navigate("/submitcode" );
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen text-[110%]">
            <div className="w-[15%] bg-gray-100" />
            <div className="flex flex-col items-start justify-start flex-1 p-10 bg-white mt-[10%] ml-[10%]">
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center mb-6">
                    <CiUser size={52} className="text-gray-600" />
                </div>

                {/* Tiêu đề */}
                <h1 className="text-3xl font-semibold text-gray-800 mb-3">
                    Welcome to Skipli AI
                </h1>
                <p className="text-base text-gray-600 text-start mb-6 leading-relaxed">
                    Enter a mobile phone number that you have access to.
                    <br />
                    This number will be used to login to SkipliAI.
                </p>

                {/* Input số điện thoại */}
                <input
                    type="tel"
                    placeholder="0123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-300 rounded px-5 py-3 mb-5 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />

                {/* Nút gửi mã */}
                {/* <button
                    onClick={handleSendCode}
                    className="bg-[#87A1FF] hover:bg-blue-500 text-white font-medium py-3 px-6 rounded w-72 text-base"
                >
                    Send Verification Code
                </button> */}

                <button
                    onClick={handleSendCode}
                    className=" bg-[#87A1FF] px-5 py-2 text-white font-medium rounded-md hover:bg-blue-400 transition"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-indigo-700"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                            Sending...
                        </div>
                    ) : (
                        "Send Verification Code"
                    )}
                </button>
            </div>
        </div>
    );
};

export default PhoneLogin;
