import styles from "./page.module.css";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
    return (
        <main className={styles.main}>
            <HeroSection/>
        </main>
    );
}
