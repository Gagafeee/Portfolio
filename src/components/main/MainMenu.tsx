"use client";
import styles from "../css/MainMenu.module.css"
import {defaultFont, DefaultProps} from "@/global/global";
import GlassyClass from "@/global/Glassy.module.css";
import Button from "@/components/public/Button";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import TranslatableText, {TranslatableContent} from "@/components/public/TranslatableText";
import {LanguageContext} from "@/components/public/LanguageEnvironment";
import {useWindowSize} from "@/global/useWindowSize";


export interface MainMenuProps extends DefaultProps {
    list: { anchor: string, content: TranslatableContent }[]
}

const padding = 18;
const letterWidth = 12.9;

export default function MainMenu(props: MainMenuProps) {
    const [currentLanguage] = useContext(LanguageContext);
    const [width, height] = useWindowSize()
    const [selected, setSelected] = useState(0);
    const [margin, setMargin] = useState(padding + (letterWidth * props.list[selected].content[currentLanguage].length) / 2);

    const scrollIndex = useRef<number[]>();
    const detectMargin = Math.floor((height * 18) / 100);
    const menuGap = Math.floor((width * 1) / 100);


    function onScroll() {
        const currentScroll = window.scrollY;
        let currentElementId: number = -1;
        scrollIndex.current?.forEach((elementTop, i) => {
            if (currentScroll >= (elementTop - detectMargin)) currentElementId = i;
        })
        if (currentElementId === -1) throw new Error("scroll out of scope, current: " + currentScroll);
        setSelected(currentElementId);
    }

    //scroll setup on component rendered
    useLayoutEffect(() => {
        //register all linked element scroll
        scrollIndex.current = props.list.map(button => {
            const elem = document.getElementById(button.anchor)
            if (elem === null) throw new Error("Element with id '" + button.anchor + "' cannot be found in document")
            return elem.offsetTop;
        })
        console.log(scrollIndex.current)
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [props.list, height]);


    useEffect(() => {
        function calculateMargin() {
            const lengthMap = props.list.map(t => t.content[currentLanguage].length);
            let prev = 0;
            lengthMap.slice(0, selected).map(l => prev += letterWidth * l + menuGap)
            return padding + prev + (letterWidth * lengthMap[selected]) / 2;
            //Margin = padding + (every previous length + gap) + (current length / 2)
        }

        setMargin(calculateMargin())
    }, [selected, currentLanguage, props.list]);

    function Select(id: number) {
        setSelected(id);
        window.scrollTo({top: ((scrollIndex.current?.[id] ?? 0) - Math.floor((height * 8) / 100)), behavior: "smooth"})
    }

    return (
        <div className={[styles.MainMenu, GlassyClass.Glassy, props.className].join(" ")} style={props.style}>
            {props.list.map((button, i) => {
                return (
                    <Button key={i} onClick={() => Select(i)} display={"text"}
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