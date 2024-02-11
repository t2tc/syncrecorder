<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue';

const props = withDefaults(defineProps<{
    name: string,
    color?: string,
    onClick: (m: MouseEvent) => void
}>(), {
    color: "neutral"
});
</script>

<template>
    <div>
        <button :onClick="$props.onClick" :title="$props.name"
            class="flex justify-center hover:bg-slate-200 items-center h-8 w-8 cursor-default">
            <div class="fill-black w-3 h-4">
                <slot></slot>
            </div>
        </button>
    </div>
</template>