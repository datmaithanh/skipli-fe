import React, { useState } from "react";
import { getPostIdeas } from "../../apis/ai-apis/aiapi";
import { useSelectedOption } from "../../context/statecontext/SelectedOptionContext";
import { useNavigate } from "react-router-dom";


const GenerateIdeas = () => {
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const {setIdea} = useSelectedOption();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGenerateIdeas = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic.");
            return;
        }
        setError("");
        setLoading(true);
        setIdea([]);
        try {
            const response = await getPostIdeas(topic);
            console.log("Generated ideas:", response);
            setIdea(response);
            navigate("/list-ideas");
        } catch (err) {
            console.error("Failed to generate ideas", err);
            setError("Failed to generate ideas. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Inspired</h1>
            <p className="text-gray-600 mb-6">
                Stuck staring at a blank page? Tell us what topic you have in mind and Skipli AI
                will generate a list of post ideas and captions for you.
            </p>

            <label className="block text-gray-800 font-medium mb-2">
                What topic do you want ideas for?
            </label>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic"
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
                onClick={handleGenerateIdeas}
                disabled={loading}
                className="bg-indigo-100 text-indigo-700 px-6 py-2 rounded-md hover:bg-indigo-200 transition"
            >
                {loading ? "Generating..." : "Generate ideas"}
            </button>

            
        </div>
    );
};

export default GenerateIdeas;
