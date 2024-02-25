"use client";
import styles from "../css/Section.module.css"
import {DefaultProps} from "@/global/global";
import {ReactElement, ReactNode} from "react";
import TranslatableText, {isTranslatableContent, TranslatableContent} from "@/components/public/TranslatableText";

export interface SectionProps extends DefaultProps {
    children?: ReactNode | ReactNode[];
    title: TranslatableContent | ReactElement;
    subtitle?: TranslatableContent | ReactElement;
    anchor?: string;
}

export default function Section(props: SectionProps) {
    return (
        <div id={props.anchor} className={[styles.Section, props.className].join(" ")} style={props.style}>
            <div className={styles.TitleContainer}>
                {isTranslatableContent(props.title) ?
                    <h1><TranslatableText>{props.title}</TranslatableText></h1> :
                    <>{props.title}</>}
                {isTranslatableContent(props.subtitle) ?
                    <h3><TranslatableText>{props.subtitle}</TranslatableText></h3> :
                    <>{props.subtitle}</>}
            </div>
            {props.children}
        </div>
    )
}