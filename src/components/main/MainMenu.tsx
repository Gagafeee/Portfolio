"use client";
import styles from "../css/MainMenu.module.css"
import {defaultFont, DefaultProps} from "@/global/global";
import GlassyClass from "@/global/Glassy.module.css";
import Button from "@/components/public/Button";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import TranslatableText, {TranslatableContent} from "@/components/public/TranslatableText";
import {LanguageContext} from "@/components/public/LanguageEnvironment";
import {useWindowSize} from "@/global/useWindowSize";
import {MovableContext} from "@/components/main/MovableContainer";


export interface MainMenuProps extends DefaultProps {
    buttons: { anchor: string, content: TranslatableContent }[]
}

const padding = 18;
const letterWidth = 12.9;

export default function MainMenu(props: MainMenuProps) {
    const movableContext = useContext(MovableContext);
    const [currentLanguage] = useContext(LanguageContext);
    const [width, height] = useWindowSize()
    const [selected, setSelected] = useState<number>(0);
    const [margin, setMargin] = useState(padding + (letterWidth * props.buttons[selected].content[currentLanguage].length) / 2);
    const menuGap = Math.floor((width * 1) / 100);
    const detectMargin = Math.floor((height * 18) / 100);

    useEffect(() => {
        function calculateMargin() {
            const lengthMap = props.buttons.map(t => t.content[currentLanguage].length);
            let prev = 0;
            lengthMap.slice(0, selected).map(l => prev += letterWidth * l + menuGap)
            return padding + prev + (letterWidth * lengthMap[selected]) / 2;
            //Margin = padding + (every previous length + gap) + (current length / 2)
        }

        setMargin(calculateMargin())
    }, [selected, currentLanguage, props.buttons]);

    function onScroll() {
        const currentScroll = window.scrollY;
        let currentElementId: number = -1;
        movableContext.anchorMap.forEach((elementTop, anchor) => {
            if (currentScroll >= (elementTop - detectMargin)) {
                currentElementId = props.buttons.findIndex((e) => e.anchor === anchor);
            }
        })
        if (currentElementId === -1) throw new Error("scroll out of scope, current: " + currentScroll);
        setSelected(currentElementId)
    }

    //scroll setup on component rendered
    useLayoutEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [props.buttons, height]);

    return (
        <div className={[styles.MainMenu, GlassyClass.Glassy, props.className].join(" ")} style={props.style}>
            {props.buttons.map((button, i) => {
                return (
                    <Button key={i} onClick={() => movableContext.scrollTo(button.anchor)} display={"text"}
                            className={[styles.Button, selected === i ? styles.Selected : ""].join(" ")}>
                        <p className={[styles.Text, defaultFont.className].join(" ")}>
                            <TranslatableText>{button.content}</TranslatableText></p>
                    </Button>
                )
            })}
            <div style={{left: margin}} className={styles.Dot}></div>
        </div>
    )
}