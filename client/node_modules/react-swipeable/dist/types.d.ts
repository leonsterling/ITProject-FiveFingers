import * as React from "react";
export declare const LEFT = "Left";
export declare const RIGHT = "Right";
export declare const UP = "Up";
export declare const DOWN = "Down";
export declare type HandledEvents = React.MouseEvent | TouchEvent | MouseEvent;
export declare type Vector2 = [number, number];
export declare type SwipeDirections = typeof LEFT | typeof RIGHT | typeof UP | typeof DOWN;
export interface SwipeEventData {
    absX: number;
    absY: number;
    deltaX: number;
    deltaY: number;
    dir: SwipeDirections;
    event: HandledEvents;
    first: boolean;
    initial: Vector2;
    velocity: number;
    vxvy: Vector2;
}
export declare type SwipeCallback = (eventData: SwipeEventData) => void;
export declare type TapCallback = ({ event }: {
    event: HandledEvents;
}) => void;
export declare type SwipeableCallbacks = {
    onSwipeStart: SwipeCallback;
    onSwiped: SwipeCallback;
    onSwipedDown: SwipeCallback;
    onSwipedLeft: SwipeCallback;
    onSwipedRight: SwipeCallback;
    onSwipedUp: SwipeCallback;
    onSwiping: SwipeCallback;
    onTap: TapCallback;
};
export declare type ConfigurationOptionDelta = number | {
    [key in Lowercase<SwipeDirections>]?: number;
};
export interface ConfigurationOptions {
    delta: ConfigurationOptionDelta;
    preventDefaultTouchmoveEvent: boolean;
    rotationAngle: number;
    trackMouse: boolean;
    trackTouch: boolean;
}
export declare type SwipeableProps = Partial<SwipeableCallbacks & ConfigurationOptions>;
export declare type SwipeablePropsWithDefaultOptions = Partial<SwipeableCallbacks> & ConfigurationOptions;
export interface SwipeableHandlers {
    ref(element: HTMLElement | null): void;
    onMouseDown?(event: React.MouseEvent): void;
}
export declare type SwipeableState = {
    cleanUpTouch?: () => void;
    el?: HTMLElement;
    eventData?: SwipeEventData;
    first: boolean;
    initial: Vector2;
    start: number;
    swiping: boolean;
    xy: Vector2;
};
export declare type StateSetter = (state: SwipeableState, props: SwipeablePropsWithDefaultOptions) => SwipeableState;
export declare type Setter = (stateSetter: StateSetter) => void;
export declare type AttachTouch = (el: HTMLElement, passive: boolean) => () => void;
