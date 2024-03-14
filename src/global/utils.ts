"use client";
const isServer = typeof window === "undefined";

export function getWidth(): number {
    return !isServer ? window.innerWidth : 0;
}
export function getHeight(): number {
    return !isServer ? window.innerHeight : 0;
}

export function vwToPx(value: number): number {
    return !isServer ? Math.floor((window.innerWidth * value) / 100) : 0;
}

export function vhToPx(value: number): number {
    return !isServer ? Math.floor((window.innerHeight * value) / 100) : 0;
}