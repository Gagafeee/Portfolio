import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";
import MainMenu from "@/components/main/MainMenu";
import LanguageEnvironment from "@/components/main/LanguageEnvironment";
import MovableContainer from "@/components/main/MovableContainer";
import {Fonts} from "@/global/global";

export const metadata: Metadata = {
    title: "Gagafeee portfolio",
    description: "Gagafeee's official developer portfolio"
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
        <body className={Fonts.default.className}>
        <LanguageEnvironment>
            <MovableContainer anchorList={["home", "projects", "expertise", "contact"]}>
                <MainMenu buttons={[
                    {anchor: "home", content: {english: "Presentation", french: "Présentation"}},
                    {anchor: "projects", content: {english: "Projects", french: "Projets"}},
                    {anchor: "expertise", content: {english: "Expertise", french: "Expertise"}},
                    {anchor: "contact", content: {english: "Contact", french: "Contact"}}
                ]}/>
                {children}
            </MovableContainer>
        </LanguageEnvironment>
        </body>
        </html>
    );
}