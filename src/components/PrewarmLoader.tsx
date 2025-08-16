import { useState, useEffect } from 'react';
import { Stack, RingProgress, Text, Title } from '@mantine/core';

interface PrewarmLoaderProps {
  maxTime?: number; // max time in ms before assuming ready
}

export default function PrewarmLoader({ maxTime = 15000 }: PrewarmLoaderProps) {
  const [value, setValue] = useState(5); // start at 5%
  const [status, setStatus] = useState<'starting' | 'ready'>('starting');

  useEffect(() => {
    let cancelled = false;
    const startTime = Date.now();

    const pollPrewarm = async () => {
      while (!cancelled) {
        try {
          const res = await fetch('/api/prewarm');
          const data = await res.json();

          // Gradual progress increment
          const elapsed = Date.now() - startTime;
          const percent = Math.min((elapsed / maxTime) * 90 + 5, 95); // slowly move toward 95%
          setValue(percent);

          if (data.status === 'ready') {
            setValue(100);
            setStatus('ready');
            break;
          }
        } catch {
          // ignore errors, continue polling
        }

        await new Promise(r => setTimeout(r, 1000)); // 1s interval
      }
    };

    pollPrewarm();
    return () => { cancelled = true; };
  }, [maxTime]);

  return (
    <Stack align="center" justify="center" style={{ height: '100vh' }}>
      <RingProgress
        size={140}
        thickness={12}
        roundCaps
        sections={[{ value, color: 'blue' }]}
        label={<Text size="lg" ta="center">{Math.floor(value)}%</Text>}
      />
      <Title order={3} mt="md">
        {status === 'ready' ? 'Portal Ready!' : 'Waking up your portal...'}
      </Title>
      {status === 'starting' && (
        <Text size="sm" color="dimmed">
          This may take a few seconds. Thanks for your patience!
        </Text>
      )}
    </Stack>
  );
}
