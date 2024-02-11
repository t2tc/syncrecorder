<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref } from 'vue';
import { currentTimeKey } from '../../inject';
import { timecodeToString } from '../../timecode';

const shallEnable = ref(false);
const input = ref<HTMLInputElement | null>(null);
const time = inject(currentTimeKey);
const timeStr = computed(() => timecodeToString(time!.value));

onMounted(() => {
    input.value?.addEventListener('dblclick', () => {
        shallEnable.value = true;
        nextTick(() => input.value?.focus());
    });
    input.value?.addEventListener('blur', () => {
        shallEnable.value = false;
    });
    input.value?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            shallEnable.value = false;
            input.value?.blur();
        }
    });
});
</script>

<template>
    <div class="flex justify-center items-center bg-neutral-400 shadow-xl">
        <input name="timecode" autocomplete="off" ref="input" :disabled="!shallEnable" class="timecode w-[220px] font-bold bg-neutral-400 px-3 py-1 text-xl select-none"
            :value="timeStr" pattern="\d{1,2}:\d{1,2}:\d{1,2}.\d{1,3}">
    </div>
</template>

<style scoped>
input:invalid {
    color: red;
}

input:disabled:invalid {
    color: white;
}
</style>
