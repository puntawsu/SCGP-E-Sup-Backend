<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />
    <VCard v-if="props.itemSelect" class="pa-sm-10 pa-2">
      <VCardText>
        <!-- 👉 Title -->
        <h4 class="text-h4 text-center mb-2">
          {{ isAddItem ? "Add New" : "Edit" }}
          Document
        </h4>
        <p class="text-body-1 text-center mb-6"></p>
        <!-- {{ itemSelect }} -->
        <!-- <div class="d-flex mb-6">
          <CustomRadiosWithIcon
            v-model:selected-radio="selectedAddress"
            :radio-content="addressTypes"
            :grid-column="{ sm: '6', cols: '12' }"
          />
        </div> -->

        <!-- 👉 Form -->
        <VForm @submit.prevent="onFormSubmit">
          <VRow>
            <VCol cols="12">
              <VCard class="mb-6">
                <VCardItem>
                  <template #title> อัพโหลดไฟล์ PDF หรือ รูปภาพ</template>
                </VCardItem>

                <VCardText>
                  <!-- 👉 First Name -->
                  <VRow>
                    <VCol cols="4" v-if="editform.mediaFile?.path">
                      <VBtn variant="outlined" @click="viewExistingFile">
                        ดูไฟล์ ที่มีอยู่
                      </VBtn>
                    </VCol>

                    <VCol cols="5" class="d-flex align-items-center">
                      <div v-if="!isAddItem">ไฟล์ใหม่</div>
                      <VFileInput
                        v-model="fileWebInput"
                        label="เลือกไฟล์ PDF หรือ รูปภาพ"
                       
                        prepend-icon="mdi-file-pdf-box"
                        @change="onFileSelected"
                      />
                    </VCol>
                    <VCol cols="3">
                      <VBtn
                        v-if="filePreviewUrl"
                        variant="text"
                        @click="previewFile"
                      >
                        ดูไฟล์ ที่เลือก
                      </VBtn>
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="12">
              <VCard class="mb-6">
                <VCardItem>
                  <template #title> Title </template>
                </VCardItem>
                <VCardText>
                  <VRow>
                    <VCol cols="12">
                      <AppTextField
                        v-model="editform.media_main_title_th"
                        label=" TH"
                        placeholder=""
                        type="text"
                      />
                    </VCol>
                    <VCol cols="12">
                      <AppTextField
                        v-model="editform.media_main_title_en"
                        label=" EN"
                        placeholder=""
                        type="text"
                      />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VCol>

            <VCol cols="12" class="text-center">
              <VBtn type="submit" class="me-3"> submit </VBtn>

              <VBtn
                variant="tonal"
                color="secondary"
                @click="$emit('update:isDialogVisible', false)"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
<script setup>
import { useLoadingStore } from "@/stores/loading";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { defineEmits, defineProps, ref, watch } from "vue";
import { fetchFile, fetchPost } from "/services/fetch.js"; // Import your fetchPost function
const loadingStore = useLoadingStore();
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  itemSelect: {
    type: Object,
    required: false,
  },
});

const isAddItem = ref(true);
const fileWebInput = ref(null);
const filePreviewUrl = ref(null);
const fileInput = ref(null);
const emit = defineEmits(["update:isDialogVisible", "submit"]);
const editform = ref({
  id: 0,
  media_main_code: "",
  media_main_title_th: "",
  media_main_title_en: "",
  media_main_detail_th: "",
  media_main_detail_en: "",
  media_main_start_date: "",
  media_main_end_date: "",
  media_type: 3,
  active: true,
  created_by: 1,
  updated_by: null,
  created_date: "",
  updated_date: null,
  menu_id: 3,
  delflag: false,
  mediaFile: null,
  dateStart: "",
  dateEnd: "",
});

watch(
  () => props.itemSelect,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.log("watch itemSelect changed", newVal);
      setEditform(); // เรียก setEditform เมื่อมีการเปลี่ยนแปลง
    }
  }
);
const onFileSelected = () => {
  if (fileWebInput.value) {
    // สร้าง URL ชั่วคราวสำหรับแสดงตัวอย่างไฟล์
    filePreviewUrl.value = URL.createObjectURL(fileWebInput.value);
  }
};

const previewFile = () => {
  if (filePreviewUrl.value) {
    // เปิดไฟล์ในแท็บใหม่
    window.open(filePreviewUrl.value, "_blank");
  }
};
const viewExistingFile = () => {
  console.log("viewExistingFile", editform.value.mediaFile);

  if (editform.value.mediaFile?.path) {
    window.open(editform.value.mediaFile.path, "_blank");
  }
};

const onFormSubmit = async () => {
  loadingStore.show();
  const userData = JSON.parse(Cookies.get("userData"));
  const FilesformData = new FormData();
  console.log(editform.value.id);

  // เตรียม payload สำหรับคำขอ
  const payload = {
    media_main_id: 0,
    media_main_title_th: editform.value.media_main_title_th,
    media_main_title_eng: editform.value.media_main_title_en,
    media_main_start_date: editform.value.media_main_start_date || dayjs(),
    media_main_end_date: editform.value.media_main_end_date || dayjs(),
    media_type: editform.value.media_type,
    created_by: userData.id,
    menu_id: editform.value.menu_id,
    active: editform.value.active,
  };

  if (!isAddItem.value) {
    // หากเป็นการแก้ไข ให้เพิ่ม id ใน payload
    payload.media_main_id = editform.value.id;
  }
  console.log("isAddItem", isAddItem.value);
  console.log("payload", payload);

  // เพิ่มข้อมูลลงใน FormData
  Object.keys(payload).forEach((key) => {
    FilesformData.append(key, payload[key].toString());
  });

  try {
    let response;
    if (isAddItem.value) {
      // ยิงคำขอสำหรับการเพิ่มข้อมูลใหม่
      response = await fetchPost("/media/add-media/", payload);
    } else {
      // ยิงคำขอสำหรับการอัปเดตข้อมูล
      response = await fetchPost("/media/update-media/", payload);
    }

    const mediaId = response?.id;

    // อัปโหลดไฟล์หากมีการเปลี่ยนแปลง

    if (mediaId && fileWebInput.value) {
      await uploadImage(mediaId);
    }

    Swal.fire({
      title: "บันทึกข้อมูลสำเร็จ",
      icon: "success",
    }).then((result) => {
      emit("update:isDialogVisible", false); // Close the dialog

      window.location.reload(); // Refresh the page
    });
  } catch (error) {
    console.error("Error onFormSubmit:", error);
    Swal.fire("เกิดข้อผิดพลาด", "อัปโหลดข้อมูลล้มเหลว.", "error");
  } finally {
    loadingStore.hide();
  }
};

const uploadImage = async (mediaId) => {
  console.log("uploadImage", fileWebInput.value);

  if (fileWebInput.value) {
    const formData = new FormData();
    formData.append("file", fileWebInput.value);

    try {
      await fetchFile(`/attachment/${mediaId}/upload-media-file`, formData);
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("เกิดข้อผิดพลาด", "อัปโหลดไฟล์ล้มเหลว.", "error");
    }
  }
};

const setEditform = () => {
  // เคลียร์ฟอร์มก่อน
  editform.value = {
    id: 0,
    media_main_code: "",
    media_main_title_th: "",
    media_main_title_en: "",
    media_main_detail_th: "",
    media_main_detail_en: "",
    media_main_start_date: "",
    media_main_end_date: "",
    media_type: 3,
    active: true,
    created_by: 1,
    updated_by: null,
    created_date: "",
    updated_date: null,
    menu_id: 3,
    delflag: false,
    mediaFile: null,
    dateStart: "",
    dateEnd: "",
  };

  // ตรวจสอบว่ามี itemSelect และ id จริงหรือไม่
  if (props.itemSelect && props.itemSelect.id) {
    try {
      editform.value = Object.assign({}, props.itemSelect);
      isAddItem.value = !props.itemSelect?.id; // ใช้ !props.itemSelect?.id เป็นการตรวจสอบว่าเป็นการเพิ่มใหม่
    } catch (error) {
      console.error("Error cloning itemSelect:", error);
    }
    isAddItem.value = false; // ถ้าเป็นการแก้ไขข้อมูล
  } else {
    isAddItem.value = true; // ถ้าเป็นการเพิ่มข้อมูลใหม่
  }

  console.log("setEditform", editform.value);
};

const resetForm = () => {
  emit("update:isDialogVisible", false);
  editform.value = {
    id: 0,
    media_main_code: "",
    media_main_title_th: "",
    media_main_title_en: "",
    media_main_detail_th: "",
    media_main_detail_en: "",
    media_main_start_date: "",
    media_main_end_date: "",
    media_type: 2,
    active: true,
    created_by: 1,
    updated_by: null,
    created_date: "",
    updated_date: null,
    menu_id: 2,
    delflag: false,
    mediaFile: null,
    dateStart: "",
    dateEnd: "",
  };
  fileWebInput.value = null;
};
</script>
<style scoped>
.v-selection-control__wrapper {
  transform: scale(1.5); /* ปรับขนาดใหญ่ขึ้น 1.5 เท่า */
}

.large-switch .v-switch__label {
  font-size: 1.5rem; /* ปรับขนาดของ label */
}
</style>
