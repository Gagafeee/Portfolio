"use client";
import styles from "../css/MainMenu.module.css"
import {DefaultProps} from "@/global/global";
import GlassyClass from "../../global/Glassy.module.css";
import Button from "@/components/Button";
import {useEffect, useState} from "react";


export interface MainMenuProps extends DefaultProps {
    list: string[]
}

const padding = 18;
const letterWidth = 15.3;
const gap = 19.6;
export default function MainMenu(props: MainMenuProps) {
    const [selected, Selected] = useState(0);
    const [margin, setMargin] = useState(calculateMargin());

    function calculateMargin() {
        const lengthMap = props.list.map(t => t.length);
        let prev = 0;
        lengthMap.slice(0, selected).map(l => prev += letterWidth * l + gap)
        return padding + prev + (letterWidth * lengthMap[selected]) / 2;
        //Margin = padding + (every previous length + gap) + (current length / 2)
    }

    useEffect(() => {
        setMargin(calculateMargin())
    }, [selected]);


    return (
        <div className={[styles.MainMenu, GlassyClass.Glassy, props.className].join(" ")} style={props.style}>
            {props.list.map((text, i) => {
                return (
                    <Button onClick={() => Selected(i)} display={"text"}
                            className={[styles.Button, selected === i ? styles.Selected : ""].join(" ")}>
                        {text}
                    </Button>
                )
            })}
            <div style={{left: margin}} className={styles.Dot}></div>
        </div>
    )
}