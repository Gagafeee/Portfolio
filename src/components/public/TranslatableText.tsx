"use client";
import {DefaultProps, Language} from "@/global/global";
import {ReactNode, useContext} from "react";
import {LanguageContext} from "@/components/public/LanguageEnvironment";

type Content = string
export type TranslatableContent = { [key in Language]: Content }

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