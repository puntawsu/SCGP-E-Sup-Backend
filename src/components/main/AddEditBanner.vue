<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 2400"
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
          Banner
        </h4>
        <p class="text-body-1 text-center mb-6"></p>

        <!-- 👉 Form -->
        <div>
          <VRow>
            <!-- 👉 First Name -->

            <VCol cols="12" md="6">
              <VCard class="mb-6">
                <VCardItem>
                  <template #title>
                    Image Web Size
                    <VAvatar size="34" color="primary" variant="tonal">
                      <VIcon size="24" color="primary" class="rounded-0">
                        {{ "tabler-device-imac" }}
                      </VIcon>
                    </VAvatar>
                  </template>
                </VCardItem>

                <VCardText>
                  <DropZoneSingle
                    :fileData="[
                      {
                        url: editform.file_web_path,
                        name: editform.file_web_name,
                      },
                    ]"
                    @updatefileData="
                      (file) => {
                        fileWebInput = file;
                      }
                    "
                  />
                  <small> ขนาดที่แนะนำ 1920*720 px หรือ อัตราส่วน 8 : 3</small>
                </VCardText>
              </VCard>
            </VCol>
            <VCol cols="12" md="6">
              <VCard class="mb-6">
                <VCardItem>
                  <template #title>
                    Image Mobile Size
                    <VAvatar size="34" color="primary" variant="tonal">
                      <VIcon size="24" color="primary" class="rounded-0">
                        {{ "tabler-device-mobile" }}
                      </VIcon>
                    </VAvatar>
                  </template>
                </VCardItem>

                <VCardText>
                  <DropZoneSingle
                    :fileData="[
                      {
                        url: editform.file_mobile_path,
                        name: editform.file_mobile_name,
                      },
                    ]"
                    @updatefileData="
                      (file) => {
                        fileMobileInput = file;
                      }
                    "
                  />
                  <small> ขนาดที่แนะนำ 1000*1000 px หรือ อัตราส่วน 1 : 1</small>
                </VCardText>
              </VCard></VCol
            >
            <VCol cols="12">
              <VSwitch label="active" v-model="editform.active" />
            </VCol>
            <VCol cols="12" md="6">
              <AppTextField
                v-model="editform.text_th"
                label="Title TH"
                placeholder=""
                type="text"
              />
            </VCol>
            <VCol cols="12" md="6">
              <AppTextField
                v-model="editform.text_en"
                label="Title EN"
                placeholder=""
                type="text"
              />
            </VCol>
            <VCol cols="12" md="6">
              <div>
                <div class="mb-1 titleDetail">
                  <div class="Title_Detail">Detail TH</div>
                  <v-btn
                    v-if="!isShowdetail_th"
                    size="x-small"
                    style="
                      height: fit-content;
                      padding: 0px 20px;
                      border-radius: 20px;
                    "
                    @click="editformdetail('th')"
                  >
                    edit
                  </v-btn>
                </div>

                <RichtextEditor
                  v-if="isShowdetail_th"
                  v-model="editform.detail_th"
                />
                <div
                  v-else
                  class="viewDetail"
                  v-html="editform.detail_th"
                />
              </div>
            </VCol>
            <VCol cols="12" md="6">
              <div>
                <div class="mb-1 titleDetail">
                  <div class="Title_Detail">Detail EN</div>
                  <v-btn
                    v-if="!isShowdetail_en"
                    size="x-small"
                    style="
                      height: fit-content;
                      padding: 0px 20px;
                      border-radius: 20px;
                    "
                    @click="editformdetail('en')"
                  >
                    edit
                  </v-btn>
                </div>

                <RichtextEditor
                  v-if="isShowdetail_en"
                  v-model="editform.detail_en"
                />
                <div
                  v-else
                  class="viewDetail"
                  v-html="editform.detail_en"
                />
              </div>
            </VCol>

            <VCol cols="12" md="6">
              <AppTextField
                v-model="editform.button_text_th"
                label="Text in Button TH"
                placeholder=""
                type="text"
              />
            </VCol>
            <VCol cols="12" md="6">
              <AppTextField
                v-model="editform.button_text_en"
                label="Text in Button EN"
                placeholder=""
                type="text"
              />
            </VCol>
            <VCol cols="12">
              <AppTextField
                v-model="editform.link_path"
                label="Link Path"
                placeholder=""
                type="text"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" class="submit-zone text-center">
              <div @click="onFormSubmit" class="submit-btn-custom me-3">
                submit
              </div>

              <div
                class="cancel-btn-custom"
                @click="$emit('update:isDialogVisible', false)"
              >
                Cancel
              </div>
            </VCol>
          </VRow>
          <VRow> </VRow>
          <VRow>
            <VCol cols="12">
              <VCard class="pa-sm-10 pa-2">
                <!-- <VBtn color="warning" class="me-3"> Preview </VBtn> -->
                <VRow>
                  <VCol cols="12" class="ImagePosition-zone">
                    <div class="btn-Zone">
                      <div
                        @click="
                          () => {
                            currentLocale = 'th';
                          }
                        "
                        class="ImagePosition-btn-custom me-3"
                        :class="currentLocale == 'th' ? 'active' : ''"
                      >
                        TH
                      </div>

                      <div
                        @click="
                          () => {
                            currentLocale = 'en';
                          }
                        "
                        :class="currentLocale == 'en' ? 'active' : ''"
                        class="ImagePosition-btn-custom me-3"
                      >
                        EN
                      </div>
                    </div>
                  </VCol>
                </VRow>
                <div class="bannerPreviewsZone">
                  <div class="pa-1">
                    <h3 class="mb-5">
                      Web Preview
                      <VAvatar size="34" color="primary" variant="tonal">
                        <VIcon size="24" color="primary" class="rounded-0">
                          {{ "tabler-device-imac" }}
                        </VIcon>
                      </VAvatar>
                    </h3>
                    <div class="bannerPreviews-con">
                      <div style="transform: scale(0.8) translateX(-10rem)">
                        <div class="bannerPreviews">
                          <img
                            class="banner-Img-Zone"
                            v-if="fileWebInput"
                            :src="fileWebInput[0].url"
                          />
                          <img
                            class="banner-Img-Zone"
                            v-else
                            :src="editform.file_web_path"
                          />
                          <div class="banner-Text-Zone">
                            <div class="col banner-Text-Zone-Title">
                              <div class="col Title">
                                <h3>
                                  {{
                                    currentLocale == "th"
                                      ? editform.text_th
                                      : editform.text_en
                                  }}
                                </h3>
                                <div
                                  v-html="
                                    currentLocale == 'th'
                                      ? editform.detail_th
                                      : editform.detail_en
                                  "
                                ></div>
                              </div>
                              <div
                                v-if="editform.link_path"
                                class="col banner-Btn-Zone"
                                disabled
                              >
                                <div class="btn banner-Btn-custom">
                                  <!-- {{ $t("BecomeaPartner") }} -->
                                  {{
                                    currentLocale == "th"
                                      ? editform.button_text_th
                                      : editform.button_text_en ||
                                        $t("BecomeaPartner")
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pa-1">
                    <h3 class="mb-5">
                      Mobile Preview
                      <VAvatar size="34" color="primary" variant="tonal">
                        <VIcon size="24" color="primary" class="rounded-0">
                          {{ "tabler-device-mobile" }}
                        </VIcon>
                      </VAvatar>
                    </h3>
                    <div class="bannerPreviews bannerPreviews_mobile">
                      <img
                        class="banner-Img-Zone"
                        v-if="fileMobileInput"
                        :src="fileMobileInput[0].url"
                      />
                      <img
                        class="banner-Img-Zone"
                        v-else
                        :src="editform.file_mobile_path"
                      />
                      <div class="banner-Text-Zone mobile">
                        <div class="mb-25 col banner-Text-Zone-Title">
                          <div class="mb-25 col Title">
                            <h3>
                              {{
                                currentLocale == "th"
                                  ? editform.text_th
                                  : editform.text_en
                              }}
                            </h3>
                            <div
                              v-html="
                                currentLocale == 'th'
                                  ? editform.detail_th
                                  : editform.detail_en
                              "
                            ></div>
                          </div>
                          <div
                            v-if="editform.link_path"
                            class="mb-25 col banner-Btn-Zone"
                          >
                            <div class="btn banner-Btn-custom">
                              <!-- {{ $t("BecomeaPartner") }} -->
                              {{
                                currentLocale == "th"
                                  ? editform.button_text_th
                                  : editform.button_text_en ||
                                    $t("BecomeaPartner")
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
<script setup>
import { fetchFile, fetchPost } from "/services/fetch.js"; // Import your fetchPost function

import { useLoadingStore } from "@/stores/loading";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
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

const activeTab = ref(0);
const isAddItem = ref(true);
const currentLocale = ref("th");
const fileWebInput = ref(null);
const fileMobileInput = ref(null);
const isShowdetail_th = ref(true);
const isShowdetail_en = ref(false);

const editformdetail = async (k) => {
  if (k == "th") {
    console.log("th");
    isShowdetail_en.value = false;
    isShowdetail_th.value = !isShowdetail_th.value;
  } else {
    console.log("en");

    isShowdetail_th.value = false;
    isShowdetail_en.value = !isShowdetail_en.value;
  }
};
const emit = defineEmits(["update:isDialogVisible", "submit"]);
const editform = ref({
  id: 0,
  link_path: "",
  created_by: 0,
  created_at: "",
  active: true,
  file_web_path: "",
  file_web_name: "",
  file_mobile_path: "",
  file_mobile_name: "",
  text_th: "",
  text_en: "",
  detail_th: "",
  detail_en: "",
  button_text_th: "",
  button_text_en: "",
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
watch(
  () => editform.value.detail_th,
  (newValue) => {
    if (newValue) {
      // document.getElementById("detail_th").innerHTML = newValue;
    }
  }
);
const onFormSubmit = async () => {
  if (isAddItem.value) {
    sentToAdd();
  } else {
    sentToEdit();
  }
};
const sentToAdd = async () => {
  loadingStore.show();
  const userData = JSON.parse(Cookies.get("userData"));
  const FilesformData = new FormData();

  // เตรียม payload และเพิ่มข้อมูลลงใน FormData
  const payload = {
    link: editform.value.link_path || null,
    created_by: userData.id || null,
    text_th: editform.value.text_th || null,
    text_en: editform.value.text_en || null,
    detail_th: editform.value.detail_th || null,
    detail_en: editform.value.detail_en || null,
    button_text_th: editform.value.button_text_th || null,
    button_text_en: editform.value.button_text_en || null,
    id: editform.value.id || 0,
    status: editform.value.active || false,
    // active: true,
  };
  FilesformData.append("id", 0);
  // console.log("payload", payload);

  Object.keys(payload).forEach((key) => {
    if (payload[key]) {
      FilesformData.append(key, payload[key].toString());
    }
  });

  // เพิ่มไฟล์ลงใน FormData
  if (fileWebInput.value) {
    FilesformData.append("file_web", fileWebInput.value[0].file);
  }
  if (fileMobileInput.value) {
    FilesformData.append("file_mobile", fileMobileInput.value[0].file);
  }

  console.log("FilesformData", FilesformData);
  console.log("FilesformData entries:");
  for (let pair of FilesformData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  try {
    await fetchFile("/attachment/upload-homepage-slice/", FilesformData);
    // Handle success
    Swal.fire({
      title: "บันทึกข้อมูลสำเร็จ",
      icon: "success",
    }).then((result) => {
      emit("update:isDialogVisible", false); // Close the dialog

      window.location.reload(); // Refresh the page
    });
  } catch (error) {
    console.error("Error onFormSubmit:", error);
    Swal.fire("Error", "Failed to upload data.", "error");
  } finally {
    loadingStore.hide();
  }
};
const sentToEdit = async () => {
  loadingStore.show();
  const userData = JSON.parse(Cookies.get("userData"));
  const FilesformData = new FormData();
  console.log(editform.value.id);

  // เตรียม payload สำหรับคำขอ
  const payload = {
    link: editform.value.link_path || null,
    created_by: userData.id || null,
    text_th: editform.value.text_th || null,
    text_en: editform.value.text_en || null,
    detail_th: editform.value.detail_th || null,
    detail_en: editform.value.detail_en || null,
    button_text_th: editform.value.button_text_th || null,
    button_text_en: editform.value.button_text_en || null,
    id: editform.value.id || 0,
    // status: editform.value.active || false,
    status: editform.value.active || false,
  };

  try {
    let response;

    // ยิงคำขอสำหรับการอัปเดตข้อมูล
    response = await fetchPost("/media/update-media-slide/", payload);

    const mediaId = response?.id;

    // อัปโหลดไฟล์หากมีการเปลี่ยนแปลง
    console.log(mediaId);

    if (mediaId && fileWebInput.value) {
      console.log(fileWebInput.value);
      await uploadImage(mediaId, 1);
    }
    if (mediaId && fileMobileInput.value) {
      console.log(fileMobileInput.value);
      await uploadImage(mediaId, 2);
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

const uploadImage = async (mediaId, type) => {
  let fileFormsent;

  if (type === 1) {
    fileFormsent = fileWebInput.value[0].file;
  } else {
    fileFormsent = fileMobileInput.value[0].file;
  }
  if (fileFormsent) {
    const formData = new FormData();
    formData.append("file", fileFormsent);

    try {
      await fetchFile(
        `/attachment/${mediaId}/update-file-slice/${type}`,
        formData
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("เกิดข้อผิดพลาด", "อัปโหลดไฟล์ล้มเหลว.", "error");
    }
  }
};
const setEditform = () => {
  // เคลียร์ฟอร์มก่อน
  fileWebInput.value = null;
  fileMobileInput.value = null;

  editform.value = {
    id: 0,
    link_path: "",
    created_by: 0,
    created_at: "",
    active: true,
    file_web_path: "",
    file_web_name: "",
    file_mobile_path: "",
    file_mobile_name: "",
    text_th: "",
    text_en: "",
    detail_th: "",
    detail_en: "",
    button_text_th: "",
    button_text_en: "",
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
  // editform.value = structuredClone(toRaw(props.itemSelect));
};
</script>
