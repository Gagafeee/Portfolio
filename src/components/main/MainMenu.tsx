"use client";
import styles from "../css/MainMenu.module.css"
import {defaultFont, DefaultProps} from "@/global/global";
import GlassyClass from "@/global/Glassy.module.css";
import Button from "@/components/public/Button";
import {useContext, useLayoutEffect, useRef, useState} from "react";
import TranslatableText, {TranslatableContent} from "@/components/public/TranslatableText";
import {LanguageContext} from "@/components/public/LanguageEnvironment";
import {useWindowSize} from "@/global/useWindowSize";
import {MovableContext} from "@/components/main/MovableContainer";
import {vhToPx, vwToPx} from "@/global/utils";


export interface MainMenuProps extends DefaultProps {
    buttons: { anchor: string, content: TranslatableContent }[]
}

const mobileBreakpoint = 600;
export default function MainMenu(props: MainMenuProps) {
    const movableContext = useContext(MovableContext);
    const [currentLanguage] = useContext(LanguageContext);
    const [width, height] = useWindowSize()
    const menuRef = useRef<HTMLDivElement>(null)

    const [selected, setSelected] = useState<number>(0);
    const [buttonWidthMap, setButtonWidthMap] = useState<number[]>([]);

    const isMobile = width < mobileBreakpoint;

    const letterWidth = !isMobile ? 26 * 0.5 : 16 * 0.5;
    const gap = !isMobile ? vwToPx(1) : 0;
    const leftMargin = !isMobile ? 18 : 0;
    const detectMargin = (!isMobile && height >= 1000) ? vhToPx(10) : vhToPx(8);

    useLayoutEffect(() => {
        //calculate Button margin
        let newSizeMap: number[] = [];
        props.buttons.forEach(btn => {
            newSizeMap.push(btn.content[currentLanguage].length * letterWidth);
        });
        setButtonWidthMap(newSizeMap);
    }, [props.buttons, currentLanguage, letterWidth]);

    useLayoutEffect(() => {
        //calculate Dot Position
        let accumulatedPreviousMargin = 0;
        buttonWidthMap.slice(0, selected).map(width => accumulatedPreviousMargin += width + gap);
        if (isMobile) {
            const mobilePadding = vwToPx(2);
            const buttonWidth = (width - mobilePadding) / buttonWidthMap.length;
            setMargin(leftMargin + (buttonWidth * selected) + (buttonWidth / 2));
            //every button have the same size
        } else {
            setMargin(leftMargin + accumulatedPreviousMargin + (buttonWidthMap[selected] / 2));
            //Margin = padding + (every previous length + gap) + (current length / 2)
        }
    }, [width, selected, props.buttons, currentLanguage, buttonWidthMap, gap, leftMargin, isMobile]);


    const [margin, setMargin] = useState<number>();

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
    }, [props.buttons, height, movableContext, detectMargin]);

    return (
        <div ref={menuRef} className={[styles.MainMenu, GlassyClass.Glassy, props.className].join(" ")}
             style={{gap: gap + "px"}}>
            {props.buttons.map((button, i) => {
                return (
                    <Button key={i} onClick={() => movableContext.scrollTo(button.anchor)} display={"text"}
                            className={[styles.Button, selected === i ? styles.Selected : ""].join(" ")}>
                        <p style={{width: buttonWidthMap[i]}}
                           className={[styles.Text, defaultFont.className].join(" ")}>
                            <TranslatableText>{button.content}</TranslatableText></p>
                    </Button>
                )
            })}
            <div style={{left: margin !== undefined && !isNaN(margin) ? margin : undefined}}
                 className={styles.Dot}></div>
        </div>
    )
}