"use client";
import styles from "../css/ContactSection.module.css"
import {DefaultProps} from "@/global/global";
import GlassyClass from "@/global/Glassy.module.css";
import Button from "@/components/public/Button";
import {ContactData} from "@/global/content";


export interface ContactSectionProps extends DefaultProps {

}

export default function ContactSection(props: ContactSectionProps) {
    return (
        <div id={"contact"} className={[styles.ContactSection, props.className].join(" ")} style={props.style}>
            <div className={[styles.Floating, GlassyClass.Glassy].join(" ")}>
                <div className={styles.Info}>
                    <h1 className={styles.Title}>Contact me</h1>
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
                            <p>Discord</p>
                            <i className="fi fi-brands-discord"/>
                        </div>
                    </Button>
                </div>
            </div>
            <div className={styles.Background}>
                <div className={["Sphere", styles.Light].join(" ")}
                     style={{right: "-10vw", bottom: "-10vw", width: "40vw", height: "40vw"}}/>
                <div className={["Sphere", styles.Sphere].join(" ")}
                     style={{left: "-5vw", top: "20vh", width: "20vw", height: "20vw"}}/>
                <div className={["Sphere", styles.Sphere].join(" ")}
                     style={{right: "-10vw", bottom: "-10vw", width: "40vw", height: "40vw"}}/>
            </div>
        </div>
    )
}