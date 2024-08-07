"use client";
import styles from "../css/Button.module.css"
import {defaultFont, DefaultProps, interactiveFont} from "@/global/global";
import {ButtonHTMLAttributes, LinkHTMLAttributes, ReactElement} from "react";

export interface ButtonProps extends DefaultProps, Omit<Partial<ButtonHTMLAttributes<HTMLButtonElement>>, "className" | "style" | "children"> {
    children: ReactElement | ReactElement[] | string,
    display?: "default" | "text" | "secondary",
    href?: string
}

export default function Button(props: ButtonProps) {
    const type = props.display ?? "default";
    return (
        !props.href ?
            <button
                {...props}
                className={[styles.Button, styles[type], interactiveFont.className, props.className].join(" ")}
                style={props.style}
            >
                {typeof props.children === "string" ? <p>{props.children}</p> : props.children}
            </button>
            :
            <a
                {...props as unknown as LinkHTMLAttributes<any>}
                className={[styles.Button, styles[type], interactiveFont.className, props.className].join(" ")}
                style={props.style}
            >
                {typeof props.children === "string" ? <p>{props.children}</p> : props.children}
            </a>
    )
}