<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol class="d-flex align-center" cols="6" offset-md="0" md="6">
          <div class="Title_custom">User</div>
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
      <template #item.actions="{ item }">
        <IconBtn @click="deleteItem(item.id)" v-if="item.role_id != 1">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>
    </VDataTable>

    <AddUser
      v-model:isDialogVisible="isEditAddressDialogVisible"
      :itemSelect="itemSelect"
    />
  </VCard>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import Swal from "sweetalert2";
import { useToast } from "vue-toast-notification";
import { fetchGet } from "/services/fetch.js"; // Import your fetchPost function
const loadingStore = useLoadingStore();
const toast = useToast();
// const { data: itemList, error } = await useApi("pages/datatable");
let itemList = ref(null);
let itemSelect = ref(null);
const page = ref(1);
const itemsPerPage = ref(10); // จำนวนรายการต่อหน้า
let confirmDialog = ref(false);
const payload = {
  status: true,
};
const router = useRouter();
const res = await fetchGet("/user/get");
console.log(res);
itemList.value = res.data;
const isEditAddressDialogVisible = ref(false);
const search = ref("");
const confirmId = ref(0);

// headers
const headers = [
  {
    title: "No",
    key: "no",
  },
  {
    title: "Name",
    key: "fullname",
  },
  {
    title: "Username",
    key: "username",
  },

  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];

const changeStatus = (item) => {
  console.log(item);
};

// ฟังก์ชันที่ใช้เรียก SweetAlert
const showAlert = () => {
  Swal.fire({
    title: "Hello!",
    text: "This is a SweetAlert2 alert in Vue 3 using setup!",
    icon: "success",
    confirmButtonText: "Cool",
  });
};
const clickAddItem = () => {
  itemSelect.value = [];
  setTimeout(() => {
    isEditAddressDialogVisible.value = true;
  }, 500);
};
const deleteItem = (id) => {
  confirmId.value = id;
  const itemconf = itemList.value.find((item) => item.id === id);

  confirmDialog.value = true;

  Swal.fire({
    title: "Are you sure you want to delete this User :" + itemconf.username,

    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      confirmDelete();
    }
  });
};
const confirmDelete = async () => {
  confirmDialog.value = false;
  loadingStore.show();

  try {
    const res = await fetchGet("/user/delete/" + confirmId.value);
    loadingStore.hide();
    // Swal.fire("Delete", "", "success");

    Swal.fire({
      title: "Delete User Success",
      icon: "success",
    }).then((result) => {
      router.go();
    });
  } catch (error) {
    loadingStore.hide();
    toast.error("User Deletetion failed", {
      position: "top-right",
      duration: 3000,
    });
    confirmDialog.value = false;
    console.log(error);
  }
};

// ทำงานบางอย่าง
setTimeout(() => {
  // loadingStore.hide()  // ซ่อน loading เมื่อเสร็จสิ้น
}, 3000);
// if (error.value) console.error(error.value);
</script>
