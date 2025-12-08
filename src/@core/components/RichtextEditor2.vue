<script setup>
import {
  RichTextEditorComponent as EjsRichtexteditor,
  HtmlEditor,
  Image,
  Link,
  QuickToolbar,
  Table,
  Toolbar,
} from "@syncfusion/ej2-vue-richtexteditor";
import { defineEmits, defineProps, provide, ref, watch } from "vue";
import { fetchFile } from "/services/fetch.js"; // Import your fetchPost function

provide("richtexteditor", [
  Toolbar,
  Link,
  Image,
  HtmlEditor,
  QuickToolbar,
  Table,
]);
const rteInstance2 = ref(null);
onMounted(() => {
  if (rteInstance2.value) {
    console.log("rteInstance2", rteInstance2.value.getHtml());
  } else {
    console.error("rteInstance2 is null!");
  }
});
const props = defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    required: false,
  },
});
const data = ref(null);
const emit = defineEmits(["update:modelValue"]);

const onEditorChange = () => {
  const htmlContent = rteInstance2.value?.getHtml();
  emit("update:modelValue", htmlContent);
};
data.value = props.modelValue;


// ตัวอย่างการใช้ API เพื่ออัปโหลดรูปภาพ
const addImage = async () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // อัปโหลดรูปภาพไปยัง API
        const response = await fetchFile(`/attachment/upload-media`, formData);
        if (response.status !== 200) {
          throw new Error("Failed to upload image");
        }

    
        const imageUrl = response.url; // URL ของรูปภาพจาก API

        // ใช้คำสั่ง image module เพื่อแทรกรูปภาพ
        rteInstance2.value.executeCommand('insertImage', {
          url: imageUrl,
          alt: 'Uploaded Image',
          width: '10px',
          height: '10px'
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // เปิด dialog สำหรับให้ผู้ใช้เลือกไฟล์
  input.click();
};


const handleImageUpload = async (args) => {
  console.log("handleImageUpload",args.file);
  
  const file = args.file[0]; // รับรูปภาพจาก event
  args.cancel = true; // ยกเลิกการอัปโหลดเริ่มต้นของ RichTextEditor

  await uploadImage(file.rawFile); // เรียกฟังก์ชัน uploadImage ของคุณ
};
const imageUploadSettings = {
  saveUrl: "https://apiesup.pappplanner.com/attachment/upload-media", // URL สำหรับการอัปโหลดไฟล์
  path: "https://apiesup.pappplanner.com/public/url/ ", // Path ที่จะใช้แสดงรูปภาพเมื่ออัปโหลดเสร็จ
  allowedTypes: [".jpg", ".jpeg", ".png"], // ประเภทไฟล์ที่อนุญาต
  sizeLimit: 1024000, // ขนาดไฟล์สูงสุด (1MB)
};
watch(
  () => data.value,
  (value) => {
    const htmlContent = value?.getHtml(); // ดึง HTML จาก editor
    emit("update:modelValue", htmlContent); // ส่งค่าไปที่ v-model
  }
);

const toolbarSettings = {
  items: [
    "Bold",
    "Italic",
    "Underline",
    "FontColor",
    "FontSize",
    "JustifyLeft",
    "JustifyCenter",
    "JustifyRight",
    // "JustifyFull",
    "|",
    "CreateTable",
    // "Image",
    {
      tooltipText: 'Upload Image', // ข้อความ tooltip ของปุ่ม
      prefixIcon: 'e-btn-icon e-image e-icons', // กำหนดไอคอนของปุ่ม
      text: '', // ข้อความบนปุ่ม
      id: props.modelValue, // ID สำหรับปุ่ม
    },
    // "|",
    // "Undo",
    // "Redo",
    "SourceCode",
    "FullScreen",
  ],
};
const quickToolbarSettings = {
  // table: [
  //   "TableHeader",
  //   "TableRows",
  //   "TableColumns",
  //   "TableCell",
  //   "-",
  //   "BackgroundColor",
  //   "TableRemove",
  //   "TableCellVerticalAlign",
  //   "Styles",
  // ],
  showOnRightClick: true,
};
// Watch for external changes to the modelValue and update the editor accordingly

// ผูกฟังก์ชันกับปุ่มใน toolbar หลังจาก component ถูก mounted
onMounted(() => {
  const uploadButton = document.getElementById(props.modelValue);
  if (uploadButton) {
    uploadButton.addEventListener('click', addImage); // ผูก event ของปุ่มกับฟังก์ชัน addImage
  }
});
</script>
<script>
import {
  ItemDirective,
  ItemsDirective,
  ToolbarComponent,
} from "@syncfusion/ej2-vue-navigations";
export default defineComponent({
  components: {
    "ejs-toolbar": ToolbarComponent,
    "e-item": ItemDirective,
    "e-items": ItemsDirective,
  },
});
</script>
<template>
  <div class="control-section">
    <div class="sample-container">
      <div class="default-section">
        <ejs-richtexteditor
          id="default"
          ref="rteInstance2"
          :value="modelValue"
          :toolbarSettings="toolbarSettings"
          :imageUploadSettings="imageUploadSettings"
          :quickToolbarSettings="quickToolbarSettings"
          :scrollPositionRestore="true"
          :floatingToolbarOffset="0"
          @beforeImageUpload="handleImageUpload"
          @change="onEditorChange"
        >
        </ejs-richtexteditor>
        

      </div>
    </div>
  </div>
</template>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
</style>
