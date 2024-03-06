import styles from "../css/ExpertiseSection.module.css"
import {DefaultProps, Technologie} from "@/global/global";
import Section from "@/components/main/Section";
import Image from "next/image";
import {Technologies} from "@/global/content";
import GlassyClass from "@/global/Glassy.module.css";
import TranslatableText from "@/components/public/TranslatableText";

export interface ExpertiseSectionProps extends DefaultProps {

}

export default function ExpertiseSection(props: ExpertiseSectionProps) {
    return (
        <Section
            title={{English: "Turn ideas into reality", French: "Transformer les idées en réalité"}}
            subtitle={{English: "Using the right tool", French: "Avec les bons outils"}}
            anchor={"expertise"}
        >
            <div className={[styles.ExpertiseSection, props.className].join(" ")} style={props.style}>
                <div className={styles.Showcase}>
                    {[Technologies.react, Technologies.nextjs, Technologies.electronjs].map(techno => {
                        return (
                            <div className={[styles.Card, GlassyClass.Glassy].join(" ")} key={techno.key}>
                                <Image src={techno.icon} className={styles.Image}
                                       alt={techno.displayName ?? techno.key + "icon"}
                                       width={160} height={160}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className={styles.Container}>

                    <Section title={{English: "The roots of everything", French: "Les racines de tout"}}
                             subtitle={{English: "The fundamentals of web creation", French: "Les fondamentaux du development web"}}
                             className={styles.Section} alignment={"left"}
                    >
                        <div
                            className={styles.SectionContainer}>
                            {[Technologies.HTML, Technologies.CSS, Technologies.TS].map(technologie =>
                                <ExpertiseCard key={technologie.key} technologie={technologie}/>)}
                        </div>
                    </Section>
                    <Section title={{English: "Frameworks on demand", French: "Frameworks à la demande"}}
                             subtitle={{English: "Each one for a specific use case", French: "Chacun son cas d’utilisation spécifique"}}
                             className={styles.Section} alignment={"left"}
                    >
                        <div
                            className={styles.SectionContainer}>
                            {[Technologies.react, Technologies.nextjs, Technologies.electronjs].map(technologie =>
                                <ExpertiseCard key={technologie.key} technologie={technologie}/>)}
                        </div>
                    </Section>
                    <Section title={{English: "Libraries", French: "Libraries"}}
                             subtitle={{English: "Allow to create faster", French: "Pour créer plus vite"}}
                             className={styles.Section} alignment={"left"}
                    >
                        <div
                            className={styles.SectionContainer}>
                            {[Technologies.antdesign].map(technologie =>
                                <ExpertiseCard key={technologie.key} technologie={technologie}/>)}
                        </div>
                    </Section>
                </div>
                <div className={styles.Background}>
                    <div className={["Sphere", styles.Light].join(" ")}
                         style={{right: "-30vw", top: "-10vh", width: "40vw", height: "40vw"}}/>
                    <div className={["Sphere", styles.Light].join(" ")}
                         style={{left: "-30vw", top: "70vh", width: "40vw", height: "40vw"}}/>
                </div>
            </div>

        </Section>
    )
}

interface ExpertiseCardProps extends DefaultProps {
    technologie: Technologie
}

function ExpertiseCard(props: ExpertiseCardProps) {
    const info = props.technologie.info;
    return (
        <div className={[styles.ExpertiseCard, GlassyClass.Glassy].join(" ")}>
            <div className={styles.Header}>
                <Image src={props.technologie.icon} className={styles.Image}
                       alt={props.technologie.displayName ?? props.technologie.key + "'s icon"} width={50} height={50}/>
                <h2>{props.technologie.displayName ?? props.technologie.key}</h2>
                <div className={[styles.Tag, GlassyClass.Glassy].join(" ")}><p>{props.technologie.type}</p></div>
            </div>
            <p className={styles.Description}>
                <TranslatableText>{props.technologie.info.description}</TranslatableText>
            </p>
            <div className={styles.Footer}>
                <div className={styles.Data}>
                    <i className="fi fi-rr-clock-three"/>
                    <p>
                        {typeof info.timeCount === "number" ? info.timeCount + "h" :
                            <TranslatableText>{info.timeCount}</TranslatableText>}
                    </p>
                </div>
                <div className={styles.Data}>
                    <i className="fi fi-rr-cursor"/>
                    <p>{info.projectCount > 10 ? "10 projects +" : info.projectCount + " projects"}</p>
                </div>
            </div>
        </div>
    )
}
