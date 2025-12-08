<template>
 <div id="monaco-editor" style="height: 500px;"></div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {

  props: {
    detail: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editor: null
    };
  },
 mounted() {
   // กำหนด editor หลังจากที่ mounted component เสร็จแล้ว
   this.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
     value: this.detail,  // โค้ดเริ่มต้นใน editor
     language: 'javascript',  // ภาษาที่ต้องการให้ Monaco แสดง syntax highlight
     theme: 'vs-dark',  // ธีมที่ต้องการใช้ (vs-dark, vs-light)
     automaticLayout: true  // ทำให้ layout ของ editor ปรับขนาดอัตโนมัติเมื่อเปลี่ยนแปลงขนาดของหน้าต่าง
   });
 },
 beforeUnmount() {
   // ทำลาย editor เมื่อ component ถูก unmount เพื่อลดการใช้หน่วยความจำ
   if (this.editor) {
     this.editor.dispose();
   }
 },
 watch: {
   detail(newVal) {
     // อัพเดทค่าใน editor เมื่อ prop detail มีการเปลี่ยนแปลง
     console.log(newVal);
     
   }
 }
};

</script>

<style>
/* คุณสามารถเพิ่มการปรับแต่งสไตล์ของ editor ได้ */
#monaco-editor {
 border: 1px solid #ccc;
 border-radius: 4px;
}
</style>
