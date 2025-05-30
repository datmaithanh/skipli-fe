import React, { createContext, useState, useContext, useEffect } from "react";

const SelectedOptionContext = createContext();

export const SelectedOptionProvider = ({ children }) => {
    const [selectedOptionSocial, setSelectedOptionSocial] = useState(() => {
        return localStorage.getItem("selectedOptionSocial") || "";
    });
    const [idea, setIdea] = useState("");

    const [selectedIdea, setSelectedIdea] = useState("");

    useEffect(() => {
        localStorage.setItem("selectedOptionSocial", selectedOptionSocial);
    }, [selectedOptionSocial]);

    return (
        <SelectedOptionContext.Provider
            value={{
                selectedOptionSocial,
                setSelectedOptionSocial,
                idea,
                setIdea,
                selectedIdea,
                setSelectedIdea,
            }}
        >
            {children}
        </SelectedOptionContext.Provider>
    );
};

export const useSelectedOption = () => useContext(SelectedOptionContext);
