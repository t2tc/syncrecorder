<script setup lang="ts">
import ToolbarTimecode from './GlobalTimecode.vue'
import Navigator from './Navigator.vue'
import ToolbarPlaybackControls from './PlaybackControls.vue'
import LoudnessMonitor from './LoudnessMonitor.vue';
</script>

<template>
    <div class="flex border-t-neutral-400 border-t h-[40px]">
        <ToolbarTimecode></ToolbarTimecode>
        <ToolbarPlaybackControls class="border-r border-neutral-400"></ToolbarPlaybackControls>
        <Navigator class="border-r border-neutral-400"></Navigator>
        <LoudnessMonitor></LoudnessMonitor>
    </div>
</template>
