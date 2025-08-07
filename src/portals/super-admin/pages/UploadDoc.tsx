// UploadDocument.tsx
import { useRef, useState } from 'react';
import { Button, FileInput, Select, Text } from '@mantine/core';
import { SignedViewer } from './SignedViewer';
import axios from '../../../api/axios';

export function UploadDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<string | null>('kyc');
  const [url, setUrl] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file || !type) return;

    const form = new FormData();
    form.append('file', file);
    form.append('type', type);

    const res = await axios.post('/documents/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setUrl(res.data.data.url);
    setPublicId(res.data.data.publicId);
  };

  return (
    <>
      <Select
        label="Document Type"
        data={['kyc', 'identity-proof', 'receipt']}
        value={type}
        onChange={setType}
      />
      <FileInput label="Upload File" onChange={setFile} />
      <Button onClick={handleUpload} disabled={!file || !type}>
        Upload
      </Button>

      {publicId && (
        <SignedViewer publicId={publicId} />
      )}

      {url && (
        <Text size="sm" mt="md">
          Public URL: <a href={url} target="_blank">{url}</a>
        </Text>
      )}
    </>
  );
}
