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
          Supplier Management
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
        <div>
          <VRow>
            <!-- <VCol cols="12">
              <VCard class="mb-6">
                <VCardItem>
                  <template #title> Image </template>
                </VCardItem>

                <VCardText>
                  <VRow>
                    <VCol cols="12">
                      <DropZoneSingle
                        :fileData="[
                          {
                            url: editform.mediaFileImg?.path || '',
                            name: editform.mediaFileImg?.file_name || '',
                          },
                        ]"
                        @updatefileData="
                          (file) => {
                            fileWebInput = file;
                          }
                        "
                      />
                    </VCol>
                    <VCol cols="12">
                      <VSwitch label="active" v-model="editform.active" />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VCol> -->
            <!-- 
            <VIcon @click.native="isShowInputCode = !isShowInputCode">
              {{ isShowInputCode ? "tabler-eye" : "tabler-eye-off" }}
            </VIcon> -->

            <!-- <TiptapEditor
                              v-if="!isShowInputCode"
                              v-model="editform.media_main_detail_en"
                              :id="2"
                              class="border rounded basic-editor"
                            />
                            <textarea
                              v-else
                              v-model="editform.media_main_detail_en"
                              id="code-input"
                              rows="10"
                              cols="50"
                              style="width: -webkit-fill-available"
                            ></textarea> -->
            <VCol cols="12">
              <VCard class="mb-6">
                <VRow>
                  <VCol cols="12">
                    <VCardText>
                      <VRow>
                        <VCol cols="12" md="6">
                          <h3>TH</h3>
                        </VCol>
                        <VCol cols="12" md="6">
                          <h3>EN</h3>
                        </VCol>
                        <VCol cols="12" md="6">
                          <AppTextField
                            v-model="editform.media_main_title_th"
                            label="Title "
                            placeholder="Title TH"
                          />
                        </VCol>
                        <VCol cols="12" md="6">
                          <AppTextField
                            v-model="editform.media_main_title_en"
                            label="Title "
                            placeholder="Title EN"
                          />
                        </VCol>

                        <VCol cols="12" md="6">
                          <div>
                            <div class="mb-1 titleDetail">
                              <div class="Title_Detail">Detail</div>
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
                              v-model="editform.media_main_detail_th"
                            />
                            <div
                              v-else
                              class="viewDetail"
                              v-html="editform.media_main_detail_th"
                            />
                          </div>
                        </VCol>

                        <VCol cols="12" md="6">
                          <div>
                            <div class="mb-1 titleDetail">
                              <div class="Title_Detail">Detail</div>
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
                              v-model="editform.media_main_detail_en"
                            />
                            <div
                              v-else
                              class="viewDetail"
                              v-html="editform.media_main_detail_en"
                            />
                          </div>
                        </VCol>

                        <VCol cols="12" md="6">
                          <AppTextField
                            v-model="editform.media_text_button_th"
                            label="Button Text"
                            placeholder="Button TH"
                          />
                        </VCol>
                        <VCol cols="12" md="6">
                          <AppTextField
                            v-model="editform.media_text_button_en"
                            label="Button Text"
                            placeholder="Button EN"
                          />
                        </VCol>
                        <VCol cols="12">
                          <AppTextField
                            v-model="editform.media_link"
                            label="Button Link"
                            placeholder="Button Link"
                          />
                        </VCol>
                        <VCol cols="12">
                          <p>File PDF</p>
                          <VRow>
                            <VCol cols="2" v-if="editform.mediaFile?.path">
                              <VBtn
                                variant="outlined"
                                @click="viewExistingFile"
                              >
                                ดูไฟล์ ที่มีอยู่
                              </VBtn>
                            </VCol>

                            <VCol cols="7" class="d-flex align-items-center">
                              <div v-if="!isAddItem">ไฟล์ใหม่</div>
                              <VFileInput
                                v-model="filePDFInput"
                                label="เลือกไฟล์ PDF "
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
                        </VCol>
                        <!--             <VCol cols="12" md="6">

                          <v-radio-group
                            label="Image Position"
                            v-model="editform.media_image_position"
                            row
                          >
                            <v-radio label="Left" value="Left"></v-radio>
                            <v-radio label="Right" value="Right"></v-radio>
                            <v-radio label="Center" value="Center"></v-radio>
                          </v-radio-group>
                        </VCol> -->
                        <VCol cols="12" class="ImagePosition-zone">
                          <p>Image Position</p>
                          <div class="btn-Zone">
                            <div
                              @click="
                                () => {
                                  editform.media_image_position = 'Left';
                                }
                              "
                              class="ImagePosition-btn-custom me-3"
                              :class="
                                editform.media_image_position == 'Left'
                                  ? 'active'
                                  : ''
                              "
                            >
                              Left
                            </div>
                            <div
                              @click="
                                () => {
                                  editform.media_image_position = 'Center';
                                }
                              "
                              :class="
                                editform.media_image_position == 'Center'
                                  ? 'active'
                                  : ''
                              "
                              class="ImagePosition-btn-custom me-3"
                            >
                              Center
                            </div>
                            <div
                              @click="
                                () => {
                                  editform.media_image_position = 'Right';
                                }
                              "
                              :class="
                                editform.media_image_position == 'Right'
                                  ? 'active'
                                  : ''
                              "
                              class="ImagePosition-btn-custom me-3"
                            >
                              Right
                            </div>
                          </div>
                        </VCol>
                      </VRow>
                    </VCardText>
                  </VCol>
                </VRow>
              </VCard>
            </VCol>

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
          <VRow>
            <VCol cols="12">
              <VCard class="pa-sm-10 pa-2">
                <VRow>
                  <VCol cols="12">
                    <!-- <VBtn color="warning" class="me-3"> Preview </VBtn> -->
                    <h2 class="text-center">Preview</h2>
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

                    <!-- <v-radio-group
                      class="currentLocale"
                      v-model="currentLocale"
                      colum
                    >
                      <v-radio label="TH" value="th"></v-radio>
                      <v-radio label="EN" value="en"></v-radio>
                    </v-radio-group> -->
                  </VCol>
                </VRow>
                <div class="newPreviewsZone mt-5">
                  <VRow style="justify-content: center">
                    <div class="col-sm-12 mb-5 title">
                      <h3>
                        {{
                          currentLocale == "th"
                            ? editform.media_main_title_th
                            : editform.media_main_title_en
                        }}
                      </h3>
                    </div>
                  </VRow>
                  <VRow
                    class="top-zone mb-5"
                    :class="
                      editform.media_image_position == 'Right'
                        ? 'flex-row-reverse'
                        : 'flex-row'
                    "
                  >
                    <VCol
                      :cols="editform.media_image_position == 'Center' ? 12 : 6"
                      class="right"
                      :class="
                        editform.media_image_position == 'Center'
                          ? 'imgcenter '
                          : ''
                      "
                    >
                      <div class="banner-Zone">
                        <img v-if="fileWebInput" :src="fileWebInput[0].url" />
                        <img v-else :src="editform.mediaFileImg?.path" />
                      </div>
                    </VCol>

                    <VCol
                      :cols="editform.media_image_position == 'Center' ? 12 : 6"
                      :class="
                        editform.media_image_position == 'Center'
                          ? 'Colcenter'
                          : ''
                      "
                      class="left"
                    >
                      <div
                        class="Title custom-shape"
                        v-html="
                          currentLocale == 'th'
                            ? editform.media_main_detail_th
                            : editform.media_main_detail_en
                        "
                      />
                    </VCol>
                  </VRow>
                  <!-- <VRow
                    style="justify-content: center"
                    class="download-pdf"
                    v-if="filePDFInput || editform.mediaFile?.path"
                  >
                    <VCol cols="12" md="4" class="col-12 col-md-4">
                      <a href="#" class="card" target="_bank">
                        <div class="card-body">
                          <VRow
                            style="justify-content: center"
                            class="m-0 mb-2"
                          >
                            <h4 class="card-title">ดาวน์โหลดเอกสาร PDF</h4>
                          </VRow>
                          <VRow class="m-0 download-pdf-btn">
                            <div class="btn--outline-link">
                              {{ $t("Download") }}
                              <svg
                                width="14px"
                                height="14px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                                    stroke="#888"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                                    stroke="#888"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </g>
                              </svg>
                            </div>
                          </VRow>
                        </div>
                      </a>
                    </VCol>
                  </VRow> -->
                  <hr />
                  <VRow style="justify-content: center" class="ma-0">
                    <VCol cols="4"> </VCol>
                    <VCol cols="4"> </VCol>
                    <VCol
                      cols="4"
                      style="
                        display: flex;
                        align-items: flex-end;
                        align-content: flex-end;
                        justify-content: flex-end;
                      "
                    >
                      <div
                        v-if="editform.media_link"
                        class="mb-25 col banner-Btn-Zone"
                      >
                        <div class="btn banner-Btn-custom">
                          {{
                            currentLocale == "th"
                              ? editform.media_text_button_th
                              : editform.media_text_button_en ||
                                $t("BecomeaPartner")
                          }}
                        </div>
                      </div>
                    </VCol>
                  </VRow>
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
import { useLoadingStore } from "@/stores/loading";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { defineEmits, defineProps, ref, watch } from "vue";
import { fetchFile, fetchPost } from "/services/fetch.js"; // Import your fetchPost function
const loadingStore = useLoadingStore();
// const richtexteditor = [Toolbar, Link, Image, HtmlEditor];
// provide("richtexteditor", richtexteditor);
const rteInstance = ref(null);

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

const currentLocale = ref("th");
const isAddItem = ref(true);
const fileWebInput = ref(null);
const filePDFInput = ref(null);
const filePreviewUrl = ref(null);
const isShowInputCode = ref(false);


const editor = ref(null);
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
  media_link: "",
  media_text_button_th: "",
  media_text_button_en: "",
  media_text_position: "",
  media_image_position: "",
  media_type: 4,
  active: true,
  created_by: 1,
  updated_by: null,
  created_date: "",
  updated_date: null,
  menu_id: 2,
  delflag: false,
  mediaFile: null,
  mediaFileImg: null,
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
    media_main_details_th: editform.value.media_main_detail_th,
    media_main_details_eng: editform.value.media_main_detail_en,

    media_link: editform.value.media_link || "",
    media_text_button_th: editform.value.media_text_button_th || "",
    media_text_button_en: editform.value.media_text_button_en || "",
    media_text_position: editform.value.media_text_position || "",
    media_image_position: editform.value.media_image_position || "",

    media_main_start_date:
      editform.value.media_main_start_date || dayjs().format("YYYY-MM-DD"),
    media_main_end_date:
      editform.value.media_main_end_date || dayjs().format("YYYY-MM-DD"),
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
    if (mediaId && filePDFInput.value) {
      await uploadPDF(mediaId);
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
  if (fileWebInput.value) {
    const formData = new FormData();
    formData.append("file", fileWebInput.value[0].file);

    try {
      await fetchFile(`/attachment/${mediaId}/upload-media-image`, formData);
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("เกิดข้อผิดพลาด", "อัปโหลดไฟล์ล้มเหลว.", "error");
    }
  }
};
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
const uploadPDF = async (mediaId) => {
  if (filePDFInput.value) {
    const formData = new FormData();
    formData.append("file", filePDFInput.value);

    try {
      await fetchFile(`/attachment/${mediaId}/upload-media-pdf`, formData);
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("เกิดข้อผิดพลาด", "อัปโหลดไฟล์ล้มเหลว.", "error");
    }
  }
};
const onFileSelected = () => {
  if (filePDFInput.value) {
    // สร้าง URL ชั่วคราวสำหรับแสดงตัวอย่างไฟล์
    filePreviewUrl.value = URL.createObjectURL(filePDFInput.value);
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
    media_link: "",
    media_text_button_th: "",
    media_text_button_en: "",
    media_text_position: "",
    media_image_position: "",
    media_type: 4,
    active: true,
    created_by: 1,
    updated_by: null,
    created_date: "",
    updated_date: null,
    menu_id: 2,
    delflag: false,
    mediaFile: null,
    mediaFileImg: null,
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
</script>
<style scoped>
.v-selection-control__wrapper {
  transform: scale(1.5); /* ปรับขนาดใหญ่ขึ้น 1.5 เท่า */
}

.large-switch .v-switch__label {
  font-size: 1.5rem; /* ปรับขนาดของ label */
}
</style>
