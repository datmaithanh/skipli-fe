import React from "react";
import { useSelectedOption } from "../../context/statecontext/SelectedOptionContext";
import { useNavigate } from "react-router-dom";

const IdeaList = () => {
    const {idea} = useSelectedOption();
    const {setSelectedIdea} = useSelectedOption();
    const navigate = useNavigate();
    const onSelectIdea = (selectedIdea) => {
        setSelectedIdea(selectedIdea);
        navigate("/list-ideas/generate-caption");
    };
    return (
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Get Inspired</h1>
            <p className="text-gray-800 font-medium mb-4">
                Choose an idea to build some posts
            </p>
            <div className="space-y-3">
                {idea.ideas?.map((idea, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectIdea(idea)}
                        className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-200 transition"
                    >
                        {idea}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IdeaList;
