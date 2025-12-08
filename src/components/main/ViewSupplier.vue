<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 1200"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />
    <VCard v-if="props.itemSelect" class=" ">
      <VCardText>
        <!-- 👉 Title -->
        <h4 class="text-h4 text-center mb-2">Supplier</h4>
        <p class="text-body-1 text-center mb-6"></p>
        <!-- {{ itemSelect }} -->
        <!-- <div class="d-flex mb-6">
          <CustomRadiosWithIcon
            
          v-model:sitem.elected-radio="selectedAddress"
            :radio-content="addressTypes"
            :grid-column="{ sm: '6', cols: '12' }"
          />
        </div> -->

        <!-- 👉 Form -->
        <VForm>
          <VRow>
            <VCol cols="12">
              <VCard class="mb-6">
                <VCardText>
                  <div class="ViewSupplier-Title" style="">
                    รายละเอียดคู่ธุรกิจ
                  </div>
                  <VRow class="from-zone row m-0">
                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> ประเทศที่คู่ธุรกิจจดทะเบียน </b>
                      </label>
                      {{ item.partner_type }}
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.partner_type"
                      />
                    </VCol>
                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> เลขประจำตัวผู้เสียภาษีอากร </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.tax_id"
                      />
                    </VCol>
                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> ชื่อบริษัทภาษาไทย </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.company_name_th"
                      />
                    </VCol>
                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> ชื่อบริษัทภาษาอังกฤษ </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.company_name_en"
                      />
                    </VCol>

                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> หมายเลขโทรศัพท์บริษัท </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.company_phone_number"
                      />
                    </VCol>

                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> เว็บไซต์บริษัท </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.company_web_url"
                      />
                    </VCol>
                  </VRow>
                  <hr style="margin: 1.5rem 0;"/>
                  <div class="ViewSupplier-Title" style="">
                    ข้อมูลการติดต่อพนักงานขาย
                  </div>
                  
                  <VRow>
                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> ชื่อ </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.sales_name"
                      />
                    </VCol>
                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> นามสกุล </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.sales_surname"
                      />
                    </VCol>

                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> หมายเลขโทรศัพท์มือถือพนักงานขาย </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.sales_phone_number"
                      />
                    </VCol>

                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> อีเมล </b>
                      </label>
                      <AppTextField
                        type="email"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.sales_email"
                      />
                    </VCol>
                  </VRow>
                  <hr style="margin: 1.5rem 0;"/>
               
                  <div class="ViewSupplier-Title" style="">
                    ข้อมูลสินค้า
                  </div>
                  <VRow class="from-zone row justify-content-between m-0">
                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> ประเภทธุรกิจ </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.product_business_type"
                      />
                    </VCol>

                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> หมวดหมู่ธุรกิจ </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.product_business_category"
                      />
                    </VCol>

                    <VCol cols="6">
                      <label for="validationCustom01" class="form-label">
                        <b> ยี่ห้อสินค้า </b>
                      </label>
                      <AppTextField
                        type="text"
                        class="form-sup-custom"
                        readonly
                        id="validationCustom01"
                        v-model="item.product_brand"
                      />
                    </VCol>
                    <VCol cols="6">
                      <label for="customFileAppTextField" class="form-label">
                        <b> ไฟล์แนบ </b>
                      </label>
                      <div v-if="item.partner_file">
                        <img
                          @click="viewExistingFile()"
                          :src="'/images/pdf.png'"
                          alt="media"
                          class="img-fluid"
                          style="width: 50px; height: 50px"
                        />
                      </div>
                      <div v-else>(ไม่มีไฟล์แนบมา)</div>
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VCol>

            <VCol cols="12" class="text-center">
              <VBtn
                variant="tonal"
                color="primary"
                @click="$emit('update:isDialogVisible', false)"
              >
                close
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
import { defineEmits, defineProps } from "vue";
import { fetchGet } from "/services/fetch.js"; // Import your fetchPost function

const loadingStore = useLoadingStore();
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  itemSelect: {
    type: Number,
    required: false,
  },
});
let item = ref(null);

item.value = {
  partner_type: "",
  tax_id: "",
  company_name_th: "",
  company_name_en: "",
  company_phone_number: "",
  company_web_url: "",
  sales_name: "",
  sales_surname: "",
  sales_phone_number: "",
  sales_email: "",
  product_business_type: "",
  product_business_category: "",
  product_brand: "",
  partner_file: "",
};

const emit = defineEmits(["update:isDialogVisible", "submit"]);
const setEditform = async () => {
  if (props.itemSelect) {
    item.value = await fetchGet(
      `/vendor/get-partner-by-id/${props.itemSelect}`
    );
  }
};

const viewExistingFile = () => {
  console.log("viewExistingFile", item.value.partner_file.path);

  if (item.value.partner_file.path) {
    window.open(item.value.partner_file.path, "_blank");
  }
};

watch(
  () => props.itemSelect,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      console.log("watch itemSelect changed", newVal);
      setEditform(); // เรียก setEditform เมื่อมีการเปลี่ยนแปลง
    }
  }
);
</script>
<style scoped>
.v-selection-control__wrapper {
  transform: scale(1.5); /* ปรับขนาดใหญ่ขึ้น 1.5 เท่า */
}

.large-switch .v-switch__label {
  font-size: 1.5rem; /* ปรับขนาดของ label */
}
.img-fluid {
  cursor: pointer;
}
.form-sup-custom {
  background-color: #fff;
  cursor: pointer;
  :readonly {
    background-color: #fff;
  }
}
</style>
