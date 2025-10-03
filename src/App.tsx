import React, { useState, useCallback } from "react";
import SimpleCKEditor from "./SimpleCKEditor";
import "./App.css";

const LICENSE_KEY = "GPL";

export default function App() {
  const [content, setContent] = useState("");
  const [editorDisabled, setEditorDisabled] = useState(false);

  const handleChange = useCallback((event: any, editor: any) => {
    const data = editor.getData();
    setContent(data);
    console.log("Content changed:", data);
  }, []);

  const handleFocus = useCallback((event: any, editor: any) => {
    console.log("Editor focused");
  }, []);

  const handleBlur = useCallback((event: any, editor: any) => {
    console.log("Editor blurred");
  }, []);

  const handleReady = useCallback((editor: any) => {
    console.log("Editor ready:", editor);
  }, []);

  const toggleEditor = useCallback(() => {
    setEditorDisabled((prev) => !prev);
  }, []);

  const clearContent = useCallback(() => {
    setContent("");
  }, []);

  return (
    <div className="main-container">
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1>CKEditor 5 BiTech LabTest Integration</h1>
        <p>Package npm với tích hợp Base64 upload và MathLive</p>

        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={toggleEditor}
            style={{ marginRight: "10px", padding: "8px 16px" }}
          >
            {editorDisabled ? "Enable" : "Disable"} Editor
          </button>
          <button onClick={clearContent} style={{ padding: "8px 16px" }}>
            Clear Content
          </button>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <SimpleCKEditor
            initialData={content || '<p>Chào mừng đến với CKEditor 5! 🎉</p>'}
            onChange={handleChange}
          />
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h3>Preview Content:</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: content || "<em>No content yet</em>",
            }}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3>Tính năng:</h3>
          <ul>
            <li>
              <strong>✅ Base64 Image Upload:</strong> Upload hình ảnh tự động
              chuyển thành Base64
            </li>
            <li>
              <strong>✅ MathLive Integration:</strong> Chỉnh sửa công thức toán
              học
            </li>
            <li>
              <strong>✅ Fullscreen Mode:</strong> Chế độ toàn màn hình
            </li>
            <li>
              <strong>✅ Source Editing:</strong> Chỉnh sửa mã HTML
            </li>
            <li>
              <strong>✅ Vietnamese Language:</strong> Giao diện tiếng Việt
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
