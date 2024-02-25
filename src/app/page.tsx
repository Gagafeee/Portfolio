import styles from "./page.module.css";
import HeroSection from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectSection";
import Image from "next/image";
import {Technologies} from "@/global/content";

export default function Home() {
    return (
        <main className={styles.main}>
            <HeroSection/>
            <ProjectSection/>
            <div id={"expertise"}></div>
            <div id={"contact"}></div>
        </main>
    );
}
