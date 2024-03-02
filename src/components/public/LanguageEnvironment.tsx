"use client";
import {DefaultProps, Language} from "@/global/global";
import {createContext, ReactNode, useEffect, useState} from "react";

function error() {
    throw new Error("setCurrentLanguage is not registered")
}

export const LanguageContext = createContext<[Language, (language: Language) => void]>(["English", error]);

export interface LanguageEnvironmentProps extends DefaultProps {
    children: ReactNode
}

export default function LanguageEnvironment(props: LanguageEnvironmentProps) {
    const [currentLanguage, _setCurrentLanguage] = useState<Language>("English");
    useEffect(() => {
        _setCurrentLanguage(localStorage.getItem('language') as Language ?? currentLanguage)
    }, []);

    function setCurrentLanguage(language: Language) {
        //Store selected language in localstorage
        localStorage.setItem("language", language);
        _setCurrentLanguage(language)
    }

    return (
        <div className={props.className} style={props.style}>
            <LanguageContext.Provider value={[currentLanguage, setCurrentLanguage]}>
                {props.children}
            </LanguageContext.Provider>
        </div>
    )
}