"use client";
import styles from "../../components/css/ProjectSection.module.css"
import {DefaultProps, Project} from "@/global/global";
import Section from "@/components/main/Section";
import {Projects} from "@/global/content";
import {useContext, useEffect, useRef, useState} from "react";
import Image from "next/image";
import Button from "@/components/public/Button";
import {CSSTransition} from "react-transition-group";
import "../../components/css/CarouselTransition.css"
import {LanguageContext} from "@/components/main/LanguageEnvironment";
import TranslatableText from "@/components/public/TranslatableText";
import SwipeDetector from "@/components/main/SwipeDetector";


export interface ProjectSectionProps extends DefaultProps {

}

export default function ProjectSection(props: ProjectSectionProps) {
    return (
        <Section
            className={[styles.ProjectSection, props.className].join(" ")}
            style={props.style}
            title={{english: "Past Projects", french: "Projets precedents"}}
            subtitle={{
                english: "Every achievement brings knowledge",
                french: "Chaque réalisation apporte des connaissances"
            }}
            anchor={"projects"}
        >
            <ProjectCarousel elements={Projects}/>
        </Section>
    )
}

function ProjectCarousel(props: { elements: Project[] }) {
    const transitionDuration = 1000;

    const [currentId, setCurrentId] = useState<number>(0)
    const [current, setCurrent] = useState<Project>(props.elements[currentId])
    const [inTransition, setInTransition] = useState(false);
    useEffect(() => {
        setTimeout(() => setCurrent(props.elements[currentId]), transitionDuration / 2)
    }, [currentId, props.elements]);

    useEffect(() => setCurrentId(props.elements.indexOf(current)), [current, props.elements]);

    const [transitionDirection, setTransitionDirection] = useState<boolean>()


    const imageNodeRef = useRef(null)
    const imageFallbackNodeRef = useRef(null)

    useEffect(() => {
        setInTransition(true);
        setTransitionDirection(false);
        setTimeout(() => {
            setTransitionDirection(true)
            setTimeout(() => setInTransition(false), transitionDuration / 2)
        }, transitionDuration / 2);
    }, [currentId]);

    const navigateNext = () => {
        if (!inTransition) setCurrentId(currentId + 1 < props.elements.length ? currentId + 1 : 0)
    };
    const navigatePrevious = () => {
        if (!inTransition) setCurrentId(currentId - 1 >= 0 ? currentId - 1 : (props.elements.length - 1))
    };

    return (
        <SwipeDetector onSwipe={(d) => d === "left" ? navigatePrevious() : navigateNext()}>
            <div className={styles.Carousel}>
                <div className={styles.LeftContainer}>
                    <div className={styles.Navigator}>
                        <button aria-disabled={inTransition} aria-label={"Display previous project"}
                                className={[styles.Arrow, "glassy", styles.Previous].join(" ")}
                                onClick={navigatePrevious}>
                            <i className="fi fi-rr-caret-up"/>

                        </button>
                        <div className={[styles.ButtonContainer, "glassy"].join(" ")}>
                            {props.elements.slice(0, 4).map((project, i) => {
                                //Buttons
                                return (
                                    <button key={project.key} aria-disabled={inTransition}
                                            aria-label={"Display " + i + " element"}
                                            className={[styles.Button, i === currentId ? styles.Selected : undefined].join(" ")}
                                            onClick={() => {
                                                if (!inTransition) setCurrentId(i);
                                            }}/>
                                )
                            })}
                        </div>
                        <button aria-disabled={inTransition} name={"Display next element"}
                                className={[styles.Arrow, "glassy", styles.Next].join(" ")}
                                onClick={navigateNext}>
                            <i className="fi fi-rr-caret-down"/>
                        </button>
                    </div>
                    <div className={[styles.Card, "glassy"].join(" ")}>
                        <div className={styles.Header}>
                            <div className={styles.TitleContainer}>
                                <Image className={styles.Icon} src={current.icon}
                                       alt={current.displayName ?? current.key + "'s project icon"} width={80}
                                       height={80}/>
                                <h2>{current.displayName ?? current.key}</h2>
                            </div>
                            {current.link && <Button display={"text"} className={styles.Button}
                                                     href={current.link.url}>
                                {current.link.type === "github" ? <></> :
                                    <p>{current.link.display ?? ("See on " + new URL(current.link.url).hostname)}</p>}
                                <i title={current.link.display ?? ("See on " + new URL(current.link.url).hostname)}
                                   className={[current.link.type === "github" ? "fi fi-brands-github" : "fi fi-rr-caret-right", styles.Icon].join(" ")}/>
                            </Button>}
                        </div>
                        <p /*style={{maxHeight: contentLineHeight + "px", minHeight: contentLineHeight + "px"}}*/
                            className={styles.Description}><TranslatableText>{current.description}</TranslatableText>
                        </p>
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
                                        <Image className={styles.Image} key={i} src={tech.icon}
                                               alt={tech.displayName ?? tech.key} width={50}
                                               height={50}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.ImageContainer}>
                    <CSSTransition key={"image"} nodeRef={imageNodeRef} in={transitionDirection}
                                   classNames={"ImageContainer-animation"}
                                   timeout={transitionDuration}>
                        <Image className={styles.Image} ref={imageNodeRef} src={current.illustration} width={1500}
                               height={1500}
                               alt={current.displayName ?? current.key + "'s illustration"}></Image>
                    </CSSTransition>
                    <CSSTransition key={"image fallback"} nodeRef={imageFallbackNodeRef} in={transitionDirection}
                                   classNames={"ImageContainer-animation"}
                                   timeout={transitionDuration}>
                        <Image className={styles.ImageFallback} ref={imageFallbackNodeRef} src={current.illustration}
                               width={10} height={10}
                               alt={current.displayName ?? current.key + "'s illustration"}></Image>
                    </CSSTransition>
                    <div className={["Sphere", styles.Sphere].join(" ")}/>
                    <div style={{backgroundColor: current.color}} className={["Sphere", styles.Light].join(" ")}/>
                </div>
                <div className={styles.Background}>
                    <div style={{backgroundColor: current.color}} className={["Sphere", styles.Light].join(" ")}/>
                </div>
            </div>
        </SwipeDetector>
    )
}