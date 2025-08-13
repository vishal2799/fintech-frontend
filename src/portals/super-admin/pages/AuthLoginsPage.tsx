import { useAuthLogins } from "../hooks/authLogins.hooks";
import { ClientTable } from "../../../components/ClientTable";
import type { AuthLogin } from "../types/authLogs.types";
import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import { IconEye } from "@tabler/icons-react";
import dayjs from "dayjs";

export default function AuthLoginsPage() {
  const { data = [] } = useAuthLogins();
const [selectedLog, setSelectedLog] = useState<AuthLogin>();
  const [opened, setOpened] = useState(false);

  return (
    <>
    <ClientTable<AuthLogin>
      title="Auth Logins"
      data={data || []}
    //   loading={isLoading}
      columns={[
        { key: 'email', label: 'Email', width: 250 },
        { key: 'status', label: 'Status', width: 120 },
        { key: 'ipAddress', label: 'IP Address', width: 150 },
        
        { key: 'createdAt', label: 'Login Time',   render: (row) => dayjs(row.createdAt).format("DD MMM YYYY, h:mm A"), width: 200 },
      ]}
      searchFields={[
        'email',
        'status',
        'ipAddress',
        'userAgent',
      ]}
      rowActions={(row) => [<Button
                  size="xs"
                  variant="light"
                  onClick={() => {
            const url = `https://www.google.com/maps?q=${row.latitude},${row.longitude}`;
            window.open(url, '_blank');
          }}
                >
                            View Location
                </Button>, <Button
                size="xs"
                variant="light"
                onClick={() => {
                  setSelectedLog(row);
                  setOpened(true);
                }}
              >
                <IconEye size={16} />
              </Button>]}
      perPage={5}
      rowActionsWidth={180}
    />
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Auth Log Details"
        size="lg"
      >
        {selectedLog && (
          <div className="space-y-2">
            <div><strong>User:</strong> {selectedLog.email}</div>
            <div><strong>Status:</strong> {selectedLog.status}</div>
            <div><strong>IP Address:</strong> {selectedLog.ipAddress}</div>
            <div><strong>Login Time:</strong> {dayjs(selectedLog.createdAt).format("DD MMM YYYY, h:mm A")}</div>
            <div><strong>User Agent:</strong> {selectedLog.userAgent || 'N/A'}</div>
            <div><strong>Accuracy:</strong> {selectedLog.accuracy || 'N/A'}</div>
            <div><strong>Latitude:</strong> {selectedLog.latitude}</div>
            <div><strong>Longitude:</strong> {selectedLog.longitude}</div>
            <div><strong>Raw Data:</strong> {JSON.stringify(selectedLog, null, 2)}</div>
          </div>
        )}
      </Modal>
      </>
  );
}
