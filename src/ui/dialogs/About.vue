<script setup lang="ts">
import Dialog from '../utils/Dialog.vue';
const props = defineProps({ opened: Boolean });
const emit = defineEmits(['shallClose']);
</script>

<template>
    <div v-if="opened">
        <Dialog :opened="props.opened" dialog-title="About" @shall-close="emit('shallClose')">
            <template #content>
                <div class="text-sm p-5">
                    <p> SyncRecorder 0.1 Alpha.</p>
                    <p> (C) Tung Leen. All rights reserved. </p>
                </div>
            </template>
        </Dialog>
    </div>
</template>