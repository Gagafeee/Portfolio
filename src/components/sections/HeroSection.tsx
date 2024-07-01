"use client";
import styles from "../css/HeroSection.module.css";
import GlassyClass from "../../global/Glassy.module.css";
import {DefaultProps, Language, Languages} from "@/global/global";
import Button from "@/components/public/Button";
import Image from "next/image";
import logoImage from "/public/static/main_logo-min.png";
import Dropdown from "@/components/public/Dropdown";
import {Suspense, useContext, useEffect, useState} from "react";
import {LanguageContext} from "@/components/public/LanguageEnvironment";
import TranslatableText from "@/components/public/TranslatableText";
import {MovableContext} from "@/components/main/MovableContainer";
import {useWindowSize} from "@/global/useWindowSize";
import {TypeAnimation} from "react-type-animation";

export interface HeroSectionProps extends DefaultProps {

}

export default function HeroSection(props: HeroSectionProps) {
    const [width, height] = useWindowSize()
    const movableContext = useContext(MovableContext);
    const [isMobile, setIsMobile] = useState(width < 1400);
    useEffect(() => {
        setIsMobile(width < 1400);
    }, [width]);
    return (
        <div id={"home"} className={[styles.HeroSection, props.className].join(" ")} style={props.style}>
            {isMobile && <LanguageDropdown/>}
            <Image className={styles.Image} src={logoImage} alt={"Main Gagafeee logo"} width={400} height={400}/>
            <div className={[styles.Float, GlassyClass.Glassy].join(" ")}>
                <div className={styles.TitleContainer}>
                    <h1>
                        <TranslatableText>{{English: "I don't work", French: "Je ne travaille pas"}}</TranslatableText>
                    </h1>
                    <Title/>
                </div>
                <p className={styles.Text}>
                    <TranslatableText>{{
                        English: "Passionate front-end developer since 2020",
                        French: "Développeur front-end passionné depuis 2020"
                    }}</TranslatableText>
                </p>
                <Button onClick={() => movableContext.scrollTo("projects")}>
                    <p>
                        <TranslatableText>{{
                            English: "Discover",
                            French: "Découvrir"
                        }}</TranslatableText>
                    </p>
                    <i className="fi fi-rr-caret-right"/>
                </Button>
                {!isMobile && <LanguageDropdown/>}
            </div>
            <div className={styles.Background}>
                <div className={["Sphere", styles.Sphere_big].join(" ")}></div>
                <div className={["Sphere", styles.Sphere_small].join(" ")}></div>
                <div className={styles.Light}></div>
            </div>
        </div>
    )
}

function LanguageDropdown() {
    const [currentLanguage, setLanguage] = useContext(LanguageContext);
    return (
        <Dropdown name={"Language select"} className={styles.LanguageDropdown} value={currentLanguage}
                  onChange={(e) => setLanguage(e.target.value as Language)}>
            {Object.values(Languages).map(language => {
                return {key: language, label: language === "French" ? "Français" : language === "English" ? "English" : null}
            })}
        </Dropdown>
    )
}


function Title() {
    const [currentLanguage, setCurrentLanguage] = useContext(LanguageContext);
    const [renderChild, setRenderChild] = useState(true)
    useEffect(() => {
        setRenderChild(false);
    }, [currentLanguage]);

    useEffect(() => {
        setRenderChild(true);
    }, [renderChild]);

    return (
        <h1 className={styles.Subtitle}>
            {
                renderChild ? <TyperEffect language={currentLanguage}/> : null
            }
        </h1>
    )
}

function TyperEffect(props: { language: Language }) {
    return (
        <TypeAnimation
            sequence={[
                props.language === "English" ? "I create." : props.language === "French" ? "Je crée." : "",
                3000,
                props.language === "English" ? "I design." : props.language === "French" ? "Je design." : "",
                3000,
                props.language === "English" ? "I imagine." : props.language === "French" ? "J'imagine." : "",
                3000,
                props.language === "English" ? "I optimize." : props.language === "French" ? "J'optimise." : "",
                3000,
            ]}
            wrapper="span"
            repeat={Infinity}
            cursor preRenderFirstString
        />
    )
}