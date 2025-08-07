// SignedViewer.tsx
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';

interface Props {
  publicId: string;
}

export function SignedViewer({ publicId }: Props) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUrl() {
      const res = await axios.get(`/documents/generate-signed-url`, {
        params: { publicId },
      });
      setSignedUrl(res.data.url);
    }
    fetchUrl();
  }, [publicId]);

  if (!signedUrl) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <a href={signedUrl} target="_blank" rel="noopener noreferrer">
        View Document
      </a>
    </div>
  );
}
