<template>
  <FilePond
    ref="pond"
  :files="myFiles"
  :allow-multiple="true"
  :max-files="3"
  :allow-revert="true"
  :allow-replace="true"
  label-idle="ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์"
  :server="serverConfig"

  >
    <!-- ปลั๊กอินเพิ่มเติม -->
    <FilePondPluginImagePreview />
    <FilePondPluginImageResize :resizeTargetWidth="200" :resizeTargetHeight="200" />
  </FilePond>
</template>

<script>
import { ref } from 'vue';
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Import FilePond plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';

// Register the component
const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginImageResize
);

export default {
  name: 'FilePondComponent',
  components: {
    FilePond,
  },
  setup() {
    const myFiles = ref([]);
    const pond = ref(null);

    const serverConfig = {
      process: '/upload', // URL สำหรับอัปโหลดไฟล์
      revert: '/revert',  // URL สำหรับยกเลิกการอัปโหลด
      headers: {
        'X-CSRF-TOKEN': 'TOKEN', // เพิ่ม header ถ้าจำเป็น
      },
    };

    const updateFiles = (fileItems) => {
      myFiles.value = fileItems.map(fileItem => fileItem.file);
    };

    return {
      myFiles,
      pond,
      serverConfig,
      updateFiles,
    };
  },
};
</script>

<style scoped>
/* คุณสามารถเพิ่มสไตล์เพิ่มเติมที่นี่ */
</style>
