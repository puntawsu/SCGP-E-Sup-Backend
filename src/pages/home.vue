<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol class="d-flex align-center" cols="6" offset-md="0" md="6">
          <div class="Title_custom">Welcome</div>
        </VCol>
        <VCol cols="6" offset-md="2" md="4"> </VCol>
        <VCol
          class="d-flex align-center addBTN_custom"
          cols="12"
          offset-md="9"
          md="3"
        >
          
        </VCol>
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
   
  </VCard>
</template>
<script>
import { fetchGet } from "/services/fetch.js"; // Import your fetchPost function
</script>
<script setup>
// const { data: bannerList, error } = await useApi("pages/datatable");
let bannerList = ref(null);
let bannerSelect = ref(null);
const res = await fetchGet("/media/get-homepage-slide");
console.log(res);
bannerList.value = res;
const isEditAddressDialogVisible = ref(false);
const search = ref("");


// if (error.value) console.error(error.value);
</script>
