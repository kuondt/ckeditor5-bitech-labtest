import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  Link,
  Image,
  ImageUpload,
  Table,
  TableToolbar,
  Base64UploadAdapter,
  SelectAll
} from 'ckeditor5';

export const createBasicConfig = () => {
  return {
    licenseKey: "GPL",
    plugins: [
      Essentials,
      Paragraph,
      Bold,
      Italic,
      Heading,
      Link,
      Image,
      ImageUpload,
      Table,
      TableToolbar,
      Base64UploadAdapter,
      SelectAll
    ],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        'imageUpload',
        'insertTable',
        '|',
        'undo',
        'redo'
      ],
      shouldNotGroupWhenFull: true
    },
    image: {
      toolbar: []
    },
    placeholder: 'Nhập nội dung của bạn vào đây!',
    language: 'vi'
  };
};
