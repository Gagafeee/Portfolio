import styles from "./page.module.css";
import HeroBanner from "@/app/_sections/HeroBanner";
import ProjectSection from "@/app/_sections/ProjectSection";
import ExpertiseSection from "@/app/_sections/ExpertiseSection";
import ContactSection from "@/app/_sections/ContactSection";

export default function Home() {
    return (
        <main className={styles.main}>
            <HeroBanner/>
            <ProjectSection/>
            <ExpertiseSection/>
            <ContactSection/>
        </main>
    );
}
