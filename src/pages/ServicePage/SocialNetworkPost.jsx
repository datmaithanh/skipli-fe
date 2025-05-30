import React, { useState } from "react";
import { useSelectedOption } from "../../context/statecontext/SelectedOptionContext";
import {
    createGeneratePostCaptions,
    saveGeneratedContent,
} from "../../apis/ai-apis/aiapi";

const SocialNetwork = () => {
    const { selectedOptionSocial } = useSelectedOption();
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("Friendly");
    const [postCaption, setPostCaption] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [savingIndex, setSavingIndex] = useState(null);

    const handleGenerate = async () => {
        try {
            setPostCaption("");
            setIsLoading(true);
            const response = await createGeneratePostCaptions(
                selectedOptionSocial,
                topic,
                tone
            );
            setPostCaption(response);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = async (caption) => {
        try {
            await navigator.clipboard.writeText(caption);
            alert(
                "Caption đã được copy! Hãy dán (Ctrl+V) khi tạo bài viết Facebook."
            );
            window.open("https://www.facebook.com/", "_blank");
        } catch (err) {
            alert("Không thể copy caption. Vui lòng copy thủ công.");
        }
    };
    const handleSave = async (caption, index) => {
        try {
            setSavingIndex(index);
            const phoneNumber = localStorage.getItem("phoneNumber");
            await saveGeneratedContent(topic, caption, phoneNumber);
            setSavingIndex(null);
        } catch (err) {
            setSavingIndex(null);
            console.log(err);
        } finally {
            setSavingIndex(null);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{`${selectedOptionSocial} post`}</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        What topic do you want a caption for?
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Skipli is launching SkipliAI"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        What should your caption sound like?
                    </label>
                    <select
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                    >
                        <option>Friendly</option>
                        <option>Luxury</option>
                        <option>Relaxed</option>
                        <option>Professional</option>
                        <option>Bold</option>
                        <option>Adventurous</option>
                        <option>Witty</option>
                        <option>Persuasive</option>
                        <option>Empathetic</option>
                    </select>
                </div>

                <button
                    onClick={handleGenerate}
                    className="px-5 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition"
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
                        "Generate caption"
                    )}
                </button>
            </div>
            {postCaption && (
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {postCaption.captions?.map((caption, index) => (
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
                                    key={index}
                                    className="px-3 py-1 text-sm bg-[#EEEBE8] text-black rounded hover:bg-gray-300 transition"
                                >
                                    {savingIndex === index
                                        ? "Saving..."
                                        : "Save"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default SocialNetwork;
