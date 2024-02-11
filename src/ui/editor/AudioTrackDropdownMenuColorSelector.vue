<script setup lang="ts">
const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "violet",
    "gray"
] as const;

const emit = defineEmits<{
    colorSelected: [color: typeof colors[number]]
}>();

</script>

<template>
    <button @pointerdown="emit('colorSelected', 'red')" class="w-3.5 h-3.5 rounded-full hover:bg-red-300 bg-red-600 cursor-default"></button>
    <button @pointerdown="emit('colorSelected', 'orange')" class="w-3.5 h-3.5 rounded-full hover:bg-orange-300 bg-orange-600 cursor-default"></button>
    <button @pointerdown="emit('colorSelected', 'yellow')" class="w-3.5 h-3.5 rounded-full hover:bg-yellow-300 bg-yellow-600 cursor-default"></button>
    <button @pointerdown="emit('colorSelected', 'green')" class="w-3.5 h-3.5 rounded-full hover:bg-green-300 bg-green-600 cursor-default"></button>
    <button @pointerdown="emit('colorSelected', 'cyan')" class="w-3.5 h-3.5 rounded-full hover:bg-cyan-300 bg-cyan-600 cursor-default"></button>
    <button @pointerdown="emit('colorSelected', 'blue')" class="w-3.5 h-3.5 rounded-full hover:bg-blue-300 bg-blue-600 cursor-default"></button>
    <button @pointerdown="emit('colorSelected', 'violet')" class="w-3.5 h-3.5 rounded-full hover:bg-violet-300 bg-violet-600 cursor-default"></button>
    <button @pointerdown="emit('colorSelected', 'gray')" class="w-3.5 h-3.5 rounded-full hover:bg-gray-300 bg-gray-400 cursor-default"></button>
</template>