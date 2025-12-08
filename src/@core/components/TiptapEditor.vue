<script setup>
import CodeBlock from "@tiptap/extension-code-block";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import ImageResize from "tiptap-extension-image-resize";
import { fetchFile } from "/services/fetch.js"; // Import your fetchPost function
const props = defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    required: false,
  },
  id: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const editorRef = ref();
const showTatle = ref(false);

const fontSize = ref("");
const fontColor = ref("#000000");

const setTextStyle = (style) => {
  editor.value.chain().focus().setMark("textStyle", style).run();
};

// ตัวอย่างการเรียกใช้
const setFontSize = () => {
  setTextStyle({ fontSize: fontSize.value });
};

// const setFontSize = () => {
//   console.log(fontSize.value);

//   editor.value
//     .chain()
//     .focus()
//     .setMark("textStyle", { fontSize: fontSize.value })
//     .run();
// };
const openColorPicker = () => {
  // Trigger input color click\

console.log(document.getElementById("colorInput" + props.id));

  document.getElementById("colorInput" + props.id).click();
};
const setFontColor = () => {
  editor.value.chain().focus().setColor(fontColor.value).run();
};
// const addImage = () => {
//   const url = prompt("Enter image URL");
//   if (url) {
//     editor.value.chain().focus().setImage({ src: url }).run();
//   }
// };
const addImage = async () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  // เมื่อผู้ใช้เลือกไฟล์
  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      try {
        // อัปโหลดไฟล์ไปยัง API
        const formData = new FormData();
        formData.append("file", file);

        // เรียก API (แทนที่ `uploadImageApi` ด้วย API ของคุณ)
        const response = await fetchFile(`/attachment/upload-media`, formData);

        if (response.status !== 200) {
          throw new Error("Failed to upload image");
        }

        const imageUrl = response.url; // สมมติว่า API คืน URL รูปภาพใน result.url

        // แทรกรูปภาพลงใน Tiptap Editor
        editor.value.chain().focus().setImage({ src: imageUrl }).run();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // เปิด dialog ให้ผู้ใช้เลือกไฟล์
  input.click();
};

const addTable = () => {
  editor.value
    .chain()
    .focus()
    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    .run();
};
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Placeholder.configure({
      placeholder: props.placeholder ?? "Write something here...",
    }),
    Underline,
    TextStyle,
    Color,
    CodeBlock, // Add the CodeBlock extension here
    Image, // เพิ่ม Image extension
    Image.configure({
      allowBase64: true,
      inline: true,
      class: "my-custom-class",
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    ImageResize, // เพิ่มส่วนขยาย ImageResize สำหรับลาก ย่อ-ขยาย
  ],
  onUpdate() {
    if (!editor.value) return;
    emit("update:modelValue", editor.value.getHTML());
  },
});

watch(
  () => props.modelValue,
  () => {
    const isSame = editor.value?.getHTML() === props.modelValue;
    if (isSame) return;
    editor.value?.commands.setContent(props.modelValue);
  }
);
</script>

<template>
  <div>
    <div v-if="editor" class="d-flex py-2 px-2 flex-wrap align-center editor">
      <IconBtn
        size="small"
        rounded
        :variant="editor.isActive('bold') ? 'tonal' : 'text'"
        :color="editor.isActive('bold') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <VIcon icon="tabler-bold" />
      </IconBtn>

      <IconBtn
        size="small"
        rounded
        :variant="editor.isActive('underline') ? 'tonal' : 'text'"
        :color="editor.isActive('underline') ? 'primary' : 'default'"
        @click="editor.commands.toggleUnderline()"
      >
        <VIcon icon="tabler-underline" />
      </IconBtn>

      <IconBtn
        size="small"
        rounded
        :variant="editor.isActive('italic') ? 'tonal' : 'text'"
        :color="editor.isActive('italic') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <VIcon icon="tabler-italic" class="font-weight-medium" />
      </IconBtn>

      <IconBtn
        size="small"
        rounded
        :variant="editor.isActive('strike') ? 'tonal' : 'text'"
        :color="editor.isActive('strike') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <VIcon icon="tabler-strikethrough" />
      </IconBtn>

      <IconBtn
        size="small"
        rounded
        :variant="editor.isActive({ textAlign: 'left' }) ? 'tonal' : 'text'"
        :color="editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'"
        @click="editor.chain().focus().setTextAlign('left').run()"
      >
        <VIcon icon="tabler-align-left" />
      </IconBtn>

      <IconBtn
        size="small"
        rounded
        :color="
          editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'
        "
        :variant="editor.isActive({ textAlign: 'center' }) ? 'tonal' : 'text'"
        @click="editor.chain().focus().setTextAlign('center').run()"
      >
        <VIcon icon="tabler-align-center" />
      </IconBtn>

      <IconBtn
        size="small"
        rounded
        :variant="editor.isActive({ textAlign: 'right' }) ? 'tonal' : 'text'"
        :color="editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'"
        @click="editor.chain().focus().setTextAlign('right').run()"
      >
        <VIcon icon="tabler-align-right" />
      </IconBtn>

      <IconBtn
        size="small"
        rounded
        :variant="editor.isActive({ textAlign: 'justify' }) ? 'tonal' : 'text'"
        :color="
          editor.isActive({ textAlign: 'justify' }) ? 'primary' : 'default'
        "
        @click="editor.chain().focus().setTextAlign('justify').run()"
      >
        <VIcon icon="tabler-align-justified" />
      </IconBtn>
      <!-- <IconBtn size="small" rounded>
          <select v-model="fontSize" @change="setFontSize()">
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="30px">30px</option>
          </select>
        </IconBtn> -->
      <input
        type="color"
        v-model="fontColor"
        @change="setFontColor"
        :id="'colorInput' + id"
        style="height: 0; width: 0; opacity: 0"
      />
     
      <div style="display: flex; align-items: center; margin-left: 10px">
        <svg
          v-tooltip="`Font Color`"
          @click="openColorPicker"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              :stroke="fontColor ? fontColor : '#666666'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 19h14M7 15l1.5-3m8.5 3-1.5-3m0 0L12 5l-3.5 7m7 0h-7"
            ></path>
          </g>
        </svg>

        <!-- <small :style="'color :' + fontColor" >
          {{ fontColor }}
        </small> -->
      </div>
      <div class="control-group-tatle">
        <div class="button-group">
          <IconBtn> Size: </IconBtn>
          <IconBtn
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            H1
          </IconBtn>
          <IconBtn
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            H2
          </IconBtn>
          <IconBtn
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          >
            H3
          </IconBtn>
          <IconBtn
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
          >
            H4
          </IconBtn>
          <IconBtn
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
          >
            H5
          </IconBtn>
          <IconBtn
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
          >
            H6
          </IconBtn>

          |
          <IconBtn rounded :color="'primary'" size="small" @click="addImage()">
            <svg
              width="20px"
              height="20px"
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
                  d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15"
                  stroke="#666666"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </IconBtn>
          <!-- Font Color Selector -->
          <IconBtn
            @click="showTatle = !showTatle"
            v-tooltip="`Table Managament`"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="18"
              height="18"
              data="/public/images/svg/table/table-cell-properties-svgrepo-com.svg"
            />
          </IconBtn>
        </div>
      </div>

      <div class="control-group-tatle" v-if="showTatle">
        <div class="button-group">
          <IconBtn
            v-tooltip="`Table Create`"
            @click="
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            "
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-add-svgrepo-com.svg"
            />
          </IconBtn>
          <IconBtn
            v-tooltip="`Delete Table`"
            @click="editor.chain().focus().deleteTable().run()"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-delete-svgrepo-com.svg"
            />
          </IconBtn>
          |
          <IconBtn
            v-tooltip="`Add Column Left`"
            @click="editor.chain().focus().addColumnBefore().run()"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-add-column-left-svgrepo-com.svg"
            />
          </IconBtn>
          <IconBtn
            v-tooltip="`Add Column Right`"
            @click="editor.chain().focus().addColumnAfter().run()"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-add-column-right-svgrepo-com.svg"
            />
          </IconBtn>
          <IconBtn
            v-tooltip="`Delete Column`"
            @click="editor.chain().focus().deleteColumn().run()"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-delete-column-svgrepo-com.svg"
            />
          </IconBtn>
          |
          <IconBtn
            v-tooltip="`Add Row Above`"
            @click="editor.chain().focus().addRowBefore().run()"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-add-row-above-svgrepo-com.svg"
            />
          </IconBtn>
          <IconBtn
            v-tooltip="`Add Row Below`"
            @click="editor.chain().focus().addRowAfter().run()"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-add-row-below-svgrepo-com.svg"
            />
          </IconBtn>
          <IconBtn
            v-tooltip="`Delete Row`"
            @click="editor.chain().focus().deleteRow().run()"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-delete-row-svgrepo-com.svg"
            />
          </IconBtn>

          <IconBtn
            v-tooltip="`Merge Cells`"
            @click="editor.chain().focus().mergeOrSplit().run()"
          >
            <object
              class="svg-table"
              type="image/svg+xml"
              width="24"
              height="24"
              data="/public/images/svg/table/table-cells-merge-svgrepo-com.svg"
            />
          </IconBtn>
        </div>
      </div>
    </div>

    <VDivider />

    <EditorContent ref="editorRef" :editor="editor" />
  </div>
</template>

<style lang="scss">
.ProseMirror {
  padding: 0.5rem;
  min-block-size: 15vh;
  outline: none;
  font-size: inherit; /* ทำให้ฟอนต์ที่ใช้ใน Editor เป็นไปตามการกำหนด */
  p {
    margin-block-end: 0;
  }

  p.is-editor-empty:first-child::before {
    block-size: 0;
    color: #adb5bd;
    content: attr(data-placeholder);
    float: inline-start;
    pointer-events: none;
  }
  // เพิ่มการรองรับฟอนต์ไซส์
  [style*="font-size"] {
    font-size: inherit !important;
  }
  input[type="color"] {
    -webkit-appearance: none;
    border: none;
    width: 32px;
    height: 32px;
    margin: 0.4rem;
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}

.tiptap {
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid #adadad;
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: #f0f0f0;
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: #7267f022;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: var(--purple);
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }
}
.svg-table {
  pointer-events: none;
}
</style>
