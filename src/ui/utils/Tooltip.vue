<script setup lang="ts">
import { computed } from 'vue';
import { useClickOutsideHandler } from '../../use/useClickOutsideHandler';

type TooltipProps = {
    position: { x: number, y: number },
    opened: boolean
}

const props = defineProps<TooltipProps>();
const emits = defineEmits(['shallClose']);

const positionStyle = computed(() => { return { left: props.position.x + 'px', top: props.position.y + 'px', transform: `translate(-50%, 0)` } });

useClickOutsideHandler(["tooltip"], () => {
    emits('shallClose');
});

</script>

<template>
    <Teleport to="body">
        <div v-if="props.opened" class="tooltip fixed flex flex-col items-center" :style="positionStyle">
            <div class="flex flex-col items-center">
                <div class="w-3 h-3">
                    <svg viewBox="0 0 12 12">
                        <path d="M6 6 L 12 12 L 0 12 z" fill="white" />
                    </svg>
                </div>
                <div class=" bg-white rounded-lg shadow-below p-4 text-center font-semibold text-xs min-w-60 max-w-100">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>