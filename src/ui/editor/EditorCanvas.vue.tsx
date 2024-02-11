import { computed, defineComponent, inject, nextTick, onMounted, onRenderTriggered, onUpdated, ref, watch } from 'vue';
import { Timecode, millisecondsToTimecode, timecodeToString } from '../../timecode';
import { timeRangeKey } from '../../inject';

const parseAsMinute = "00:00";
const parseAsSecond = "00:00:00";
const parseAsHalfSecond = "00:00:00.5";
const parseFull = "00:00:00.000";

const textSize = 11; //px
const transitionTime = 100; //ms

function measureWidth(ctx: CanvasRenderingContext2D, text: string) {
    return ctx.measureText(text).width;
}

function drawWithStep(ctx: CanvasRenderingContext2D, start: Timecode, step: number) {
    const width = ctx.canvas.width;
    const textWidth = measureWidth(ctx, parseFull);
    const minimumGap = textWidth * 2;

    ctx.font = `${textSize}px sans-serif`;
    ctx.fillStyle = "#888";

    for (let i = 0; i < width; i += minimumGap) {
        const time = millisecondsToTimecode(Timecode.toMilliseconds(start) + i * step);
        const text = timecodeToString(time, "full");
        const width = measureWidth(ctx, text);
        ctx.fillText(text, i - (width / 2), textSize + 5);
        ctx.fillRect(i, textSize + 10, 1, 10);
        for (let j = 0; j < 10; j++) {
            let gap = minimumGap / 10;
            ctx.fillRect(i + j * gap, textSize + 15, 1, 6);
        }
        ctx.fillRect(100, 0, 1, 3000);
    }
}

function drawRRectAt(ctx: CanvasRenderingContext2D, row: number, x: number, width: number) {
    const timelineHeight = 36;
    const radius = 4;
    const height = 96;
    const margin = 4;
    ctx.fillStyle = "#668";
    ctx.beginPath();
    ctx.roundRect(x, timelineHeight + row * (height + margin), width, height, radius);
    ctx.closePath();
    ctx.fill();
}

function drawAudioClip() {

}

function createAudioClipEditor() {

}

let ctx: CanvasRenderingContext2D | null | undefined;

function drawItems(ctx: CanvasRenderingContext2D, x: number) {
    drawRRectAt(ctx, 0, x, 100);
    const randomRrect = Math.floor(Math.random() * 10);
    for(let i = 0; i < 10; i++) {
        drawRRectAt(ctx, i, x, randomRrect * 10);
    }
}

let offset = 0;
function animate(time?: DOMHighResTimeStamp) {
    offset++;
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawItems(ctx!, offset);
    requestAnimationFrame(animate);
}


type TimelineProps = {
    size: { height: number, width: number },
}

function render() {

}

function renderTransition() {

}

function wheelHandler() {

}

function clickHandler() {

}

export default defineComponent({
    name: "MiniToolBarTimeline",
    props: {
        size: {
            type: Object as () => TimelineProps["size"],
            required: true
        }
    },
    setup(props, compCtx) {
        const canvasRef = ref<HTMLCanvasElement | null>(null);
        const size = computed(() => props.size);
        onUpdated(() => {
            const canvas = canvasRef.value;

            ctx = canvas?.getContext("2d");
            if (!ctx) return;

            const time = inject(timeRangeKey)!;

            nextTick(() => {
                requestAnimationFrame(animate);
            })
        })

        return () =>
            <canvas ref={canvasRef} height={size.value.height} width={size.value.width} onWheel={wheelHandler} onClick={clickHandler}>
            </canvas>
    },
});