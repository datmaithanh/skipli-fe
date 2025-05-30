import React from "react";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-start justify-start h-full p-6 ml-14 mt-14">
            <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                Generate post ideas and captions in seconds
            </h1>

            <div className="space-y-4 w-full max-w-md">
                <div
                    className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition duration-200"
                    onClick={() => navigate("/generate-caption")}
                >
                    <h2 className="text-lg font-semibold text-gray-800">
                        Start from scratch
                    </h2>
                    <p className="text-sm text-gray-600">
                        Generate new captions to engage, delight, or sell
                    </p>
                </div>

                <div
                    className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition duration-200"
                    onClick={() => navigate("/generate-ideas")}
                >
                    <h2 className="text-lg font-semibold text-gray-800">
                        Get inspired
                    </h2>
                    <p className="text-sm text-gray-600">
                        Generate post ideas and captions for a topic
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
