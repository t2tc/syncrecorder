<script setup lang="ts">
const emit = defineEmits(["newTrack"]);
</script>

<template>
    <div class="w-[220px]">
        <button @click="emit('newTrack')" class="flex w-full h-8 cursor-default bg-neutral-700 hover:bg-neutral-600 border-neutral-600 border justify-center items-center gap-1">
            <svg class="w-[12px] fill-neutral-400" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            <p class="text-xs font-semibold text-neutral-400">New Track</p>
        </button>
    </div>
</template>