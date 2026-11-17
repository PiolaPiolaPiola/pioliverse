import { useEffect, useState } from 'react';

async function sha1Hex(text: string) {
  const digest = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function useSha1(texts: readonly string[]) {
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    Promise.all(texts.map(async (text) => [text, await sha1Hex(text)] as const))
      .then((entries) => {
        if (active) setHashes(Object.fromEntries(entries));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [texts]);

  return hashes;
}
