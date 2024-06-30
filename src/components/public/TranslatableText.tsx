"use client";
import {Language, Languages} from "@/global/global";
import React, {useContext} from "react";
import {LanguageContext} from "@/components/public/LanguageEnvironment";

type Content = string;
export type TranslatableContent = { [key in Language]: Content }

export function isTranslatableContent(obj: any): obj is TranslatableContent {
    return typeof obj === "object" ? Object.keys(obj).every((key): boolean => Languages.includes(key as Language)) : false;
}

export interface TranslatableTextProps {
    children: TranslatableContent
}

export default function TranslatableText(props: TranslatableTextProps) {
    const [currentLanguage] = useContext(LanguageContext);
    return (
        <>
            {props.children[currentLanguage]}
        </>
    )
}