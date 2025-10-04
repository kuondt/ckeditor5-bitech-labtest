// src/BiTechEditor.ts
import {
  ClassicEditor,
  Alignment,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Fullscreen,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  Image,
  ImageBlock,
  ImageInline,
  ImageInsert, // dùng dropdown chèn ảnh (kéo các phương thức có sẵn)
  ImageInsertViaUrl, // enable chèn ảnh qua URL
  ImageToolbar,
  ImageUpload, // nếu muốn upload (bạn có Base64 adapter custom)
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PlainTableOutput,
  SourceEditing,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableToolbar,
  Underline,
} from "ckeditor5";

import Base64UploadAdapter from "./plugins/Base64UploadAdapter";

// dịch tiếng Việt – cách cài đặt mới: import object rồi pass vào config.translations
import vi from "ckeditor5/translations/vi.js";

export default class BiTechEditor extends ClassicEditor {
  public static EditorWatchdog = ClassicEditor.EditorWatchdog;
  public static ContextWatchdog = ClassicEditor.ContextWatchdog;
  public static override get builtinPlugins() {
    return [
      // Essentials
      Essentials,

      // Soạn thảo cơ bản
      Paragraph,
      Heading,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Subscript,
      Superscript,
      Code,
      BlockQuote,
      Highlight,

      // Font
      FontFamily,
      FontSize,
      FontColor,
      FontBackgroundColor,

      // Canh lề & thụt đoạn
      Alignment,
      Indent,
      IndentBlock,

      // Danh sách
      List,

      // Bảng
      Table,
      TableToolbar,
      TableCaption,
      PlainTableOutput,

      // Ảnh
      Image,
      ImageBlock,
      ImageInline,
      AutoImage,
      ImageToolbar,
      ImageInsert, // dropdown “Insert image”
      ImageInsertViaUrl, // cho phép “by URL”
      ImageUpload, // nếu muốn upload (kết hợp Base64UploadAdapter)
      Base64UploadAdapter, // adapter custom

      // Media & link
      Link,
      MediaEmbed,

      // Code block / nguồn
      CodeBlock,
      SourceEditing,

      // Fullscreen
      Fullscreen,

      // Hỗ trợ HTML tự do
      GeneralHtmlSupport,

      // Cloud services (tùy chọn)
      CloudServices,

      // Autosave
      Autosave,
    ];
  }

  public static override get defaultConfig() {
    return {
      licenseKey: "GPL",
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "fullscreen",
          "|",
          "heading",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "alignment",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "subscript",
          "superscript",
          "|",
          "insertImage",
          "link",
          "mediaEmbed",
          "insertTable",
          "blockQuote",
        ],
        shouldNotGroupWhenFull: true,
      },

      // Font
      fontFamily: { supportAllValues: true },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
      },

      // Fullscreen: thêm class khi Enter
      fullscreen: {
        onEnterCallback: (container: HTMLElement) =>
          container.classList.add(
            "editor-container",
            "editor-container_classic-editor",
            "editor-container_include-fullscreen",
            "main-container"
          ),
      },

      // Heading
      heading: {
        options: [
          {
            model: "heading1" as const,
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2" as const,
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3" as const,
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4" as const,
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5" as const,
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6" as const,
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },

      // Cho phép HTML tự do
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            // Thay đổi 'true' (boolean) thành [] (mảng rỗng) hoặc true AS const để khắc phục lỗi kiểu dữ liệu
            styles: true as const, // Sử dụng 'true as const' hoặc []
            attributes: true as const, // Sử dụng 'true as const' hoặc []
            classes: true as const, // Sử dụng 'true as const' hoặc []
          },
        ],
      },

      // Thanh công cụ ảnh — bạn thêm các nút mong muốn
      image: {
        toolbar: [
          "toggleImageCaption",
          "imageTextAlternative",
          "|",
          "imageStyle:inline",
          "imageStyle:block",
          "imageStyle:side",
        ],
      },

      // TIẾNG VIỆT
      language: "vi",
      translations: [vi], // cách mới: truyền object dịch vào config

      // Link
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            // FIX: Thêm 'as const' vào giá trị mode
            mode: "manual" as const,
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      },

      // Placeholder
      placeholder: "Nhập hoặc dán nội dung của bạn vào đây!",

      // Bảng
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
    };
  }
}
