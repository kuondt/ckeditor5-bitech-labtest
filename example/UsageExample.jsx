import React, { useState } from 'react';
import { CKEditor, BiTechEditor } from 'ckeditor5-bitech-labtest';

export default function UsageExample() {
  const [content, setContent] = useState('<p>Chào mừng đến với BiTech Editor! 🎉</p><p>Thử upload hình ảnh và chỉnh sửa văn bản.</p>');
  const [licenseKey] = useState('GPL');

  return (
    <div style={{ padding: '20px' }}>
      <h1>BiTech CK Editor 5 - Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Editor với đầy đủ tính năng:</h3>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <CKEditor
            editor={BiTechEditor}
            data={content}
            config={{ licenseKey }}
            onChange={(event, editor) => {
              setContent(editor.getData());
            }}
          />
        </div>
      </div>

      <div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Preview Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Cách sử dụng:</h3>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
{`import React from 'react';
import { CKEditor, BiTechEditor } from 'ckeditor5-bitech-labtest';

function MyEditor() {
  return (
    <CKEditor
      editor={BiTechEditor}
      data="<p>Your content</p>"
      config={{ licenseKey: "GPL" }}
      onChange={(event, editor) => {
        console.log(editor.getData());
      }}
    />
  );
}`}
        </pre>
      </div>
    </div>
  );
}
