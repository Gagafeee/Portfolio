import type {Metadata, Viewport} from "next";
import "./globals.css";
import {ReactNode} from "react";
import {defaultFont} from "@/global/global";
import MainMenu from "@/components/main/MainMenu";
const LanguageEnvironment = dynamic(()=> import("@/components/public/LanguageEnvironment"), {ssr: false});
import MovableContainer from "@/components/main/MovableContainer";
import dynamic from "next/dynamic";


/*const firebaseConfig = {
    apiKey: "AIzaSyAD5o14KnycfD-P6li-Dreq4pmCHuUXAg4",
    authDomain: "gagafeee-fr.firebaseapp.com",
    projectId: "gagafeee-fr",
    storageBucket: "gagafeee-fr.appspot.com",
    messagingSenderId: "1072258860575",
    appId: "1:1072258860575:web:a72491f051923068f3772a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);*/

export const viewport: Viewport = {
    colorScheme: "dark",
}
export const metadata: Metadata = {
    title: "Gagafeee portfolio",
    description: "Official Gagafeee's web developer portfolio"
};

export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={defaultFont.className}>
        <LanguageEnvironment>
            <MovableContainer anchorList={["home", "projects", "expertise", "contact"]}>
                <MainMenu buttons={[
                    {anchor: "home", content: {English: "Presentation", French: "Présentation"}},
                    {anchor: "projects", content: {English: "Projects", French: "Projets"}},
                    {anchor: "expertise", content: {English: "Expertise", French: "Expertise"}},
                    {anchor: "contact", content: {English: "Contact", French: "Contact"}}
                ]}/>
                {children}
            </MovableContainer>
        </LanguageEnvironment>
        </body>
        </html>
    );
}
