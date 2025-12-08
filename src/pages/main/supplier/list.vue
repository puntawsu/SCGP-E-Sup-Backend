<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol class="d-flex align-center" cols="6" offset-md="0" md="6">
          <div class="Title_custom">Document</div>
        </VCol>

        
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTable
      :headers="headers"
      :items="itemList || []"
      :search="search"
      :items-per-page="itemsPerPage"
      v-model:page="page"
      class="text-no-wrap"
    >
      <template v-slot:item.no="{ index }">
        {{ (page - 1) * itemsPerPage + index + 1 }}
      </template>
      <template #item.company_name="{ item }">
        <div class="d-flex flex-column ms-3">
          <span
            class="d-block font-weight-medium text-truncate text-high-emphasis"
            >{{ item.company_name_th }}</span
          >
          <span class="text-xs detail-usergenerate">
            {{ item.company_name_en }}
          </span>
        </div>
      </template>

      <!-- Delete -->
      <template #item.actions="{ item }">
        <IconBtn
          @click="
            () => {
              itemSelect = item.id;
              isEditAddressDialogVisible = !isEditAddressDialogVisible;
            }
          "
        >
          <VIcon icon="tabler-eye" />
        </IconBtn>
      
      </template>
    </VDataTable>

    <ViewSupplier
      v-model:isDialogVisible="isEditAddressDialogVisible"
      :itemSelect="itemSelect"
    />
  </VCard>
</template>

<script setup>
import { fetchGet } from "/services/fetch.js"; // Import your fetchPost function
// const { data: itemList, error } = await useApi("pages/datatable");
const page = ref(1);
const itemsPerPage = ref(10); // จำนวนรายการต่อหน้า

let itemList = ref(null);
let itemSelect = ref(null);
const res = await fetchGet("/vendor/get-partner-list");
console.log(res);
itemList.value = res.data;




const isEditAddressDialogVisible = ref(false);

// headers
const headers = [
  {
    title: "No",
    key: "no",
  },

  {
    title: "TaxID",
    key: "tax_id",
  },

  {
    title: "Company Name",
    key: "company_name",
  },
  {
    title: "Company Phone",
    key: "company_phone_number",
  },
  {
    title: "Sale Name",
    key: "sales_name",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];







// if (error.value) console.error(error.value);
</script>
