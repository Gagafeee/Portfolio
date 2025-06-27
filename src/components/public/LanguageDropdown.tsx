import {useContext} from "react";
import {LanguageContext} from "@/components/main/LanguageEnvironment";
import Dropdown from "@/components/public/Dropdown";
import styles from "@/components/css/HeroSection.module.css";
import {Language, Languages} from "@/global/global";

export function LanguageDropdown() {
    const [currentLanguage, setLanguage] = useContext(LanguageContext);
    return (
        <Dropdown name={"Language select"} className={styles.LanguageDropdown} value={currentLanguage}
                  onChange={(e) => setLanguage(e.target.value as Language)}>
            {Object.entries(Languages).map(([key, language]) => ({
                key: key,
                label: language.label
            }))}
        </Dropdown>
    )
}