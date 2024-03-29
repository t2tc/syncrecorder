<script setup lang="ts">
import { computed, reactive, ref, type Ref } from 'vue';
import EditorCanvas from './EditorCanvas.vue';
import TrackHeader from './TrackHeader.vue';
import { useResizeObserver } from '@vueuse/core';
import Timeline from './Timeline.vue';
import MiniToolbar from './MiniToolbar.vue';
import NewTrackButton from './NewTrackButton.vue';
import draggable from "vuedraggable";
import { useDocument, type TrackSettings } from '../../use/document/useDocument';

const editorSize = reactive({ width: 0, height: 0 });

const timelineSize = reactive({ width: 0, height: 80 });

const editorContainer = ref<HTMLDivElement | null>(null);
const headerContainer = ref<HTMLDivElement | null>(null);

window.addEventListener("resize", () => {
    // XXX: This is a hack to make the timeline resize properly. resizeObserver sometimes just triggers resize events looply.
    // TODO(tl): only count on window.resize.
    editorSize.width = window.innerWidth! - 224;
    editorSize.height = window.innerHeight - 80;
    timelineSize.width = editorContainer.value!.clientWidth! - 220;
});

const tracks = useDocument().tracks.value;

const defaultTrack = () => {
    return {
        name: "Track " + (tracks.length + 1), settings: {
            color: "gray", muted: false, solo: false, record: false, volume: 0, pan: 50, soloIsolate: false
        },
        clips: []
    }
}

const newTrack = () => {
    tracks.push(defaultTrack());
}

const shallHideNewTrackButton = computed(() => {
    return tracks.length >= 16;
});

</script>

<template>
    <div id="editorContainer" ref="editorContainer" class="grid h-full" style="grid-template-columns: 220px auto;">
        <div ref="headerContainer">
            <MiniToolbar></MiniToolbar>
            <draggable :list="tracks" handle=".handle" item-key="name">
                <template #item="{ element }">
                    <TrackHeader :track="element"></TrackHeader>
                </template>
            </draggable>
            <NewTrackButton v-if="!shallHideNewTrackButton" @new-track="newTrack"></NewTrackButton>
            <div class="placeholder min-h-[200px]"></div>
        </div>
        <div>
            <Timeline :height="timelineSize.height" :width="timelineSize.width"></Timeline>
            <EditorCanvas :size="{ height: editorSize.height, width: editorSize.width }"></EditorCanvas>
        </div>
    </div>
</template>