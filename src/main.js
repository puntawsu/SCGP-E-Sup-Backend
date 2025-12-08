import App from "@/App.vue";
import { registerPlugins } from "@core/utils/plugins";
import { createPinia } from "pinia";
import { createApp } from "vue";
// Styles
import "@core/scss/template/index.scss";
import "@styles/styles.scss";
import { ToastPlugin } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import { TooltipComponent, TooltipDirective } from 'vue3-tooltip';
import 'vue3-tooltip/tooltip.css';

import { registerLicense } from '@syncfusion/ej2-base';
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF1cX2hIfEx0R3xbf1x0ZFRGalxTTnNbUj0eQnxTdEFiWH1ccnZVRGVZVEB/Vg==');
// Create vue app
const app = createApp(App);
const pinia = createPinia();

app.directive('tooltip', TooltipDirective)
app.component('tooltip', TooltipComponent)

app.use(Vue3ColorPicker);
registerPlugins(app);
app.use(pinia);

app.use(ToastPlugin, {
    position: "top-right",
    duration: 5000, // Duration in milliseconds
    dismissible: true, // Allows the user to dismiss the toast
    // Add more options as needed
});

// Mount vue app
app.mount("#app");
