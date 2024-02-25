"use client";
import styles from "../css/ProjectSection.module.css"
import {DefaultProps, Project} from "@/global/global";
import Section from "@/components/main/Section";
import {Projects} from "@/global/content";
import {useEffect, useState} from "react";
import GlassyClass from "@/global/Glassy.module.css";
import Image from "next/image";
import Button from "@/components/public/Button";


export interface ProjectSectionProps extends DefaultProps {

}

export default function ProjectSection(props: ProjectSectionProps) {
    return (
        <Section
            className={[styles.ProjectSection, props.className].join(" ")}
            style={props.style}
            title={{English: "Past Projects", French: ""}}
            subtitle={{English: "Every achievement brings knowledge", French: ""}}
            anchor={"projects"}
        >
            <ProjectCarousel elements={Projects}/>
        </Section>
    )
}

function ProjectCarousel(props: { elements: Project[] }) {
    const [currentId, setCurrentId] = useState<number>(0)
    const [current, setCurrent] = useState<Project>(props.elements[currentId])
    useEffect(() => setCurrent(props.elements[currentId]), [currentId]);
    useEffect(() => setCurrentId(props.elements.indexOf(current)), [current]);

    const navigateNext = () => setCurrentId(currentId + 1 < props.elements.length ? currentId + 1 : 0)
    const navigatePrevious = () => setCurrentId(currentId - 1 >= 0 ? currentId - 1 : (props.elements.length - 1))

    return (
        <div className={styles.Carousel}>
            <div className={styles.LeftContainer}>
                <div className={styles.Navigator}>
                    <div className={[styles.Arrow, GlassyClass.Glassy, styles.PreviousArrow].join(" ")}
                         onClick={navigatePrevious}>
                        <i className="fi fi-rr-caret-up"/>
                    </div>
                    <div className={[styles.ButtonContainer, GlassyClass.Glassy].join(" ")}>
                        {props.elements.slice(0, 4).map((project, i) => {
                            //Buttons
                            return (
                                <div
                                    className={[styles.Button, i === currentId ? styles.Selected : undefined].join(" ")}
                                    onClick={() => setCurrentId(i)}/>
                            )
                        })}
                    </div>
                    <div className={[styles.Arrow, GlassyClass.Glassy, styles.NextArrow].join(" ")}
                         onClick={navigateNext}>
                        <i className="fi fi-rr-caret-down"/>
                    </div>
                </div>
                <div className={[styles.Card, GlassyClass.Glassy].join(" ")}>
                    <div className={styles.Header}>
                        <div className={styles.TitleContainer}>
                            <Image src={current.icon} alt={""} width={80} height={80}/>
                            <h1>{current.displayName ?? current.key}</h1>
                        </div>
                        {current.link && <Button display={"secondary"} className={styles.Button}
                                                 onClick={() => window.open(current.link?.url)}>
                            <p>{current.link.display ?? ("See on " + new URL(current.link.url).hostname)}</p>
                            <i className="fi fi-rr-caret-right"/>
                        </Button>}
                    </div>
                    <p className={styles.Description}>{current.description}</p>
                    <div className={styles.Footer}>
                        <div className={styles.Datas}>
                            <div className={[styles.Data].join(" ")}>
                                <i className="fi fi-rr-clock-three"></i>
                                <p>{current.timeCount}h</p>
                            </div>
                            <div className={[styles.Data].join(" ")}>
                                <i className="fi fi-rr-calendar-day"></i>
                                <p>{current.dates}</p>
                            </div>
                        </div>
                        <div className={styles.TechnologiesContainer}>
                            {current.technologies.map((tech, i) => {
                                //Technologie
                                return (
                                    <Image src={tech.icon} alt={tech.displayName} width={70} height={70}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.ImageContainer}>
                <Image className={styles.Image} src={current.illustration} width={1500} height={1500}
                       alt={current.displayName ?? current.key + "'s illustration"}></Image>
                <Image className={styles.ImageFallback} src={current.illustration} width={10} height={10}
                       alt={current.displayName ?? current.key + "'s illustration"}></Image>
                <div className={["Sphere", styles.Sphere].join(" ")}/>
                <div style={{backgroundColor: current.color}} className={["Sphere", styles.Light].join(" ")}/>
            </div>
            <div className={styles.Background}>
                <div style={{backgroundColor: current.color}} className={["Sphere", styles.Light].join(" ")}/>
            </div>
        </div>
    )
}