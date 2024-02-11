import { useEventListener } from "@vueuse/core";

export function useClickOutsideHandler(classes: string[], callback: (e?: PointerEvent) => void) {
    return useEventListener(document, 'pointerdown', (e) => {
        if (classes.every((c) => !(e.target! as HTMLElement).classList.contains(c))) {
            callback(e);
        }
    }, false);
}

export function userClickOutsideRectHandler(rects: DOMRect[], callback: (e?: PointerEvent) => void) {
    useEventListener(window, 'pointerdown', (e) => {
        if (rects.every((r) => {
            const target = e.target! as HTMLElement;
            const targetRect = target.getBoundingClientRect();
            return targetRect.left < r.left || targetRect.right > r.right || targetRect.top < r.top || targetRect.bottom > r.bottom;
        })) {
            callback(e);
        }
    });
}