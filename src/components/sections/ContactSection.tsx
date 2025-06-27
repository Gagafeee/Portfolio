"use client";
import styles from "../css/ContactSection.module.css"
import {DefaultProps} from "@/global/global";
import GlassyClass from "@/global/Glassy.module.css";
import Button from "@/components/public/Button";
import {ContactData} from "@/global/content";
import TranslatableText from "@/components/public/TranslatableText";


export interface ContactSectionProps extends DefaultProps {

}

export default function ContactSection(props: ContactSectionProps) {
    return (
        <div id={"contact"} className={[styles.ContactSection, props.className].join(" ")} style={props.style}>
            <div className={[styles.Floating, GlassyClass.Glassy].join(" ")}>
                <div className={styles.Info}>
                    <h1 className={styles.Title}><TranslatableText>{{
                        english: "Contact me",
                        french: "Me contacter"
                    }}</TranslatableText></h1>
                    <div className={styles.Location}>
                        <i className="fi fi-rr-earth-americas"/>
                        <p>Paris - France</p>
                    </div>
                </div>
                <div className={styles.ButtonContainer}>
                    <Button onClick={() => window.open("mailto:" + ContactData.mail, "_self")} display={"secondary"}>
                        <div className={styles.ButtonContent}>
                            <p>Mail</p>
                            <i className="fi fi-rr-envelope"/>
                        </div>
                    </Button>
                    <Button onClick={() => window.open(ContactData.discordLink)} display={"secondary"}
                            style={{borderColor: "#5865F2"}}>
                        <div className={styles.ButtonContent}>
                            <p title={"@Gagafeee"}>Discord</p>
                            <i className="fi fi-brands-discord"/>
                        </div>
                    </Button>
                </div>
            </div>
            <div className={styles.Background}>
                <div className={["Sphere", styles.Light, styles.Sphere_Light].join(" ")}/>
                <div className={["Sphere", styles.Sphere, styles.Sphere_Small].join(" ")}/>
                <div className={["Sphere", styles.Sphere, styles.Sphere_Big].join(" ")}/>
            </div>
        </div>
    )
}