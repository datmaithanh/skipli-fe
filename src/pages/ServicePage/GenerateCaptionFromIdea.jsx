import React, { useState } from "react";
import { useSelectedOption } from "../../context/statecontext/SelectedOptionContext";
import { createCaptionsFromIdeas, saveGeneratedContent } from "../../apis/ai-apis/aiapi";

const GenerateCaptionFromIdea = () => {
    const { selectedIdea, setSelectedIdea  } = useSelectedOption();
    const [captionData, setCaptionData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [savingIndex, setSavingIndex] = useState(null);

    const onCreateCaption = async () => {
        try {
            setError("");
            setIsLoading(true);
            if (!selectedIdea) {
                setError("Please select an idea to create a caption.");
                setIsLoading(false);
                return;
            }

            const response = await createCaptionsFromIdeas(selectedIdea);
            if (response?.captions?.length > 0) {
                setCaptionData(response.captions);
            } else {
                setError("No captions were generated.");
                setCaptionData([]);
            }
        } catch (error) {
            console.error("Error creating caption:", error);
            setError("Failed to generate caption. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = async (caption) => {
        try {
            await navigator.clipboard.writeText(caption);
            alert("Caption đã được copy! Hãy dán (Ctrl+V) khi tạo bài viết Facebook.");
            window.open("https://www.facebook.com/", "_blank");
        } catch (err) {
            alert("Không thể copy caption. Vui lòng copy thủ công.");
        }
    };

    const handleSave = async (caption, index) => {
        try {
            setSavingIndex(index);
            const phoneNumber = localStorage.getItem("phoneNumber");
            await saveGeneratedContent(selectedIdea, caption, phoneNumber);
        } catch (err) {
            console.error("Error saving caption:", err);
        } finally {
            setSavingIndex(null);
        }
    };

    return (
        <>
            <div className="max-w-xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Your Idea
                </h1>

                <input
                    type="text"
                    value={selectedIdea || ""}
                    onChange={(e) => setSelectedIdea(e.target.value)}
                    placeholder="Selected idea"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 bg-gray-50"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    onClick={onCreateCaption}
                    className="px-5 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition"
                    disabled={isLoading}
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
                            Generating...
                        </div>
                    ) : (
                        "Create Caption"
                    )}
                </button>
            </div>

            {captionData.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {captionData.map((caption, index) => (
                        <div
                            key={index}
                            className="w-[40%] p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Generated Caption
                            </h3>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {caption}
                            </p>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={() => handleShare(caption)}
                                    className="px-3 py-1 text-sm bg-[#B6EFF2] text-black rounded hover:bg-green-200 transition"
                                >
                                    Share
                                </button>
                                <button
                                    onClick={() => handleSave(caption, index)}
                                    className="px-3 py-1 text-sm bg-[#EEEBE8] text-black rounded hover:bg-gray-300 transition"
                                >
                                    {savingIndex === index ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default GenerateCaptionFromIdea;
