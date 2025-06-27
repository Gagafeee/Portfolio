"use client";
import styles from "../css/MainMenu.module.css"
import {DefaultProps, Fonts} from "@/global/global";
import Button from "@/components/public/Button";
import {useContext, useLayoutEffect, useRef, useState} from "react";
import TranslatableText, {TranslatableContent} from "@/components/public/TranslatableText";
import {MovableContext} from "@/components/main/MovableContainer";
import {useWindowSize} from "@/global/useWindowSize";
import {vhToPx} from "@/global/utils";

export interface MainMenuProps extends DefaultProps {
    buttons: { anchor: string, content: TranslatableContent }[]
}

const mobileBreakpoint = 600;
export default function MainMenu(props: MainMenuProps) {
    const movableContext = useContext(MovableContext);
    const menuRef = useRef<HTMLDivElement>(null);
    const [width, height] = useWindowSize();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [dotHorizontalMargin, setDotHorizontalMargin] = useState<number>(0);

    const isMobile = width < mobileBreakpoint;
    const detectMargin = (!isMobile && height >= 1000) ? vhToPx(10) : vhToPx(8);

    useLayoutEffect(() => {
        if (!menuRef.current) return;
        //Compute dot horizontal margin
        const buttons = Array.from(menuRef.current.getElementsByClassName(styles.Button));
        if (selectedIndex < 0 || selectedIndex > buttons.length) {
            throw new Error("The button to select is out of range.")
        }
        const button = buttons[selectedIndex] as HTMLElement;
        const buttonRect = button.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const position = buttonRect.left - menuRect.left + buttonRect.width / 2;
        setDotHorizontalMargin(position);
    }, [selectedIndex, width]);

    useLayoutEffect(() => {
        //Update dot from scrolling
        function onScroll() {
            const currentScroll = window.scrollY;
            let currentElementId: number = -1;
            movableContext.anchorMap.forEach((elementTop, anchor) => {
                if (currentScroll >= (elementTop - detectMargin)) {
                    currentElementId = props.buttons.findIndex((e) => e.anchor === anchor);
                }
            })
            if (currentElementId == -1) throw new Error("scroll out of scope, current: " + currentScroll);
            setSelectedIndex(currentElementId);
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [props.buttons, height, movableContext, detectMargin]);

    return (
        <div ref={menuRef} className={[styles.MainMenu, "glassy", props.className].join(" ")}>
            {props.buttons.map((button, i) => (
                <Button
                    key={i}
                    onClick={() => movableContext.scrollTo(button.anchor)}
                    display={"text"}
                    className={[styles.Button, selectedIndex == i ? styles.Selected : ""].join(" ")}
                >
                    <p className={[styles.Text, Fonts.default.className].join(" ")}>
                        <TranslatableText>{button.content}</TranslatableText>
                    </p>
                </Button>
            ))}
            <div className={styles.Dot}
                 style={{
                     transform: `translateX(${dotHorizontalMargin}px)`,
                     display: (dotHorizontalMargin == 0 ? "none" : undefined)
                 }}/>
        </div>
    )
}