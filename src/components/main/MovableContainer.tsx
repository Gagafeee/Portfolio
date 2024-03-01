"use client";
import {DefaultProps} from "@/global/global";
import {createContext, ReactNode, useEffect, useRef} from "react";
import {useWindowSize} from "@/global/useWindowSize";

export interface MovableContextProps extends DefaultProps {
    anchorList: string[],
    children: ReactNode
}

export interface MovableContext {
    scrollTo: (anchor: string) => void,
    anchorMap: Map<string, number>
}

function error() {
    throw new Error("Context not registered")
}

export const MovableContext = createContext<MovableContext>({scrollTo: error, anchorMap: new Map()})
export default function MovableContainer(props: MovableContextProps) {
    const anchorMap = useRef<Map<string, number>>(new Map());
    const [width, height] = useWindowSize()

    useEffect(() => {
        function constructList() {
            const map: Map<string, number> = new Map();
            //register all linked element scroll
            props.anchorList.forEach(anchor => {
                const elem = document.getElementById(anchor)
                if (elem === null) throw new Error("Element with id '" + anchor + "' cannot be found in document")
                map.set(anchor, elem.offsetTop);
            })
            return map;
        }

        anchorMap.current = constructList()
    }, [height]);


    function Select(anchor: string) {
        const scroll = anchorMap.current.get(anchor);
        if (scroll === undefined) throw new Error("Cannot find anchor '" + anchor + "'");
        window.scrollTo({
            top: (scroll - Math.floor((height * 8) / 100)),
            behavior: "smooth"
        })
    }

    return (
        <MovableContext.Provider value={{scrollTo: Select, anchorMap: anchorMap.current}}>
            {props.children}
        </MovableContext.Provider>


    )
}