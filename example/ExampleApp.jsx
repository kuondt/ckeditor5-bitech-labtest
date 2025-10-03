import React, { useState, useCallback } from 'react';
import { BiTechCKEditor } from '../src/index';
import '../src/styles/mathlive.css';

const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjAzOTk5OTksImp0aSI6IjRiYjkwNDNhLTkwODAtNDFhNy04OTg5LTIxMWEwYzBiOTlkOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImEzNjFkZDY0In0.vJXgnYvAxjnPt7zoZq89SplLE-YKl5AXjhDKY3G80AzoBGjchkNG68UEVpnn58tZ827vchxSWcxGPlHTXZr2-g';

export default function ExampleApp() {
  const [content, setContent] = useState('<p>Chào mừng đến với CKEditor 5! Hãy thử thêm công thức toán học và upload hình ảnh.</p>');
  const [editorDisabled, setEditorDisabled] = useState(false);

