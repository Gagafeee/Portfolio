"use client";
import styles from "../../components/css/HeroSection.module.css";
import {Language} from "@/global/global";
import Button from "@/components/public/Button";
import Image from "next/image";
import logoImage from "/public/static/main_logo-min-min.png";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "@/components/main/LanguageEnvironment";
import TranslatableText from "@/components/public/TranslatableText";
import {MovableContext} from "@/components/main/MovableContainer";
import {useWindowSize} from "@/global/useWindowSize";
import {TypeAnimation} from "react-type-animation";
import {LanguageDropdown} from "@/components/public/LanguageDropdown";

export default function HeroBanner() {
    const movableContext = useContext(MovableContext);
    const [width] = useWindowSize()
    const [isMobile, setIsMobile] = useState(width < 1400);
    useEffect(() => {
        setIsMobile(width < 1400);
    }, [width]);
    return (
        <div id={"home"} className={styles.HeroSection}>
            {isMobile && <LanguageDropdown/>}
            <Image className={styles.Image} src={logoImage} alt={"Main Gagafeee's logo"} width={400} height={400}/>
            <div className={[styles.Float, "glassy"].join(" ")}>
                <div className={styles.TitleContainer}>
                    <h1 className={styles.Subtitle}>
                        <TranslatableText>{{english: "I don't work", french: "Je ne travaille pas"}}</TranslatableText>
                    </h1>
                    <Title/>
                </div>
                <p className={styles.Text}>
                    <TranslatableText>{{
                        english: "Passionate front-end developer since 2020",
                        french: "Développeur front-end passionné depuis 2020"
                    }}</TranslatableText>
                </p>
                <div className={styles.ActionContainer}>
                    <Button onClick={() => movableContext.scrollTo("projects")}>
                        <p>
                            <TranslatableText>{{
                                english: "Discover",
                                french: "Découvrir"
                            }}</TranslatableText>
                        </p>
                        <i className="fi fi-rr-caret-right"/>
                    </Button>
                    <Button display={"text"} title={"github.com/Gagafeee"} href={"https://github.com/Gagafeee"}>
                        <i className={["fi fi-brands-github", styles.Icon].join(" ")}/>
                    </Button>
                </div>
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
        <h1 className={styles.Title}>
            {
                renderChild ? <TyperEffect language={currentLanguage}/> : null
            }
        </h1>
    )
}

function TyperEffect({language}: { language: Language }) {
    return (
        <TypeAnimation
            sequence={[
                language == "english" ? "I create." : language === "french" ? "Je crée." : "", 3000,
                language == "english" ? "I design." : language === "french" ? "Je design." : "", 3000,
                language == "english" ? "I imagine." : language === "french" ? "J'imagine." : "", 3000,
                language == "english" ? "I optimize." : language === "french" ? "J'optimise." : "", 3000,
            ]}
            wrapper="span"
            repeat={Infinity}
            cursor preRenderFirstString
        />
    )
}