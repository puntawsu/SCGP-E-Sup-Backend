<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol class="d-flex align-center" cols="6" offset-md="0" md="6">
          <div class="Title_custom">Document</div>
        </VCol>

        <VCol class="d-flex align-center addBTN_custom" cols="6" md="6">
          <VBtn color="info" @click="clickAddItem()"> ADD + </VBtn>
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
      <template #item.mediaFile="{ item }">
        <div v-if="item.mediaFile" class="d-flex flex-column ms-3 mt-1 mb-1 pa-1">
       
          <img
            v-if="
              item.mediaFile.file_name.split('.')[
                item.mediaFile.file_name.split('.').length - 1
              ] == 'pdf'
            "
            @click="viewExistingFile(item)"
            :src="'/images/pdf.png'"
            alt="media"
            class="img-fluid"
            style="width: 50px; height: 50px"
          />
          <img
            v-else
            @click="viewExistingFile(item)"
            :src="'/images/image.png'"
            alt="media"
            class="img-fluid"
            style="width: 50px; height: 50px"
          />
          <!-- {{ item.mediaFile?.file_name }} -->
        </div>
      </template>
      
      <!-- Status -->
      <template #item.status="{ item }">
        <VSwitch v-model="item.active" @change="changeStatus({ ...item })" />
      </template>

      <template #item.textDetail="{ item }">
        <div class="d-flex flex-column ms-3">
          <span
            class="d-block font-weight-medium text-truncate text-high-emphasis"
            >TH : {{ item.media_main_title_th }}
          </span>
          <span
            class="text-xs d-block font-weight-medium text-truncate text-high-emphasis"
            >EN : {{ item.media_main_title_en }}
          </span>
        </div>
      </template>

      <!-- Delete -->
      <template #item.actions="{ item }">
        <IconBtn
          @click="
            () => {
              itemSelect = item;
              isEditAddressDialogVisible = !isEditAddressDialogVisible;
            }
          "
        >
          <VIcon icon="tabler-edit" />
        </IconBtn>
        <IconBtn @click="deleteItem(item.id)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>
    </VDataTable>

    <AddEditDocument
      v-model:isDialogVisible="isEditAddressDialogVisible"
      :itemSelect="itemSelect"
    />
  </VCard>
</template>

<script setup>
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { fetchGet, fetchPost } from "/services/fetch.js"; // Import your fetchPost function
// const { data: itemList, error } = await useApi("pages/datatable");
let itemList = ref(null);
let itemSelect = ref(null);
const page = ref(1);
const itemsPerPage = ref(10); // จำนวนรายการต่อหน้า
const res = await fetchGet("/media/get-b-document");
console.log(res);
itemList.value = res.data;

if (itemList.value && itemList.value.length === 0) {
}

for (let i = 0; i < itemList.value.length; i++) {
  itemList.value[i].dateStart = itemList.value[i].media_main_start_date
    ? dayjs(itemList.value[i].media_main_start_date).format("YYYY-MM-DD")
    : "";
  itemList.value[i].dateEnd = itemList.value[i].media_main_end_date
    ? dayjs(itemList.value[i].media_main_end_date).format("YYYY-MM-DD")
    : "";
}

const isEditAddressDialogVisible = ref(false);
const search = ref("");
// headers
const headers = [
  {
    title: "No",
    key: "no",
  },

  {
    title: "Name",
    key: "textDetail",
  },

  {
    title: "Active",
    key: "status",
  },
  {
    title: "File",
    key: "mediaFile",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];

const changeStatus = async (item) => {
  const payload = {
    media_main_id: item.id,
    active: item.active,
  };
  try {
    let response;
    response = await fetchPost("/media/update-media/", payload);

    Swal.fire({
      title: "Update Status Success",
      icon: "success",
    });
  } catch (error) {
    console.error("Error changeStatus:", error);
    Swal.fire("Error", "Failed to upload data.", "error");
  }
};

const clickAddItem = () => {
  itemSelect.value = [];
  setTimeout(() => {
    isEditAddressDialogVisible.value = true;
  }, 500);
};
const viewExistingFile = (item) => {
  console.log("viewExistingFile", item.mediaFile);

  if (item.mediaFile?.path) {
    window.open(item.mediaFile.path, "_blank");
  }
};
const deleteItem = (itemId) => {
  Swal.fire({
    title: "Are you sure you want to delete Item ",

    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        fetchGet("/media/delete-media-id/" + itemId);
        Swal.fire({
          title: "Delete success",
          icon: "success",
        }).then((result) => {
          window.location.reload(); // Refresh the page
        });
      } catch (error) {
        console.error("Error deleteItem:", error);

        Swal.fire("Error", "Failed to upload data.", "error");
      }
    }
  });
};
// if (error.value) console.error(error.value);
</script>
<style lang="scss">
.img-fluid {
  cursor: pointer;
}
</style>
