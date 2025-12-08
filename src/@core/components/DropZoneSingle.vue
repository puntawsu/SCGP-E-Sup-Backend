<template>
  <div class="flex">
    <div class="w-full h-auto relative">
      <div ref="dropZoneRef" class="cursor-pointer" @click="() => open()">
        <div
          v-if="fileData.length === 0"
          class="d-flex flex-column justify-center align-center gap-y-2 pa-12 drop-zone rounded"
        >
          <IconBtn variant="tonal" class="rounded-sm">
            <VIcon icon="tabler-upload" />
          </IconBtn>
          <h4 class="text-h4">Drag and drop your image here.</h4>
          <span class="text-disabled">or</span>

          <VBtn variant="tonal" size="small"> Browse Images </VBtn>
        </div>

        <div
          v-else
          class="d-flex justify-center align-center gap-3 pa-1 drop-zone flex-wrap"
        >
          <VRow class="match-height w-100">
            <template v-for="(item, index) in fileData" :key="index">
              <VCol cols="12" sm="12">
                <VCard :ripple="false">
                  <VCardText class="d-flex flex-column" @click.stop>
                    <VImg
                      :src="item.url"
                      width="200px"
                      height="150px"
                      class="w-100 mx-auto"
                    />
                    <div class="mt-2">
                      <span class="clamp-text text-wrap">
                        {{ item.file.name }}
                      </span>
                      <span> {{ item.file.size || 0 }} / 1000 KB </span>
                    </div>
                  </VCardText>
                  <VRow class="d-flex justify-center align-center">
                    <VCardActions>
                      <VBtn variant="tonal" size="small"> Browse Images </VBtn>
                    </VCardActions>

                    <VCardActions>
                      <VBtn
                        variant="text"
                        color="error"
                        @click.stop="fileData.splice(index, 1)"
                        
                      >
                        Remove File
                      </VBtn>
                    </VCardActions>
                  </VRow>
                </VCard>
              </VCol>
            </template>
          </VRow>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fileData: {
    type: Array,
    default: () => [],
  },
});

import { useDropZone, useFileDialog, useObjectUrl } from "@vueuse/core";

const dropZoneRef = ref();
const fileData = ref([]);
const emit = defineEmits(["updatefileData"]);

const { open, onChange } = useFileDialog({ accept: "image/*" });

console.log("มีข้อมูล", props.fileData);
if (props.fileData[0].name && props.fileData[0].url) {
  
  fileData.value.push({
    file: new File([], props.fileData[0].name),
    url: props.fileData[0].url,
  });
}
function onDrop(DroppedFiles) {
  if (!DroppedFiles) return;

  const newFiles = [];
  DroppedFiles.forEach((file) => {
    if (file.type.slice(0, 6) !== "image/") {
      alert("ขออภัย, อนุญาตเฉพาะไฟล์รูปภาพเท่านั้น");
      return;
    }
    newFiles.push({
      file,
      url: useObjectUrl(file).value ?? "",
    });
  });

  fileData.value = newFiles; // เปลี่ยนอาเรย์หรือรวมกับไฟล์ที่มีอยู่
  emit("updatefileData", fileData.value); // ส่งออกอาเรย์ที่อัปเดต
}
onChange((selectedFiles) => {
  if (!selectedFiles) return;
  const newFiles = [];
  for (const file of selectedFiles) {
    newFiles.push({
      file,
      url: useObjectUrl(file).value ?? "",
    });
  }
  fileData.value = newFiles; // เปลี่ยนทั้งอาเรย์หากจำเป็น
  emit("updatefileData", fileData.value); // ส่งออกอาเรย์ที่อัปเดต
});
useDropZone(dropZoneRef, onDrop);
</script>

<style lang="scss" scoped>
.drop-zone {
  border: 1px dashed rgba(var(--v-theme-on-surface), var(--v-border-opacity));
}
</style>
