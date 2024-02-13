"use client";
import styles from "../css/HeroSection.module.css";
import GlassyClass from "../../global/Glassy.module.css";
import {DefaultProps} from "@/global/global";
import Button from "@/components/Button";
import Image from "next/image";
import logoImage from "../../../public/main_logo.png";

export interface HeroSectionProps extends DefaultProps {

}

export default function HeroSection(props: HeroSectionProps) {
    return (
        <div className={[styles.HeroSection, props.className].join(" ")} style={props.style}>
            <Image src={logoImage} alt={"Main Gagafeee logo"} width={400} height={400}/>
            <div className={[styles.Float, GlassyClass.Glassy].join(" ")}>
                <div className={styles.TitleContainer}>
                    <h1>I don't work</h1>
                    <h1 className={styles.Subtitle}>I create.</h1>
                </div>
                <h2>Passionate front-end developer since 2020</h2>
                <Button>
                    <>
                        <p>Discover</p>
                        <i className="fi fi-rr-caret-right"/>
                    </>
                </Button>
            </div>
            <div className={styles.Background}>
                <div className={[styles.Sphere, styles.Sphere_big].join(" ")}></div>
                <div className={[styles.Sphere, styles.Sphere_small].join(" ")}></div>
                <div className={styles.Light}></div>
            </div>
        </div>
    )
}