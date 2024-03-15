"use client";
const isServer = typeof window === "undefined";
export function vwToPx(value: number): number {
    return !isServer ? Math.floor((window.innerWidth * value) / 100) : 0;
}

export function vhToPx(value: number): number {
    return !isServer ? Math.floor((window.innerHeight * value) / 100) : 0;
}