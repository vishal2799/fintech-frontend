import { useState } from 'react';
import { Modal, Text, Group, Badge, Button, Stack, Paper } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ClientTable } from '../../../components/ClientTable';
import { getTenantAuditLogs } from '../api/logs.api'

export interface AuditLog {
  id: string;
  tenantId: string | null;
  tenantName: string | null;
  actorName: string | null;
  actorId: string | null;
  actorType: string;
  url: string;
  method: string;
  module: string;
  activity: string;
  createdAt: string; // ISO date string
}


export default function TenantAuditLogsPage() {
  const { data = [] } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: getTenantAuditLogs,
  });

  const [selectedLog, setSelectedLog] = useState<any>(null);

  return (
    <>
      <ClientTable<AuditLog>
        title="Tenant Audit Logs"
        data={data}
        columns={[
        //   { key: 'tenantName', label: 'Tenant', width: 200 },
          { key: 'actorName', label: 'Actor', width: 200 },
          { key: 'module', label: 'Module', width: 200 },
          { key: 'activity', label: 'Activity', width: 200 },
        //   { key: 'createdAt', label: 'Date',   render: (row) => dayjs(row.createdAt).format("DD MMM YYYY, h:mm A"), width: 200 },
        ]}
        searchFields={['tenantName', 'actorName', 'module', 'activity']}
        rowActionsWidth={80}
        rowActions={(row) => [
            <Button
                            size="xs"
                            variant="light"
                            onClick={() => {
                              setSelectedLog(row);
                            }}
                          >
                            <IconEye size={18} />
                          </Button>
        ]}
        perPage={5}
      />

     <Modal
  opened={!!selectedLog}
  onClose={() => setSelectedLog(null)}
  title="Audit Log Details"
  size="lg"
  centered
>
  {selectedLog && (
    <Paper withBorder p={'md'} radius={'md'}>
    <Stack gap={'sm'}>
        <Group justify="space-between">
          <Text fw={500}>Tenant</Text>
          <Text>{selectedLog.tenantName || "—"}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Actor</Text>
          <Text>{selectedLog.actorName || "—"}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Actor Type</Text>
          <Text>{selectedLog.actorType || "—"}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Module</Text>
          <Badge variant="light" color="blue">{selectedLog.module}</Badge>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Activity</Text>
          <Text>{selectedLog.activity}</Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>URL</Text>
          <Text c="dimmed" size="sm" style={{ wordBreak: 'break-all' }}>
            {selectedLog.url}
          </Text>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Method</Text>
          <Badge variant="filled" color={
            selectedLog.method === "GET" ? "green" :
            selectedLog.method === "POST" ? "blue" :
            selectedLog.method === "PUT" ? "yellow" :
            "red"
          }>
            {selectedLog.method}
          </Badge>
        </Group>

        <Group justify="space-between">
          <Text fw={500}>Date</Text>
          <Text>{dayjs(selectedLog.createdAt).format("DD MMM YYYY, h:mm A")}</Text>
        </Group>
    </Stack>
    </Paper>
  )}
</Modal>

      </>
  );
}
