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
    alignment?: "left" | "center" | "right";
    level?: 1 | 2;
}

export default function Section(props: SectionProps) {
    const level = props.level ?? 1;
    return (
        <section id={props.anchor} className={[styles.Section, props.className].join(" ")} style={props.style}>
            <div className={styles.TitleContainer} style={{textAlign: props.alignment}}>
                {isTranslatableContent(props.title) ?
                    level === 1 ? <h1><TranslatableText>{props.title}</TranslatableText></h1> :
                        <h2><TranslatableText>{props.title}</TranslatableText></h2> :
                    <>{props.title}</>}
                {isTranslatableContent(props.subtitle) ?
                    <p className={styles.Description}><TranslatableText>{props.subtitle}</TranslatableText></p> :
                    <>{props.subtitle}</>}
            </div>
            {props.children}
        </section>
    )
}