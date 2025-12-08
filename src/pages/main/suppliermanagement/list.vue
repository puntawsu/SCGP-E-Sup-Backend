<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol class="d-flex align-center" cols="6" offset-md="0" md="6">
          <div class="Title_custom">Supplier Management</div>
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
        <div class="d-flex flex-column ms-3">
          <img
            :src="item.mediaFileImg?.path || '/images/no-image.png'"
            alt="media"
            class="img-fluid"
            style="width: 100px; height: 100px"
          />
        </div>
      </template>
      <template #item.textDetail="{ item }">
        <div class="d-flex flex-column ms-3">
          <span
            class="d-block font-weight-medium text-truncate text-high-emphasis"
            >{{ item.media_main_title_th }}</span
          >
          <!-- <span
            class="text-xs detail-usergenerate"
            v-html="item.media_main_detail_th"
          ></span> -->
        </div>
      </template>


      <!-- date -->
      <template #item.date="{ item }">
        <div>Start : {{ item.dateStart }}</div>
        <br />
        <div>End :{{ item.dateEnd }}</div>
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
        <IconBtn @click="deleteItem(item.id)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>
    </VDataTable>

    <AddEditSuppliermanagement
      v-model:isDialogVisible="isEditAddressDialogVisible"
      :itemSelect="itemSelect"
    />
  </VCard>
</template>

<script setup>
import AddEditSuppliermanagement from "@/components/main/AddEditSuppliermanagement.vue";
import Swal from "sweetalert2";
import { ref } from "vue";
import { fetchGet, fetchPost } from "/services/fetch.js";

let itemList = ref([]);
let itemSelect = ref(null);
const page = ref(1);
const itemsPerPage = ref(10);
const isEditAddressDialogVisible = ref(false);
const search = ref("");

// Fetch ข้อมูลจาก API
const res = await fetchGet("/media/get-b-suppliermanagement");
itemList.value = res.data.sort((a, b) => a.id - b.id) // เรียง id จากน้อยไปมาก
// กรองเฉพาะ media_type = 4
// itemList = computed(() => {
//   if (!res || !res.data) return [];
//   return res.data
//     .filter((item) => item.media_type === 4)
//     .sort((a, b) => a.id - b.id) // เรียง id จากน้อยไปมาก
//     .map((item) => ({
//       ...item,
//       dateStart: item.media_main_start_date
//         ? dayjs(item.media_main_start_date).format("YYYY-MM-DD")
//         : "",
//       dateEnd: item.media_main_end_date
//         ? dayjs(item.media_main_end_date).format("YYYY-MM-DD")
//         : "",
//     }));
// });

// Header
const headers = [
  { title: "No", key: "no" },
  { title: "Image", key: "mediaFile" },
  { title: "Detail", key: "textDetail" },
  { title: "Status", key: "status", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];

// เปลี่ยนสถานะ
const changeStatus = async (item) => {
  const payload = {
    media_main_id: item.id,
    active: item.active,
  };
  try {
    await fetchPost("/media/update-media/", payload);
    Swal.fire({
      title: "Update Status Success",
      icon: "success",
    });
  } catch (error) {
    console.error("Error changeStatus:", error);
    Swal.fire("Error", "Failed to upload data.", "error");
  }
};

// เพิ่มไอเทมใหม่
const clickAddItem = () => {
  itemSelect.value = [];
  setTimeout(() => {
    isEditAddressDialogVisible.value = true;
  }, 500);
};

// ลบไอเทม
const deleteItem = (itemId) => {
  Swal.fire({
    title: "Are you sure you want to delete",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await fetchGet("/media/delete-media-id/" + itemId);
        Swal.fire({
          title: "Delete success",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error deleteItem:", error);
        Swal.fire("Error", "Failed to delete data.", "error");
      }
    }
  });
};
</script>
