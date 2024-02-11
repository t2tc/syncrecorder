<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import Tooltip from '../utils/Tooltip.vue';
import IconButton from '../utils/IconButton.vue';

const showTooltip = ref(false);

const toolTipPosition = reactive({ x: 0, y: 0 });

const recordBtn = ref<HTMLButtonElement | null>(null);

onMounted(() => {
    const rect = recordBtn.value?.getBoundingClientRect();
    if (rect) {
        toolTipPosition.x = rect.x + rect.width / 2 + window.scrollX;
        toolTipPosition.y = rect.y + rect.height + window.scrollY;
    };
});

</script>

<template>
    <div class="bg-neutral-300 flex p-1 gap-1 place-items-center">
        <IconButton name="To Start" :onClick="() => { }">
            <svg style="transform: translate(0px, -1px)"
                viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" />
            </svg>
        </IconButton>

        <IconButton name="To End" :onClick="() => { }">
            <svg style="transform: translate(0px, -1px)"
                viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" />
            </svg>
        </IconButton>

        <div ref="recordBtn">
            <IconButton name="Record" :onClick="() => { showTooltip = true }">
                <svg style="transform: translate(0px, 3px) scale(1.1)" class="fill-red-500"
                    viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                </svg>
            </IconButton>
            <Tooltip :position=toolTipPosition :opened=showTooltip @shallClose="() => showTooltip = false">
                No track selected for recording
            </Tooltip>
        </div>

        <IconButton name="Play" :onClick="() => { }">
            <svg style="transform: translate(1px, 1px)"
                viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
        </IconButton>
        <IconButton name="Pause" :onClick="() => { }">
            <svg style="transform: translate(0px, 0px)"
                viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
            </svg>
        </IconButton>
        <IconButton name="Stop" :onClick="() => { }">
            <svg style="transform: translate(0px, 2px)"
                viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
            </svg>
        </IconButton>

    </div>
</template>