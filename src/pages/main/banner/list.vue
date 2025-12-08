<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol class="d-flex align-center" cols="6" offset-md="0" md="6">
          <div class="Title_custom">Banner</div>
        </VCol>
        <VCol class="d-flex align-center addBTN_custom" cols="6" md="6">
          <VBtn color="info" @click="clickAddBanner()"> ADD + </VBtn>
        </VCol>
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTable
      :headers="headers"
      :items="bannerList || []"
      :search="search"
      :items-per-page="10"
      class="text-no-wrap"
    >
      <template #item.fileweb="{ item }">
        <div class="d-flex align-center">
          <div>
            <VImg :src="item.file_web_path" height="100" width="140" />
          </div>
        </div>
      </template>
      <template #item.filemobile="{ item }">
        <div class="d-flex align-center">
          <div>
            <VImg :src="item.file_mobile_path" height="100" width="140" />
          </div>
        </div>
      </template>

      <template #item.textDetail="{ item }">
        <div class="d-flex flex-column ms-3">
          <span
            class="d-block font-weight-medium text-truncate text-high-emphasis"
            >{{ item.text_th }}</span
          >
          <span
            class="text-xs detail-usergenerate"
            v-html="item.detail_th"
          ></span>
        </div>
      </template>

      <!-- Status -->
      <template #item.status="{ item }">
        <VSwitch v-model="item.active" @change="changeStatus({ ...item })" />
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
        <IconBtn @click.native="deleteItem(item.id)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>
    </VDataTable>

    <AddEditBanner
      v-model:isDialogVisible="isEditAddressDialogVisible"
      :itemSelect="itemSelect"
    />
  </VCard>
</template>
<script>
import Swal from "sweetalert2";
import { fetchGet, fetchPost } from "/services/fetch.js"; // Import your fetchPost function
</script>
<script setup>
// const { data: bannerList, error } = await useApi("pages/datatable");
let bannerList = ref(null);
let itemSelect = ref(null);
const res = await fetchGet("/media/get-b-banner");
console.log(res);
bannerList.value = res.data;
const isEditAddressDialogVisible = ref(false);
const search = ref("");

// headers
const headers = [
  {
    title: "IMAGE",
    key: "fileweb",
  },
  {
    title: "MOBILE IMAGE",
    key: "filemobile",
  },
  {
    title: "Detail",
    key: "textDetail",
  },

  {
    title: "STATUS",
    key: "status",
    sortable: false,
  },
  {
    title: "DELETE",
    key: "actions",
    sortable: false,
  },
];

// const changeStatus = (item) => {
//   console.log(item);

//   fetchPost("/media/update-media-slide/", {
//     id: item.id,
//     active: item.active,
//   });
// };

const changeStatus = async (item) => {
  const pl = {
    id: item.id,
    status: item.active,
  };
  try {
    let response;
    response = await fetchPost("/media/update-media-slide/", pl);
    console.log(item);
    Swal.fire({
      title: "Update Status Success",
      icon: "success",
    });
  } catch (error) {
    console.error("Error changeStatus:", error);
    Swal.fire("Error", "Failed to upload data.", "error");
  }
};

const deleteItem = (itemId) => {
  Swal.fire({
    title: "Are you sure you want to delete Banner",

    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        fetchGet("/media/delete-banner-id/" + itemId);

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

const clickAddBanner = () => {
  itemSelect.value = [];
  isEditAddressDialogVisible.value = !isEditAddressDialogVisible.value;

};

// if (error.value) console.error(error.value);
</script>
