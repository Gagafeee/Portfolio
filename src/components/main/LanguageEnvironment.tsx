"use client";
import {Language, Languages} from "@/global/global";
import {createContext, ReactNode, useEffect, useState} from "react";
import {throwsContextUnregisteredFunctionError} from "@/global/utils";

export const LanguageContext = createContext<[Language, (language: Language) => void]>(["english", throwsContextUnregisteredFunctionError]);

export interface LanguageEnvironmentProps {
    children: ReactNode,
}

export default function LanguageEnvironment({children}: LanguageEnvironmentProps) {
    const [currentLanguage, _setCurrentLanguage] = useState<Language>("english");

    useEffect(() => {
        const storage = localStorage.getItem('language');
        if (storage !== null) setCurrentLanguage(storage as Language)
    }, []);

    function setCurrentLanguage(language: Language) {
        //Store selected language in localstorage
        localStorage.setItem("language", language);
        document.querySelector("html")?.setAttribute("lang", Languages[language].shortName)
        _setCurrentLanguage(language)
    }

    return (
        <LanguageContext.Provider value={[currentLanguage, setCurrentLanguage]}>
            {children}
        </LanguageContext.Provider>
    )
}