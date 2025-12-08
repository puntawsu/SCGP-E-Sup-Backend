<script setup>
import home from "@images/svg/home.svg";
import office from "@images/svg/office.svg";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { fetchPost } from "/services/fetch.js"; // Import your fetchPost function
import { VForm } from "vuetify/components/VForm";
import { ref } from "vue"; // อย่าลืมนำเข้า ref
import Swal from "sweetalert2";
import { useLoadingStore } from "@/stores/loading";
const loadingStore = useLoadingStore();
const toast = useToast();
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

const refForm = ref(null);
const isPasswordVisible = ref(false);

const fileWebInput = ref(null);
const fileMobileInput = ref(null);
const imagePreview = ref(null);
const emit = defineEmits(["update:isDialogVisible", "submit"]);
let passwordConfirm = ref("");
let editform = ref({
  username: "",
  fullname: "",
  password: "",
  role_id: 0,
});

const basicEditorContent = ref("");
const isAddItem = ref(true);
const onFormSubmit = async () => {
  const validationResult = await refForm.value.validate(); // Await the validation result

  if (!validationResult.valid) {
    toast.error("Form validation failed. Please check your input.", {
      position: "top-right",
      duration: 3000,
    });

    return;
  }

  if (editform.value.password !== passwordConfirm.value) {
    Swal.fire({
      title: "Password does not match",
      icon: "error",
    });

    return;
  }

  loadingStore.show();
  try {
    const res = await fetchPost("/user/add", editform.value);

    loadingStore.hide();
    Swal.fire({
      title: "Add User Success",
      icon: "success",
    }).then((result) => {
      emit("update:isDialogVisible", false); // Close the dialog
      emit("submit"); // Emit the submit event
      window.location.reload(); // Refresh the page
    });
  } catch (error) {
    loadingStore.hide();
    toast.error("User addition failed", {
      position: "top-right",
      duration: 3000,
    });
  } finally {
    loadingStore.hide();
  }
};

console.log(props.itemSelect);
// watch(
//   () => props.itemSelect,
//   () => {
//     console.log("watch", props.itemSelect);

//     setEditform();
//   }
// );
// const setEditform = () => {
//   if (toRaw(props.itemSelect) && props.itemSelect.id) {
//     editform.value = structuredClone(toRaw(props.itemSelect));
//     isAddItem.value = false;
//   } else {
//     editform.value = {};
//     isAddItem.value = true;
//   }
// };
const cancel = () => {
  resetForm();
  emit("update:isDialogVisible", false);
  // editform.value = structuredClone(toRaw(props.itemSelect));
};

const resetForm = () => {
  editform.value = {
    username: "",
    fullname: "",
    password: "",
    role_id: 0,
  };
  passwordConfirm.value = "";
};
</script>

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
          User
        </h4>
        <p class="text-body-1 text-center mb-6"></p>

        <VForm @submit.prevent="onFormSubmit" ref="refForm">
          <VRow>
            <VCol cols="12">
              <AppTextField
                v-model="editform.fullname"
                :rules="[requiredValidator]"
                label="Full Name "
                placeholder=""
                type="text"
                required
              />
            </VCol>
            <VCol cols="12">
              <AppTextField
                v-model="editform.username"
                label="Username"
                placeholder=""
                type="text"
                autocomplete="off"
                :rules="[requiredValidator]"
                required
              />
            </VCol>
            <VCol cols="12">
              <AppTextField
                v-model="editform.password"
                label="Password"
                :rules="[requiredValidator]"
                :type="isPasswordVisible ? 'text' : 'password'"
                autocomplete="new-password"
                :append-inner-icon="
                  isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            <VCol cols="12">
              <AppTextField
                v-model="passwordConfirm"
                label="Confirm Password"
                :rules="[requiredValidator]"
                :type="isPasswordVisible ? 'text' : 'password'"
                autocomplete="new-password"
                :append-inner-icon="
                  isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            <VCol cols="12">
              <AppSelect
                disabled
                v-model="editform.role_id"
                label="Role"
                :items="[
                  { title: 'Client', value: 0 },
                  { title: 'Admin', value: 1 },
                ]"
              />
            </VCol>
            <VCol cols="12" class="text-center">
              <VBtn type="submit" class="me-3"> submit </VBtn>

              <VBtn variant="tonal" color="secondary" @click.native="cancel()">
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
