"use client";
import {DefaultProps} from "@/global/global";
import {createContext, ReactNode, useEffect, useState} from "react";
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
    const [anchorMap, setAnchorMap] = useState<Map<string, number>>(new Map());
    const [, height] = useWindowSize()
    const gap = Math.floor((height * 8) / 100);

    useEffect(() => {
        function constructList() {
            const map: Map<string, number> = new Map();
            //register all linked element scroll
            props.anchorList.forEach(anchor => {
                const elem = document.getElementById(anchor)
                if (elem === null) throw new Error("Element with id '" + anchor + "' cannot be found in document")
                map.set(anchor, elem.offsetTop - gap);
            })
            return map;
        }

        setAnchorMap(constructList());
    }, [height, props.anchorList]);


    function Select(anchor: string) {
        const scroll = anchorMap.get(anchor);
        if (scroll === undefined) throw new Error("Cannot find anchor '" + anchor + "'");
        window.scrollTo({
            top: scroll,
            behavior: "smooth"
        })
    }

    return (
        <MovableContext.Provider value={{scrollTo: Select, anchorMap: anchorMap}}>
            {props.children}
        </MovableContext.Provider>


    )
}