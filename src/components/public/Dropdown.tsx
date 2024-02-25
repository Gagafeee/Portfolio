import styles from "../css/Dropdown.module.css"
import {defaultFont, DefaultProps, interactiveFont} from "@/global/global";
import {ReactNode, SelectHTMLAttributes} from "react";

export interface DropdownProps extends DefaultProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
    children: { key: string | number, val: string | ReactNode }[]
}

export default function Dropdown(props: DropdownProps) {
    return (
            <select {...props as SelectHTMLAttributes<HTMLSelectElement>}
                    className={[styles.Dropdown, interactiveFont.className , props.className].join(" ")} style={props.style}>
                {props.children.map((option) => <option className={interactiveFont.className}
                                                        key={option.key}>{option.val}</option>)}
            </select>
    )
}