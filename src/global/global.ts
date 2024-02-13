import {CSSProperties} from "react";
import {Rubik} from "next/font/google";
export const defaultFont = Rubik({subsets: ["latin"]});

export interface DefaultProps {
    className?: string,
    style?: CSSProperties
}