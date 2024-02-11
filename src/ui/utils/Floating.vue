<script setup lang="ts">
import {ref} from 'vue';

const shallOpen = ref(false);

</script>

<template>
    <div class="floating-trigger">
        <slot name="trigger"></slot>
    </div>
    <Teleport v-if="shallOpen" to="body">
    <div class="floating-component">
    <slot name="component"></slot>
    </div>
    </Teleport>
</template>