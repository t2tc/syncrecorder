<script setup lang="ts">
import { computed, ref, watch } from 'vue';

type ToggleButtonProps = {
    title: string,
    defaultValue?: boolean,
    color?: string,
    hoverColor?: string,
    selectedColor?: string,
}

const props = withDefaults(defineProps<ToggleButtonProps>(), {
    defaultValue: false,
    color: "#ccc",
    hoverColor: "#0f0",
    selectedColor: "#f00",
});

const emits = defineEmits<{
    (e: 'input', value: boolean): void,
}>();

const selected = ref(props.defaultValue);
watch(selected, () => {
    emits('input', selected.value);
});

const backgroundColor = computed(() => selected.value ? props.selectedColor : props.color);
const hoverColor = computed(() => selected.value ? props.selectedColor : props.hoverColor);
const textColor = computed(() => selected.value ? "#ddd" : "#aaa");
</script>

<template>
    <button class="w-6 h-6 cursor-default text-sm font-semibold" @pointerdown="selected = !selected" :title="title">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    background-color: v-bind(backgroundColor);
    color: v-bind(textColor);
}

button:hover {
    background-color: v-bind(hoverColor);
}

button:active {
    background-color: v-bind(selectedColor);
}
</style>