<script lang="ts">
let isFullscreen = false;

function toggleFullscreen() {
  if (!isFullscreen) {
    document.body.requestFullscreen();
    isFullscreen = true;
  } else {
    document.exitFullscreen();
    isFullscreen = false;
  }
}

</script>

<script setup lang="ts">
import { ref, type Ref, provide, defineAsyncComponent, computed, onMounted } from 'vue';
import { MenuBar } from './utils/Menu.vue.tsx';
import Editor from './editor/Editor.vue';
import TitlebarStyleWindows from './titlebar/TitlebarStyleWindows.vue';
import Toolbar from './toolbar/Toolbar.vue';
import StatusBar from './utils/StatusBar.vue';
import { currentTimeKey, timeRangeKey } from '../inject';
import { Timecode } from '../timecode';
import { useEventListener } from '@vueuse/core';

import About from './dialogs/About.vue';

import { useStatusBar } from '../use/useStatusBar';
import DataViewer from './dialogs/DataViewer.vue';

const aboutOpened = ref(false);
const dataViewerOpened = ref(false);

const menuItems: Ref<MenuBar> = ref([
  {
    label: "File",
    items: [
      {
        label: "New", onClick: () => {
          const [_, set] = useStatusBar();
          console.log("New"), set("Create a new project.")
        }
      },
      { label: "Open", onClick: () => console.log("Open") },
      { label: "Save", onClick: () => console.log("Save") },
      { label: "Save As", onClick: () => console.log("Save As") },
      { label: "Trigger a Dialog...", onClick: () => console.log("Exit") },
      {
        label: "Simple Submenu", items: [
          { label: "Exit", onClick: () => console.log("Exit") },
          {
            label: "Nested Submenu", items: [
              { label: "Even More Exit", onClick: () => console.log("Exit") }
            ]
          }
        ]
      }
    ]
  },
  { label: "Edit", items: [{ label: "Undo", onClick: () => console.log("Undo") }] },
  { label: "View", items: [{ label: "Toggle Fullscreen", onClick: toggleFullscreen }] },
  {
    label: "Help", items: [{
      label: "About", onClick: () => {
        aboutOpened.value = true;
      }
    }]
  },
  {
    label: "Developer", items: [
      {
        label: "Show Document Status", onClick: () => {
          dataViewerOpened.value = true;
        }
      },
    ]
  }
]);

const baseTimeRange = ref({ leftmost: new Timecode(0, 0, 1, 15), step: 10 });
const editorXOffset = ref(0);
const currentTime = ref(new Timecode(0, 0, 5, 0));
const currentCursor = ref(new Timecode(0, 0, 5, 0));

provide(timeRangeKey, baseTimeRange);
provide(currentTimeKey, currentTime);

onMounted(() => {
  useEventListener(window, 'contextmenu', (e) => {
    if (!((e.target as Element).tagName === 'INPUT')) {
      e.preventDefault();
    }
  })
})

onMounted(() => {
  useEventListener(window, 'keydown', (e) => {
    if (e.key === 'Escape') {
      aboutOpened.value = false;
      dataViewerOpened.value = false;
    }
  })
})

onMounted(() => {
    dataViewerOpened.value = true;
})


</script>

<template>
  <div class="w-full h-full" style="overflow-x: hidden;">
    <div class="sticky w-full top-0 left-0">
      <TitlebarStyleWindows :menus="menuItems"></TitlebarStyleWindows>
      <Toolbar></Toolbar>
  </div>
  <Editor></Editor>
  <StatusBar></StatusBar>
  <About :opened="aboutOpened" :onShallClose="() => {aboutOpened = false}"></About>
  <DataViewer :opened="dataViewerOpened" :onShallClose="() => {dataViewerOpened = false}"></DataViewer>
</div></template>