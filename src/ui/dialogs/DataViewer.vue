<script setup lang="ts">
import { ref } from 'vue';
import Dialog from '../utils/Dialog.vue';
import { Tab, Tabs } from '../utils/Tab.vue';
import DataViewerDataContent from './DataViewerDataContent.vue';
const props = defineProps({ opened: Boolean });
const emit = defineEmits(['shallClose']);

const time = ref("");
setInterval(() => {
    time.value = Date();
}, 1000);

</script>

<template>
    <Dialog :opened="opened" @shall-close="emit('shallClose')" dialog-title="Data Viewer">
        <template #content>
            <Tabs>
                <Tab label="Data">
                    <DataViewerDataContent />
                </Tab>
                <Tab label="Misc Storage">
                    <p> This shall be presented in the second tab.</p>
                </Tab>
                <Tab label="OPFS">
                    <p> This shall be presented in the third tab.</p>
                </Tab>
            </Tabs>
        </template>
    </Dialog>
</template>

