import { useAuthLogins } from "../hooks/authLogins.hooks";
import { ClientTable } from "../../../components/ClientTable";

export default function AuthLoginsPage() {
  const { data, isLoading } = useAuthLogins();

  return (
    <ClientTable
      title="Auth Logins"
      data={data || []}
      loading={isLoading}
      columns={[
        { key: 'email', label: 'Email', width: 250 },
        { key: 'status', label: 'Status', width: 120 },
        { key: 'reason', label: 'Reason', width: 300 },
        { key: 'ipAddress', label: 'IP Address', width: 150 },
        { key: 'latitude', label: 'Latitude', width: 120 },
        { key: 'longitude', label: 'Longitude', width: 130 },
        { key: 'accuracy', label: 'Accuracy', width: 120 },
        { key: 'userAgent', label: 'User Agent', width: 300 },
        { key: 'createdAt', label: 'Login Time', width: 200 },
      ]}
      searchFields={[
        'email',
        'status',
        'reason',
        'ipAddress',
        'userAgent',
      ]}
      perPage={10}
      rowActionsWidth={0} // no actions for now
    />
  );
}
