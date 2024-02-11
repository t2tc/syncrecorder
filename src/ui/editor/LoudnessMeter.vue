<script setup lang="ts">
import { useParentElement } from '@vueuse/core';
import { onMounted, ref } from 'vue';

const db = ref(0);
let ctx: CanvasRenderingContext2D | null | undefined;
const meter = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const parent = meter.value?.parentElement;
    if (parent) {
        meter.value!.height = parent.offsetHeight;
    }
    ctx = meter.value?.getContext('2d');
    if (ctx) {
        window.requestAnimationFrame(renderTest);
    }
});

function renderTest(time: DOMHighResTimeStamp) {
    if (ctx) {
        const times = (time * 0.1) / ctx.canvas.height;
        const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
        ctx.fillStyle = colors[Math.floor(times) % colors.length];
        ctx.fillRect(0, 0, 10, (time * 0.1) % ctx.canvas.height);
    }
    requestAnimationFrame(renderTest);
}

</script>

<template>
    <canvas ref="meter" width="5" height="0"></canvas>
</template>

<style scoped>
</style>