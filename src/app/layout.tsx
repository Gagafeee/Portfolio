import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {initializeApp} from "firebase/app";

const inter = Inter({subsets: ["latin"]});

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
    title: "Gagafeee",
    description: "Official Gagafeee web developer portfolio",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
