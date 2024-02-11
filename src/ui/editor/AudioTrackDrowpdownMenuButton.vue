<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import { DropdownMenu } from '../utils/Menu.vue';
import AudioTrackDrowpdownMenuColorSelector from "./AudioTrackDropdownMenuColorSelector.vue";

const menu = ref<DropdownMenu>(
    {
        label: "Track",
        items: [
            { label: "Toggle Mute", shortcut: "M", onClick: () => console.log("Mute") },
            { label: "Toggle Solo", shortcut: "S", onClick: () => console.log("Solo") },
            { label: "Toggle Recording", shortcut: "R", onClick: () => console.log("Record") },
            { label: "Delete", shortcut: "Delete", onClick: () => { console.log("Delete") } },
        ]
    }
)

const dropdownOpened = ref(false);

const menuPosition = reactive({ x: 0, y: 0 });
const buttonRef = ref<HTMLButtonElement | null>(null);

onMounted(() => {
    const rect = buttonRef.value?.getBoundingClientRect();
    if (rect) {
        menuPosition.x = rect.x + window.scrollX;
        menuPosition.y = rect.y + rect.height + window.scrollY;
    }
})

const props = defineProps<{
    color: string
}>();

const trackColorClass = computed(() => {
    return `bg-${props.color}-800`;
});

const emit = defineEmits<{
    colorSelected: [color: string]
}>();

function changeColor(color: string) {
    emit('colorSelected', color);
}

</script>

<template>
    <button class=" w-6 h-6 flex justify-center items-center cursor-default text-sm hover:bg-cyan-600" :class="trackColorClass"
        :onClick="() => dropdownOpened = true" ref="buttonRef" title="Menu">
        <svg class="w-3 h-3 fill-neutral-300"
            viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
            <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
    </button>
    <DropdownMenu :menu="menu" :opened="dropdownOpened" :position="menuPosition"
        :onShallClose="() => dropdownOpened = false">
        <div class="flex items-center place-content-between h-7 rounded-md cursor-default ml-4 mr-3">
            <AudioTrackDrowpdownMenuColorSelector @color-selected="changeColor"></AudioTrackDrowpdownMenuColorSelector>
        </div>
        </DropdownMenu>
</template>