"use client";
import {DefaultProps} from "@/global/global";
import {ReactNode, useState} from "react";

export interface SwipeDetectorProps extends DefaultProps {
    onSwipe: (direction: 'left' | 'right') => any;
    children: ReactNode
}

export default function SwipeDetector(props: SwipeDetectorProps) {
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

// the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e: any) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        //
        props.onSwipe(isLeftSwipe ? "left" : "right");
    }
    return (
        <div className={props.className} style={props.style}
             onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {props.children}
        </div>
    )
}