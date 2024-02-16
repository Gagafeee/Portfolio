import {CSSProperties} from "react";
import {Rubik} from "next/font/google";

export const defaultFont = Rubik({subsets: ["latin"]});
export const Languages = ["French", "English"] as const;
export type Language = typeof Languages[number];

export interface DefaultProps {
    className?: string,
    style?: CSSProperties
}