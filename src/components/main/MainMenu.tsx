"use client";
import styles from "../css/MainMenu.module.css"
import {DefaultProps} from "@/global/global";
import GlassyClass from "../../global/Glassy.module.css";
import Button from "@/components/public/Button";
import {useContext, useEffect, useState} from "react";
import TranslatableText, {TranslatableContent} from "@/components/public/TranslatableText";
import {LanguageContext} from "@/components/public/LanguageEnvironment";


export interface MainMenuProps extends DefaultProps {
    list: TranslatableContent[]
}

const padding = 18;
const letterWidth = 15.3;
const gap = 19.6;
export default function MainMenu(props: MainMenuProps) {
    const [currentLanguage] = useContext(LanguageContext);
    const [selected, Selected] = useState(0);
    const [margin, setMargin] = useState(padding + (letterWidth * props.list[selected][currentLanguage].length) / 2);


    useEffect(() => {
        function calculateMargin() {
            const lengthMap = props.list.map(t => t[currentLanguage].length);
            let prev = 0;
            lengthMap.slice(0, selected).map(l => prev += letterWidth * l + gap)
            return padding + prev + (letterWidth * lengthMap[selected]) / 2;
            //Margin = padding + (every previous length + gap) + (current length / 2)
        }

        setMargin(calculateMargin())
    }, [selected, currentLanguage]);


    return (
        <div className={[styles.MainMenu, GlassyClass.Glassy, props.className].join(" ")} style={props.style}>
            {props.list.map((content, i) => {
                return (
                    <Button key={i} onClick={() => Selected(i)} display={"text"}
                            className={[styles.Button, selected === i ? styles.Selected : ""].join(" ")}>
                        <p className={styles.Text}><TranslatableText>{content}</TranslatableText></p>
                    </Button>
                )
            })}
            <div style={{left: margin}} className={styles.Dot}></div>
        </div>
    )
}