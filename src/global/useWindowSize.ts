"use client";
import {useEffect, useLayoutEffect, useState} from "react";

export function useWindowSize() {
    //https://github.com/streamich/react-use/blob/ade8d3905f544305515d010737b4ae604cc51024/src/useWindowSize.ts#L6
    const isServer = typeof window === "undefined";
    const [size, setSize] = useState([Infinity, Infinity]);
    useEffect(() => {
        setSize([window.innerWidth, window.innerHeight])
    }, []);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}