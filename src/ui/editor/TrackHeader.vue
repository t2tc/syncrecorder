<script setup lang="ts">
import Knob from '../utils/Knob.vue';
import ToggleButton from '../utils/ToggleButton.vue';
import LoudnessMeter from './LoudnessMeter.vue';
import AudioTrackDrowpdownMenuButton from './AudioTrackDrowpdownMenuButton.vue';

import { computed, ref } from 'vue';
import type { TrackContent, TrackSettings } from '../../use/document/useDocument';

const props = defineProps<{
    id?: number
    track: TrackContent
}>();

const trackColor = ref(props.track.settings.color);

const trackColorClass = computed(() => {
    return `bg-${trackColor.value}-700`;
});
const buttonColorClass = computed(() => {
    return `bg-${trackColor.value}-800`;
});

const emit = defineEmits({
    'colorSelected': (color: string) => true,
    'titleChanged': (title: string) => true,
    'mute': (muted: boolean) => true,
    'solo': (soloed: boolean) => true,
    'record': (recorded: boolean) => true,
    'pan': (pan: number) => true,
    'volume': (volume: number) => true,
})

</script>

<template>
    <div class="min-w-[216px] bg-neutral-900 border-neutral-700 m-1">
        <div class="flex h-full flex-row-reverse">
            <div class="bg-gray-700">
                <LoudnessMeter></LoudnessMeter>
            </div>
            <div class="w-full">
                <div class="handle flex h-6 items-center place-content-between" :class="trackColorClass">
                    <input class="pl-3 text-sm text-neutral-300 bg-transparent" disabled :value="track.name">
                    <AudioTrackDrowpdownMenuButton :color="trackColor" @color-selected="(color) => trackColor = color"></AudioTrackDrowpdownMenuButton>
                </div>
                <div class="flex flex-row-reverse place-content-between">
                    <div class="flex flex-col place-content-between">
                        <ToggleButton title="Mute"   color="#444" hover-color="#606980" selected-color="#6681c7" @value-changed="">M</ToggleButton>
                        <ToggleButton title="Solo"   color="#444" hover-color="#807e60" selected-color="#7c7547" @value-changed="">S</ToggleButton>
                        <ToggleButton title="Record" color="#444" hover-color="#806060" selected-color="#e91d1d" @value-changed="">R</ToggleButton>
                    </div>
                    <div class="flex flex-row m-3 gap-3">
                        <div class="flex flex-col items-center">
                            <Knob :size=30 :is-pan-knob=true :default-value=50 @value-changed=""></Knob>
                            <span class="text-xs select-none text-neutral-400">Pan</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <Knob :size=30 :default-value=80 @value-changed=""></Knob>
                            <span class="text-xs select-none text-neutral-400">Volume</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
