"use client";
import {DefaultProps, Language} from "@/global/global";
import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";

export const LanguageContext = createContext<[Language, Dispatch<SetStateAction<Language>>]>(["English", () => {
}]);

export interface LanguageEnvironmentProps extends DefaultProps {
    children: ReactNode
}

export default function LanguageEnvironment(props: LanguageEnvironmentProps) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(localStorage.getItem("language") as Language ?? "English")
    useEffect(() => {
        //Store selected language in localstorage
        localStorage.setItem("language", currentLanguage);
    }, [currentLanguage]);
    return (
        <div className={props.className} style={props.style}>
            <LanguageContext.Provider value={[currentLanguage, setCurrentLanguage]}>
                {props.children}
            </LanguageContext.Provider>
        </div>
    )
}