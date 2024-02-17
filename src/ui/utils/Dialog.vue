<script setup lang="ts">
import { computed, effect, onBeforeMount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue';
import { useDragMovable } from '../../use/useDragMovable';

const dialog = ref<HTMLDivElement>();
const handle = ref<HTMLDivElement>();

const props = withDefaults(defineProps<{
    opened: boolean,
    dialogTitle?: string,
    useTitleBar?: boolean,
    manuallyClosable?: boolean,
    resizable?: boolean,
    maximizable?: boolean,
    position?: 'center' | { x: number, y: number },
    minWidth?: number,
    minHeight?: number,
    maxWidth?: number,
    maxHeight?: number,
    modal?: boolean,
}>(), {
    opened: false,
    dialogTitle: 'Dialog',
    useTitleBar: true,
    manuallyClosable: true,
    resizable: false,
    maximizable: false,
    position: 'center',
    modal: false,
});

const emit = defineEmits(['shallClose']);

onMounted(() => {
    const dialogElement = dialog.value!;
    if(props.minHeight) dialogElement.style.minHeight = `${props.minHeight}px`;
    if(props.minWidth) dialogElement.style.minWidth = `${props.minWidth}px`;
    if(props.maxHeight) dialogElement.style.maxHeight = `${props.maxHeight}px`;
    if(props.maxWidth) dialogElement.style.maxWidth = `${props.maxWidth}px`;
})

let disposer: () => void = () => { };

onMounted(() => {
    disposer = useDragMovable(handle.value!, dialog.value!);
});

onUnmounted(() => {
    disposer();
});

onMounted(() => {
    const position = computed(() => {
        if (props.position == 'center') {
            return {
                x: window.innerWidth / 2 - dialog.value!.clientWidth / 2,
                y: window.innerHeight / 2 - dialog.value!.clientHeight / 2,
            };
        } else {
            return props.position;
        }
    });
    dialog.value!.style.left = `${position.value.x}px`;
    dialog.value!.style.top = `${position.value.y}px`;
});

const titleBarClassList = computed(() => {
    return [
        'flex',
        'pl-2',
        'flex-row',
        'justify-between',
        'items-center',
        'text-xs',
        props.useTitleBar ? '' : 'hidden',
    ];
});

const bodyClassList = computed(() => {
    return [
        'box-border',
        'flex',
        "flex-col",
        "rounded-lg",
        //  props.useTitleBar ? "rounded-t-2xl" : '',
        "shadow-below",
        "border",
        "border-slate-300",
        "bg-slate-100",
    ];
});

const resizeRightHandler = ref();
const resizeDownHandler = ref();
const resizeCornerHandler = ref();

onMounted(() => {
    if (props.resizable) {

        const dialogElement = dialog.value!;
        dialogElement.style.height = `${props.minHeight}px`;
        dialogElement.style.width = `${props.minWidth}px`;

        let resizing = false;

        const resize = (e: PointerEvent) => {
            if (resizing) {
                const dialogRect = dialogElement.getBoundingClientRect();
                if (e.target == resizeRightHandler.value) {
                    dialogElement.style.width = `${e.clientX - dialogRect.left}px`;
                } else if (e.target == resizeDownHandler.value) {
                    dialogElement.style.height = `${e.clientY - dialogRect.top}px`;
                } else if (e.target == resizeCornerHandler.value) {
                    dialogElement.style.width = `${e.clientX - dialogRect.left}px`;
                    dialogElement.style.height = `${e.clientY - dialogRect.top}px`;
                }
            }
        };

        const stopResize = () => {
            resizing = false;
        };

        resizeDownHandler.value.addEventListener('pointerdown', (e: PointerEvent) => {
            resizeDownHandler.value.setPointerCapture(e.pointerId);
            resizing = true;
        });
        resizeCornerHandler.value.addEventListener('pointerdown', (e: PointerEvent) => {
            resizeCornerHandler.value.setPointerCapture(e.pointerId);
            resizing = true;
        });
        resizeRightHandler.value.addEventListener('pointerdown', (e: PointerEvent) => {
            resizeRightHandler.value.setPointerCapture(e.pointerId);
            resizing = true;
        });

        window.addEventListener('pointermove', resize);
        window.addEventListener('pointerup', stopResize);

        onUnmounted(() => {
            window.removeEventListener('pointermove', resize);
            window.removeEventListener('pointerup', stopResize);
        });
    }
});


</script>

<template>
    <Teleport to="body">
        <div class="dialog-body" ref="dialog">
            <div class="grid dialog-container">
                <div :class=bodyClassList>
                    <div :class=titleBarClassList ref="handle">
                        <p class="select-none">{{ dialogTitle }}</p>
                        <div v-if="props.manuallyClosable" class="flex">
                            <button @click="emit('shallClose')"
                                class="m-1.5 p-0.5 select-none cursor-default rounded-full hover:bg-red-200">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="p-2">
                        <slot name="content" />
                    </div>
                </div>
                <div v-if="$props.resizable" class="resize-right-handler" ref="resizeRightHandler"></div>
                <div v-if="$props.resizable" class="resize-down-handler" ref="resizeDownHandler"></div>
                <div v-if="$props.resizable" class="resize-corner-handler" ref="resizeCornerHandler"></div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.dialog-body {
    position: absolute;
}

.dialog-container {
    width: 100%;
    height: 100%;
    grid-template-columns: auto 3px;
    grid-template-rows: auto 3px;
    grid-template-areas:
        "content resize-right"
        "resize-down resize-corner";
}

.resize-right-handler {
    grid-area: resize-right;
    width: 3px;
    cursor: ew-resize;
    transform: translate(-50%, 0);
}

.resize-down-handler {
    grid-area: resize-down;
    height: 3px;
    cursor: ns-resize;
    transform: translate(0, -50%);
}

.resize-corner-handler {
    grid-area: resize-corner;
    width: 3px;
    height: 3px;
    cursor: nwse-resize;
    transform: translate(-100%, -100%) scale(2);
}

.content {
    grid-area: content;
    overflow: hidden;
    position: relative;
    background-color: aliceblue;
}
</style>