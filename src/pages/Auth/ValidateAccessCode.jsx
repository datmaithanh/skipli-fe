import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { validateAccessCode } from "../../apis/ai-apis/aiapi";
import { useNavigate } from "react-router-dom";

const ValidateAccessCode = () => {
    const navigate = useNavigate();
    const phoneNumber = localStorage.getItem("phoneNumber") || "";
    const [code , setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleSubmitCode = async () => {
        try {
            setIsLoading(true);
            if(await validateAccessCode(phoneNumber, code)){
                setIsLoading(false);
                navigate("/service" );
            }
        } catch (err) {
            console.log(err);
            setError(true);
            setIsLoading(false);
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
                    SkipliAI has sent an OTP code to: {`${phoneNumber}`}
                </p>

                {/* Input số điện thoại */}
                <input
                    type="number"
                    placeholder="Enter your OTP code"
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border border-gray-300 rounded px-5 py-3 mb-5 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                {error && (
                    <p className="text-red-500 text-sm mb-4">
                        Invalid code. Please try again.
                    </p>
                )}

                {/* Nút gửi mã */}
                <button
                    onClick={handleSubmitCode}
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
                            Please wait...
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </div>
    );
};

export default ValidateAccessCode;
