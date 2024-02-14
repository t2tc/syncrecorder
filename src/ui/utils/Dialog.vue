<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useDragMovable } from '../../use/useDragMovable';

const dialog = ref();
const handle = ref();

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
    resizable: true,
    maximizable: false,
    position: 'center',
    minHeight: 200,
    minWidth: 400,
    modal: false,
});
const emit = defineEmits(['shallClose']);

onMounted(() => {
    dialog.value.style.minHeight = `${props.minHeight}px`;
    dialog.value.style.minWidth = `${props.minWidth}px`;
    dialog.value.style.maxHeight = `${props.maxHeight}px`;
    dialog.value.style.maxWidth = `${props.maxWidth}px`;
})

let disposer: () => void = () => { };

onMounted(() => {
    disposer = useDragMovable(handle.value, dialog.value);
});

onUnmounted(() => {
    disposer();
});

onMounted(() => {
    const position = computed(() => {
        if (props.position == 'center') {
            return {
                x: window.innerWidth / 2 - props.minWidth / 2,
                y: window.innerHeight / 2 - props.minHeight / 2,
            };
        } else {
            return props.position;
        }
    });
    dialog.value.style.left = `${position.value.x}px`;
    dialog.value.style.top = `${position.value.y}px`;
});

watch(() => props.opened, (opened) => {
    if (opened) {
        if (props.modal) {
            dialog.value.showModal();
        } else {
            dialog.value.show();
        }
    } else {
        dialog.value.close();
    }
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
        "absolute",
        "flex-col",
        "rounded-lg",
        //  props.useTitleBar ? "rounded-t-2xl" : '',
        "shadow-below",
        "border",
        "border-slate-300",
        "content"
    ];
});

const resizeRightHandler = ref();
const resizeDownHandler = ref();
const resizeCornerHandler = ref();

onMounted(() => {
    dialog.value.style.height = `${props.minHeight}px`;
    dialog.value.style.width = `${props.minWidth}px`;

    let resizing = false;

    const resize = (e: PointerEvent) => {
        if (resizing) {
            const dialogRect = dialog.value.getBoundingClientRect();
            if (e.target == resizeRightHandler.value) {
                dialog.value.style.width = `${e.clientX - dialogRect.left}px`;
            } else if (e.target == resizeDownHandler.value) {
                console.log("down");
                dialog.value.style.height = `${e.clientY - dialogRect.top}px`;
            } else if (e.target == resizeCornerHandler.value) {
                dialog.value.style.width = `${e.clientX - dialogRect.left}px`;
                dialog.value.style.height = `${e.clientY - dialogRect.top}px`;
            }
        }
    };
    
    const stopResize = () => {
        resizing = false;
    };
    
    resizeDownHandler.value.addEventListener('pointerdown', (e) => {
        resizeDownHandler.value.setPointerCapture(e.pointerId);
        resizing = true;
    });
    resizeCornerHandler.value.addEventListener('pointerdown', (e) => {
        resizeCornerHandler.value.setPointerCapture(e.pointerId);
        resizing = true;
    });
    resizeRightHandler.value.addEventListener('pointerdown', (e) => {
        resizeRightHandler.value.setPointerCapture(e.pointerId);
        resizing = true;
    });

    window.addEventListener('pointermove', resize);
    window.addEventListener('pointerup', stopResize);
    
    onUnmounted(() => {
        window.removeEventListener('pointermove', resize);
        window.removeEventListener('pointerup', stopResize);
    });
});


</script>

<template>
    <Teleport to="body">
        <dialog ref="dialog">
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
                        <div class="resize-indicator">
                            <svg viewBox="0 0 5 5">
                                <line x1="0" y1="5" x2="5" y2="0" stroke="black" stroke-width="0.5" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-if="$props.resizable" class="resize-right-handler" ref="resizeRightHandler"></div>
                <div v-if="$props.resizable" class="resize-down-handler" ref="resizeDownHandler"></div>
                <div v-if="$props.resizable" class="resize-corner-handler" ref="resizeCornerHandler"></div>
            </div>
        </dialog>
    </Teleport>
</template>

<style scoped>
dialog {
    margin: 0;
    background-color: transparent;
}

dialog::backdrop {
    background-color: salmon;
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

.resize-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 5px;
    height: 5px;
    transform: translate(-25%, -25%);
}
</style>