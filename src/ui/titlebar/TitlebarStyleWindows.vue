/// todo(tnl): add window-control-overlay experience, etc.

<script setup lang="ts">
import { MenuBar } from '../utils/Menu.vue.tsx';
import TitleSearchBar from './SearchInput.vue';
defineProps<{menus: MenuBar}>();
</script>

<template>
    <div aria-hidden class="grid bg-neutral-300 h-[40px]"
        style="grid-template-columns: 150px auto 150px; app-region: drag; -webkit-app-region: drag;">
        <MenuBar :menus=menus></MenuBar>
        <TitleSearchBar></TitleSearchBar>
    </div>
</template>