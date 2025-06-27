import styles from "../css/ExpertiseSection.module.css"
import {DefaultProps, Technologie} from "@/global/global";
import Section from "@/components/main/Section";
import Image from "next/image";
import {Technologies} from "@/global/content";
import TranslatableText from "@/components/public/TranslatableText";
import Link from "next/link";

export interface ExpertiseSectionProps extends DefaultProps {

}

export default function ExpertiseSection(props: ExpertiseSectionProps) {
    return (
        <Section
            title={{english: "Turn ideas into reality", french: "Transformer les idées en réalité"}}
            subtitle={{english: "Using the right tool", french: "Avec les bons outils"}}
            anchor={"expertise"}
        >
            <div className={[styles.ExpertiseSection, props.className].join(" ")} style={props.style}>
                <div className={styles.Showcase}>
                    {[Technologies.react, Technologies.nextjs, Technologies.electronjs].map(techno => {
                        return (
                            <Link href={techno.link} target={"_blank"}
                                  className={[styles.Card, "glassy"].join(" ")} key={techno.key}>
                                <p className={[styles.Popover, "glassy"].join(" ")}>{techno.displayName}</p>
                                <Image src={techno.icon} className={styles.Image}
                                       alt={techno.displayName ?? techno.key + "icon"}
                                       width={160} height={160}
                                />
                            </Link>
                        )
                    })}
                </div>
                <div className={styles.Container}>
                    <Section title={{english: "The roots of everything", french: "Les racines de tout"}}
                             level={2} subtitle={{
                        english: "The fundamentals of web creation",
                        french: "Les fondamentaux du development web"
                    }}
                             className={styles.Section} alignment={"left"}
                    >
                        <div
                            className={styles.SectionContainer}>
                            {[Technologies.HTML, Technologies.CSS, Technologies.TS].map(technologie =>
                                <ExpertiseCard key={technologie.key} technologie={technologie}/>)}
                        </div>
                    </Section>
                    <Section title={{english: "Frameworks on demand", french: "Frameworks à la demande"}}
                             level={2} subtitle={{
                        english: "Each one for a specific use case",
                        french: "Chacun son cas d’utilisation spécifique"
                    }}
                             className={styles.Section} alignment={"left"}
                    >
                        <div
                            className={styles.SectionContainer}>
                            {[Technologies.react, Technologies.nextjs, Technologies.electronjs].map(technologie =>
                                <ExpertiseCard key={technologie.key} technologie={technologie}/>)}
                        </div>
                    </Section>
                    <Section title={{english: "Libraries", french: "Libraries"}} level={2}
                             subtitle={{english: "Allow to create faster", french: "Pour créer plus vite"}}
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
        <div className={[styles.ExpertiseCard, "glassy"].join(" ")}>
            <div className={styles.Header}>
                <Image src={props.technologie.icon} className={styles.Image}
                       alt={props.technologie.displayName ?? props.technologie.key + "'s icon"} width={50} height={50}/>
                {props.technologie.link ?
                    <Link href={props.technologie.link} target={"_blank"}>
                        <h4>{props.technologie.displayName ?? props.technologie.key}</h4></Link>
                    : <h4> {props.technologie.displayName ?? props.technologie.key} </h4>}
                <div className={[styles.Tag, "glassy"].join(" ")}><p>{props.technologie.type}</p></div>
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
                    <p>
                        <TranslatableText>{{
                            french: info.projectCount > 10 ? "10 projets +" : info.projectCount + " projets",
                            english: info.projectCount > 10 ? "10 projects +" : info.projectCount + " projects"
                        }}</TranslatableText>
                    </p>
                </div>
            </div>
        </div>
    )
}
