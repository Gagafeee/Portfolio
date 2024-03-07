"use client";
import styles from "../css/MainMenu.module.css"
import {defaultFont, DefaultProps} from "@/global/global";
import GlassyClass from "@/global/Glassy.module.css";
import Button from "@/components/public/Button";
import {useCallback, useContext, useEffect, useLayoutEffect, useState} from "react";
import TranslatableText, {TranslatableContent} from "@/components/public/TranslatableText";
import {LanguageContext} from "@/components/public/LanguageEnvironment";
import {useWindowSize} from "@/global/useWindowSize";
import {MovableContext} from "@/components/main/MovableContainer";


export interface MainMenuProps extends DefaultProps {
    buttons: { anchor: string, content: TranslatableContent }[]
}

const mobileBreakpoint = 600;
export default function MainMenu(props: MainMenuProps) {
    const movableContext = useContext(MovableContext);
    const [currentLanguage] = useContext(LanguageContext);
    const [width, height] = useWindowSize()

    const isMobile = useCallback(() => width <= mobileBreakpoint, [width]);

    const letterWidth = useCallback(() => !isMobile() ? 12.9 : 9.92, [isMobile]);

    const calculateMobileGap = useCallback(() => {
        const letterWidthMap = props.buttons.map(b => (b.content[currentLanguage].length * letterWidth()));
        let total = 0;
        letterWidthMap.forEach(w => total += w)
        return (width - total) / (letterWidthMap.length + 1);
        //gap = (width - elemTotWidth) / (nb(element) + 1)
    }, [width, currentLanguage, letterWidth, props.buttons])


    const [menuGap, setMenuGap] = useState(isMobile() ? calculateMobileGap : Math.floor(width / 100));
    const [padding, setPadding] = useState(isMobile() ? calculateMobileGap : 18);


    const [selected, setSelected] = useState<number>(0);

    const [margin, setMargin] = useState(padding + (letterWidth() * props.buttons[selected].content[currentLanguage].length) / 2);

    const detectMargin = Math.floor((height * 18) / 100);


    useEffect(() => {
        setMenuGap(isMobile() ? calculateMobileGap : Math.floor(width / 100));
        setPadding(isMobile() ? calculateMobileGap : 18);

        function calculateMargin() {
            const lengthMap = props.buttons.map(t => t.content[currentLanguage].length);
            let prev = 0;
            lengthMap.slice(0, selected).map(l => prev += letterWidth() * l + menuGap)
            return padding + prev + (letterWidth() * lengthMap[selected]) / 2;
            //Margin = padding + (every previous length + gap) + (current length / 2)
        }

        setMargin(calculateMargin())
    }, [selected, currentLanguage, props.buttons, width, menuGap, padding, isMobile, letterWidth, calculateMobileGap]);


    useLayoutEffect(() => {
        //scroll setup on component rendered
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

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [props.buttons, height, movableContext.anchorMap, detectMargin]);

    return (
        <div className={[styles.MainMenu, GlassyClass.Glassy, props.className].join(" ")}
             style={{...props.style, gap: isMobile() ? (menuGap + "px") : undefined}}>
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