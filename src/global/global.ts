import {CSSProperties} from "react";
import {Archivo, Rubik} from "next/font/google";
import {StaticImageData} from "next/image";
import {TranslatableContent} from "@/components/public/TranslatableText";

//* Props *//
export interface DefaultProps {
    className?: string,
    style?: CSSProperties
}

//* Font *//
export const defaultFont = Rubik({subsets: ["latin"]});
export const interactiveFont = Archivo({subsets: ["latin"]});

//* Languages *//
export const Languages = ["French", "English"] as const;
export type Language = typeof Languages[number];

//* Contents Types *//
export type TechnologieType = "Language" | "Framework" | "Lib"

export interface Technologie {
    key: string,
    displayName?: string,
    icon: StaticImageData,
    type: TechnologieType,
    info: {
        description: TranslatableContent,
        timeCount: number | TranslatableContent,
        projectCount: number
    }

}

export interface Project {
    key: string,
    displayName?: string,
    icon: StaticImageData,
    description: TranslatableContent,
    technologies: Technologie[],
    dates: string,
    timeCount: number,
    link?: { display?: string, url: string },
    illustration: StaticImageData,
    /**
     * It's recommended to put a color HSB with B greater than 50%.
     */
    color: string
}


//* Utils *//
export const clampNumber = (num: number, a: number, b: number) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
