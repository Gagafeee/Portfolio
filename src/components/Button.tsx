"use client";
import styles from "./css/Button.module.css"
import {defaultFont, DefaultProps} from "@/global/global";
import {ButtonHTMLAttributes, ReactElement} from "react";

export interface ButtonProps extends DefaultProps, Omit<Partial<ButtonHTMLAttributes<HTMLButtonElement>>, "className" | "style" | "children"> {
    children: ReactElement | ReactElement[] | string,
    display?: "default" | "text"
}

export default function Button(props: ButtonProps) {
    const type = props.display ?? "default";
    return (
        <button
            {...props as unknown as ButtonHTMLAttributes<HTMLButtonElement>}
            className={[styles.Button, type === "text" ? styles.TextType : styles.DefaultType, defaultFont.className, props.className].join(" ")}
            style={props.style}
        >
            {typeof props.children === "string" ? <p>{props.children}</p> : props.children}
        </button>
    )
}