import React, { useEffect, useState } from "react";
import { getUserGeneratedContents, UnSaveContent } from "../../apis/ai-apis/aiapi";

const Profile = () => {
    const [savedContent, setSavedContent] = useState([]);
    const [unsavingId, setUnsavingId] = useState(null);
    const phoneNumber = localStorage.getItem("phoneNumber");

    const fetchSavedContent = async () => {
        try {
            const response = await getUserGeneratedContents(phoneNumber);
            setSavedContent(response);
        } catch (err) {
            console.error("Failed to fetch saved content", err);
        }
    };

    useEffect(() => {
        fetchSavedContent();
    }, [phoneNumber]);

    const handleUnsave = async (id) => {
        try {
            setUnsavingId(id);
            await UnSaveContent(id);
            setSavedContent(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error("Error unsaving caption", err);
        } finally {
            setUnsavingId(null);
        }
    };

    const handleShare = async (caption) => {
        try {
            await navigator.clipboard.writeText(caption);
            alert("Caption copied to clipboard!");
        } catch {
            alert("Failed to copy. Please copy manually.");
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Saved Content
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedContent.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {item.topic}
                        </h2>
                        <p className="text-gray-700 whitespace-pre-wrap mb-4">
                            {item.data}
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => handleShare(item.data)}
                                className="px-3 py-1 text-sm bg-[#B6EFF2] text-black rounded hover:bg-teal-200 transition"
                            >
                                Share
                            </button>
                            <button
                                onClick={() => handleUnsave(item.id)}
                                className="px-3 py-1 text-sm bg-gray-100 text-black rounded hover:bg-gray-300 transition"
                            >
                                {unsavingId === item.id ? "Unsaving..." : "Unsave"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
