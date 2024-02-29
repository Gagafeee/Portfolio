import styles from "./page.module.css";
import HeroSection from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
    return (
        <main className={styles.main}>
            <HeroSection/>
            <ProjectSection/>
            <ExpertiseSection/>
            <ContactSection/>
        </main>
    );
}
