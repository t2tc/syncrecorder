
<script setup lang="ts">
import { useStatusBar } from "../../use/useStatusBar"
const [get, _] = useStatusBar();

</script>

<template>
    <Teleport to="body">
        <div class="flex items-center pl-2 fixed bottom-0 left-0 right-0 h-6 bg-neutral-300">
            <p class="text-xs text-neutral-700 select-none">{{get()}}</p>
        </div>
    </Teleport>
</template>
