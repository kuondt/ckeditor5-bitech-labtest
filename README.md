# CKEditor 5 BiTech LabTest

CKEditor 5 build với tích hợp Base64 upload và MathLive cho ứng dụng BiTech LabTest.

## Tính năng

- ✅ **CKEditor 5** - Trình soạn thảo văn bản phong phú mạnh mẽ
- ✅ **Base64 Image Upload** - Upload hình ảnh tự động chuyển thành Base64
- ✅ **MathLive Integration** - Hỗ trợ chỉnh sửa công thức toán học
- ✅ **Vietnamese Language** - Giao diện và bản dịch tiếng Việt
- ✅ **Fullscreen Mode** - Chế độ toàn màn hình cho trải nghiệm chỉnh sửa tốt hơn
- ✅ **Source Editing** - Chỉnh sửa mã HTML trực tiếp
- ✅ **TypeScript Support** - Plugin được viết bằng TypeScript

## Cài đặt

```bash
npm install ckeditor5-bitech-labtest
```

## Sử dụng

### Cách sử dụng cơ bản

```tsx
import React from 'react';
import { BiTechCKEditor } from 'ckeditor5-bitech-labtest';
import 'ckeditor5-bitech-labtest/dist/styles/mathlive.css';

function MyEditor() {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    console.log('Content changed:', data);
  };

  return (
    <BiTechCKEditor
      initialData="<p>Nhập nội dung của bạn...</p>"
      onChange={handleChange}
      placeholder="Nhập nội dung của bạn vào đây..."
    />
  );
}
```

### Sử dụng với license key

```tsx
import React from 'react';
import { BiTechCKEditor } from 'ckeditor5-bitech-labtest';

function MyEditor() {
  const LICENSE_KEY = 'your-license-key-here';

  return (
    <Bi TechCKEditor
      licenseKey={LICENSE_KEY}
      onChange={(event, editor) => {
        console.log(editor.getData());
      }}
    />
  );
}
```

### Cấu hình tùy chỉnh

```tsx
import React from 'react';
import { BiTechCKEditor, createCKEditorConfig } from 'ckeditor5-bitech-labtest';

function MyCustomEditor() {
  const customConfig = createCKEditorConfig();
  
  // Tùy chỉnh toolbar
  customConfig.toolbar = {
    items: [
      'undo', 'redo', '|',
      'heading', '|',
      'bold', 'italic', '|',
      'mathLive', 'imageUpload'
    ]
  };

  return (
    <BiTechCKEditor
      customConfig={customConfig}
      onChange={(event, editor) => {
        console.log(editor.getData());
      }}
    />
  );
}
```

## API Reference

### BiTechCKEditor Props

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `initialData` | `string` | `''` | Nội dung ban đầu của editor |
| `placeholder` | `string` | `'Nhập hoặc dán nội dung của bạn vào đây!'` | Placeholder text |
| `licenseKey` | `string` | `undefined` | License key cho CKEditor 5 |
| `onChange` | `(event, editor) => void` | `undefined` | Callback khi nội dung thay đổi |
| `onFocus` | `(event, editor) => void` | `undefined` | Callback khi editor được focus |
| `onBlur` | `(event, editor) => void` | `undefined` | Callback khi editor mất focus |
| `onReady` | `(editor) => void` | `undefined` | Callback khi editor sẵn sàng |
| `disabled` | `boolean` | `false` | Vô hiệu hóa editor |
| `className` | `string` | `''` | CSS class tùy chỉnh |
| `customConfig` | `Partial<CKEditorConfig>` | `{}` | Cấu hình tùy chỉnh |

## Tính năng MathLive

Plugin MathLive cho phép người dùng chỉnh sửa công thức toán học trực tiếp trong editor:

1. Click vào icon "MathLive" trong toolbar
2. Nhập công thức toán học của bạn
3. Click "Lưu" để áp dụng

### Styling cho MathLive

```css
.math-live {
  padding: 4px 8px;
  background-color: #f0f8ff;
  border: 1px dashed #007cba;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Times New Roman', serif;
  font-style: italic;
}

.math-live:hover {
  background-color: #e6f3ff;
  transform: scale(1.05);
}
```

## Tính năng Base64 Image Upload

- Tự động chuyển đổi hình ảnh upload thành Base64
- Không cần cấu hình server
- Hình ảnh được embed trực tiếp vào HTML

## Development

### Build package

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build library
npm run build:lib

# Type checking
npm run type-check
```

### Cấu trúc thư mục

```
├── src/
│   ├── plugins/
│   │   ├── Base64UploadAdapter.ts
│   │   └── MathLive.ts
│   ├── styles/
│   │   └── mathlive.css
│   ├── CKEditorConfig.ts
│   ├── index.ts
│   └── App.jsx
├── dist/          # Built files
├── package.json
├── vite.config.js
└── README.md
```

## License

MIT License - see LICENSE file for details

## Contributors

- BiTech LabTest Team

## Changelog

### 1.0.0
- Initial release
- CKEditor 5 integration
- Base64 image upload
- MathLive plugin
- Vietnamese language support
- TypeScript support