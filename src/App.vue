<!-- src/App.vue -->
<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
  <LoadingOverlay :isLoading="loadingStore.isLoading" />
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
    
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>

<script setup>
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { useLoadingStore } from '@/stores/loading';
import ScrollToTop from '@core/components/ScrollToTop.vue';
import initCore from '@core/initCore';
import {
  initConfigStore,
  useConfigStore,
} from '@core/stores/config';
import { hexToRgb } from '@core/utils/colorConverter';
import { useTheme } from 'vuetify';

const loadingStore = useLoadingStore();
const { global } = useTheme();

// ℹ️ Sync current theme with initial loader theme
initCore();
initConfigStore();

const configStore = useConfigStore();
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-filemanager/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
</style>
