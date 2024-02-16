"use client";
import {DefaultProps, Language, Languages} from "@/global/global";
import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

export const LanguageContext = createContext<[Language, Dispatch<SetStateAction<Language>>]>(["English", () => {}]);

export interface LanguageEnvironmentProps extends DefaultProps {
    children: ReactNode
}

export default function LanguageEnvironment(props: LanguageEnvironmentProps) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>("English")
    return (
        <div className={props.className} style={props.style}>
            <LanguageContext.Provider value={[currentLanguage, setCurrentLanguage]}>
                {props.children}
            </LanguageContext.Provider>
        </div>
    )
}