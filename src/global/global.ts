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
const defaultFont = Rubik({subsets: ["latin"]});
const interactiveFont = Archivo({subsets: ["latin"]});
export const Fonts = {
    default: defaultFont,
    interactive: interactiveFont
}

//* Languages *//
interface LanguageDescriptor {
    label: string,
    /* Used to set the 'lang' attribut of <html> root. */
    shortName: string
}
export type Language = "french" | "english";
export const Languages: { [key in Language]: LanguageDescriptor } = {
    french: {label: "Français", shortName: "fr"},
    english: {label: "English", shortName: "en"}
} as const;

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
    },
    link: string
}

export interface Project {
    key: string,
    displayName?: string,
    icon: StaticImageData,
    description: TranslatableContent,
    technologies: Technologie[],
    dates: string,
    timeCount: number,
    link?: { type?: "github", display?: string, url: string },
    illustration: StaticImageData,
    /** It's recommended to put a color HSB with B greater than 50%. */
    color: string
}