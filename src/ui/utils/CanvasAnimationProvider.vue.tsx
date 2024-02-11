import { defineComponent } from "vue";

/* tl: a simple provider: collect all "requestAnimationFrame" requests from canvas
 * layers, and call it at one place. */

defineComponent({
    name: "CanvasAnimationProvider",
    provide: {
        setUpdateFunction: Function,
        requestAnimationFrame: Function,
    }}
);
