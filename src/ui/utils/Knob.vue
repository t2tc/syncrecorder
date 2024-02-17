<script setup lang="ts">
import { ref, onMounted, computed, watch, toValue } from 'vue';
import { useSvgId } from '../../use/useSvgId';

type KnobProps = {
    /** The size (height or width) of knob, in px. */
    size?: number,
    /** Whether the knob is a pan knob (to control stereo imaging). */
    isPanKnob?: boolean,
    /** Whether the knob is diabled. */
    disabled?: boolean,
    /** The color to fill the 'active part' of knob. */
    activeColor?: string,
    /** The color to fill the background of knob. */
    backgroundColor?: string,
    /** A fault-tolerance area for the pan knob in center, by percentage. When value is in tolerance area, 
     * it automatically becomes 'aligned' so that the user will not need to tweak it subtly. */
    stickyArea?: number,
    /** The minimum value of knob. */
    min?: number,
    /** The maximum value of knob. */
    max?: number,
    /** The default value of knob. */
    value?: number
}

const startAngle = 30;

const props = withDefaults(defineProps<KnobProps>(), {
    size: 100,
    isPanKnob: false,
    disabled: false,
    activeColor: '#ccc',
    backgroundColor: '#888',
    stickyArea: 5,
    min: 0,
    max: 100,
});

const knobValue = defineModel<number>();

const id = useSvgId("knobSlot");

const self = ref<HTMLDivElement | null>(null);

let pointerDown = false;
let direction = 1;

const knobValuePercentage = computed({
    get() {
        if (knobValue.value) { return knobValue.value / (props.max! - props.min!) * 100; }
        else { return 0; }
    },
    set(v) {
        if (v < 0 || v > 100) return;
        knobValue.value = v / 100 * (props.max! - props.min!);
    }
});

let endAngle = computed(() => {
    if (props.isPanKnob) {
        /// The upper center will be 0 deg.
        return (360 - startAngle * 2) * (knobValuePercentage.value / 100 - 0.5);
    } else {
        /// The left start will be 0 deg.
        return startAngle + (360 - startAngle * 2) * knobValuePercentage.value / 100;
    }
});

/**
 * @param d for diameter.
 * @param ir for inner circle radius.
 * @param or for outer circle radius.
 * @param sa for start angle.
 */
function createClip(d: number, ir: number, or: number): string {
    const sa = startAngle;
    if (sa <= 0) { throw RangeError("start angle must > 0.") }
    /** iox: inner circle x-offset from center. */
    const iox = ir * Math.sin(sa / 180 * Math.PI);  // sqrt(2)/2.
    /** ioy: inner circle y-offset from center. */
    const ioy = ir * Math.cos(sa / 180 * Math.PI);
    /** oox: outer circle x-offset from center. */
    const oox = or * Math.sin(sa / 180 * Math.PI);
    /** ooy: outer circle y-offset from center. */
    const ooy = or * Math.cos(sa / 180 * Math.PI);
    /** r for radius. */
    const r = d / 2;
    return `M ${r - oox} ${r + ooy} A ${or} ${or} 0 1 1 ${r + oox} ${r + ooy} L ${r + iox} ${r + ioy} A ${ir} ${ir} 0 1 0 ${r - iox} ${r + ioy} Z`;
}

function createActive(d: number): string {
    const r = d / 2;
    const useGreaterArc = endAngle.value > 180 + startAngle ? 1 : 0;
    const sx = r * Math.sin(startAngle / 180 * Math.PI);
    const sy = r * Math.cos(startAngle / 180 * Math.PI);
    const ex = r * Math.sin(endAngle.value / 180 * Math.PI);
    const ey = r * Math.cos(endAngle.value / 180 * Math.PI);

    return `M ${r} ${r} L ${r - sx} ${r + sy} A ${r} ${r} 0 ${useGreaterArc} 1 ${r - ex} ${r + ey} Z`;
}

function createActivePan(d: number): string {
    const r = d / 2;
    const ex = r * Math.sin(endAngle.value / 180 * Math.PI);
    const ey = r * Math.cos(endAngle.value / 180 * Math.PI);
    const useRightSide = endAngle.value > 0 ? 1 : 0;
    return `M ${r} ${r} L ${r} 0 A ${r} ${r} 0 0 ${useRightSide} ${r + ex} ${r - ey} Z`;
}

function setPercentageBasedOnPointerPosition(e: PointerEvent) {
    const position = [e.offsetX, e.offsetY];
    const angle = (Math.atan2(position[1] - props.size! / 2, position[0] - props.size! / 2) / Math.PI * 180 + 270) % 360;
    let percentage = (angle - startAngle) / (360 - 2 * startAngle) * 100;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    if (props.isPanKnob && percentage > 50 - props.stickyArea && percentage < 50 + props.stickyArea) {
        percentage = 50;
    }
    knobValuePercentage.value = percentage;
}

function setPercentageBasedOnPointerDistance(e: PointerEvent) {
    const position = [e.movementX, e.movementY];
    knobValuePercentage.value += (position[0] + position[1] * direction);
}

function onPointerDown(e: PointerEvent) {
    pointerDown = true;
    if (knobValuePercentage.value < 50) {
        direction = -1;
    } else {
        direction = 1;
    }
    setPercentageBasedOnPointerPosition(e);
    self.value?.setPointerCapture(e.pointerId);
    e.stopPropagation();
}

function onPointerMove(e: PointerEvent) {
    if (pointerDown) {
        setPercentageBasedOnPointerDistance(e);
    }
}

function onPointerUp(e: PointerEvent) {
    pointerDown = false;
    self.value?.releasePointerCapture(e.pointerId);
}

function onWheel(e: WheelEvent) {
    knobValuePercentage.value += e.deltaY / 10;
    e.preventDefault();
}

</script>

<template>
    <div class="knob-panel">
        <svg ref="self" class="knob" :viewBox="`0 0 ${size} ${size}`" @pointerdown="onPointerDown"
            @pointermove="onPointerMove" @pointerup="onPointerUp" @wheel="onWheel">
            <clipPath :id="id">
                <path :d="createClip(size, size / 4, size / 2.5)" />
            </clipPath>
            <g :clip-path="`url(#${id})`">
                <rect :width="size" :height="size" :fill="backgroundColor" />
                <g v-if="!disabled">
                    <path v-if="isPanKnob" :d="createActivePan(size)" :fill="activeColor" />
                    <path v-else :d="createActive(size)" :fill="activeColor" />
                </g>
            </g>
        </svg>
    </div>
</template>

<style scoped>
.knob-panel {
    width: v-bind('`${props.size}px`');
    height: v-bind('`${props.size}px`');
}

svg.knob {
    width: v-bind('`${props.size}px`');
}
</style>
