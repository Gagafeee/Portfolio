import type {Metadata} from "next";
import "./globals.css";
import {initializeApp} from "firebase/app";
import {ReactNode} from "react";
import {defaultFont} from "@/global/global";
import MainMenu from "@/components/main/MainMenu";
import LanguageEnvironment from "@/components/public/LanguageEnvironment";


const firebaseConfig = {
    apiKey: "AIzaSyAD5o14KnycfD-P6li-Dreq4pmCHuUXAg4",
    authDomain: "gagafeee-fr.firebaseapp.com",
    projectId: "gagafeee-fr",
    storageBucket: "gagafeee-fr.appspot.com",
    messagingSenderId: "1072258860575",
    appId: "1:1072258860575:web:a72491f051923068f3772a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const metadata: Metadata = {
    title: "Gagafeee portfolio",
    description: "Official Gagafeee web developer portfolio",
};

export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={defaultFont.className}>
        <LanguageEnvironment>
            <MainMenu list={[
                {English: "Presentation", French: "Présentation"},
                {English: "Projects", French: "Projets"},
                {English: "Expertise", French: "Expertise"},
                {English: "Contact", French: "Contact"}
            ]}/>
            {children}
        </LanguageEnvironment>
        </body>
        </html>
    );
}
