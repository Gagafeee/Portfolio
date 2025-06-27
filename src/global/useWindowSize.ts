"use client";
import {useLayoutEffect, useState} from "react";

/** @author https://github.com/streamich/react-use/blob/ade8d3905f544305515d010737b4ae604cc51024/src/useWindowSize.ts#L6 */
export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
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