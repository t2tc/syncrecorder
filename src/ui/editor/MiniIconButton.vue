<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue';

const props = withDefaults(defineProps<{
    name: string,
    color?: string,
    isSelected?: boolean,
    onClick: (m: MouseEvent) => void
}>(), {
    color: "neutral"
});

const selectedClass = computed(() => {
    return props.isSelected ? `bg-${props.color}-600` : "";
});

</script>

<template>
    <div>
        <button :onClick="$props.onClick" :title="$props.name"
            class="flex justify-center items-center h-8 cursor-default" >
            <div class="h-6 w-6 flex justify-center items-center rounded-full hover:bg-neutral-600" :class="selectedClass">
                <div class=" fill-neutral-400 w-3">
                    <slot></slot>
                </div>
            </div>
        </button>
    </div>
</template>