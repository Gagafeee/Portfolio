"use client";
import {Language, Languages} from "@/global/global";
import {useContext} from "react";
import {LanguageContext} from "@/components/main/LanguageEnvironment";

type Content = string;
export type TranslatableContent = { [key in Language]: Content }

export function isTranslatableContent(obj: any): obj is TranslatableContent {
    return typeof obj === "object" ? Object.keys(obj).every((key): boolean => Object.keys(Languages).includes(key as Language)) : false;
}

export interface TranslatableTextProps {
    children: TranslatableContent
}

export default function TranslatableText({children}: TranslatableTextProps) {
    const [currentLanguage] = useContext(LanguageContext);
    if (!(currentLanguage in children)) throw new Error("Cannot render the text content: content for language " + currentLanguage + " is not included.");
    return children[currentLanguage]
}