// Export BiTechEditor để sử dụng với CKEditor từ @ckeditor/ckeditor5-react
import BiTechEditor from "./BiTechEditor";

// Re-export CKEditor để tiện sử dụng
export { CKEditor } from "@ckeditor/ckeditor5-react";

// Export BiTechEditor làm editor chính
export default BiTechEditor;

// Named export để dễ import
export { default as BiTechEditor } from "./BiTechEditor";

// Export configuration helper
// export { createCKEditorConfig } from "./CKEditorConfig";
export type { CKEditorConfig } from "./CKEditorConfig";

// Export plugins
export { default as Base64UploadAdapter } from "./plugins/Base64UploadAdapter";

// Import styles
import "./styles/index.css";
