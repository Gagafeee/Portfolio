"use client";
import styles from "../css/HeroSection.module.css";
import GlassyClass from "../../global/Glassy.module.css";
import {DefaultProps, Language, Languages} from "@/global/global";
import Button from "@/components/public/Button";
import Image from "next/image";
import logoImage from "../../../public/main_logo.png";
import Dropdown from "@/components/public/Dropdown";
import {useContext} from "react";
import {LanguageContext} from "@/components/public/LanguageEnvironment";
import TranslatableText from "@/components/public/TranslatableText";

export interface HeroSectionProps extends DefaultProps {

}

export default function HeroSection(props: HeroSectionProps) {
    const [currentLanguage, setLanguage] = useContext(LanguageContext);
    return (
        <div id={"home"} className={[styles.HeroSection, props.className].join(" ")} style={props.style}>
            <Image src={logoImage} alt={"Main Gagafeee logo"} width={400} height={400}/>
            <div className={[styles.Float, GlassyClass.Glassy].join(" ")}>
                <div className={styles.TitleContainer}>
                    <h1><TranslatableText>{{English: "I don't work", French: "Je ne travaille pas"}}</TranslatableText>
                    </h1>
                    <h1 className={styles.Subtitle}>
                        <TranslatableText>{{
                            English: "I create.",
                            French: "Je crée."
                        }}</TranslatableText>
                    </h1>
                </div>
                <h2>
                    <TranslatableText>{{
                        English: "Passionate front-end developer since 2020",
                        French: "Développeur front-end passionné depuis 2020"
                    }}</TranslatableText>
                </h2>
                <Button>
                    <>
                        <p>
                            <TranslatableText>{{
                                English: "Discover",
                                French: "Découvrir"
                            }}</TranslatableText>
                        </p>
                        <i className="fi fi-rr-caret-right"/>
                    </>
                </Button>
                <Dropdown className={styles.LanguageDropdown} defaultValue={currentLanguage}
                          onChange={(e) => setLanguage(e.target.value as Language)}>
                    {Object.values(Languages).map(language => {
                        return {key: language, val: language}
                    })}
                </Dropdown>
            </div>
            <div className={styles.Background}>
                <div className={[styles.Sphere, styles.Sphere_big].join(" ")}></div>
                <div className={[styles.Sphere, styles.Sphere_small].join(" ")}></div>
                <div className={styles.Light}></div>
            </div>
        </div>
    )
}