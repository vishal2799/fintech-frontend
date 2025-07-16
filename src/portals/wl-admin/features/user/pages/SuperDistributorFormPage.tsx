import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import {
  Title,
  Container,
  TextInput,
  Button,
  Stack,
  Loader,
} from '@mantine/core';
import {
  useSuperDistributors,
  useCreateSuperDistributor,
  useUpdateSuperDistributor,
} from '../api/superDistributors.hooks';
import { notifications } from '@mantine/notifications';

export default function SuperDistributorFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const { data: allUsers = [], isLoading } = useSuperDistributors();
  const createMutation = useCreateSuperDistributor();
  const updateMutation = useUpdateSuperDistributor();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  useEffect(() => {
    if (isEdit && allUsers.length > 0) {
      const match = allUsers.find((u) => u.id === id);
      if (match) {
        setFormValues({
          name: match.name || '',
          email: match.email || '',
          mobile: match.mobile || '',
          password: '',
        });
      }
    }
  }, [isEdit, id, allUsers]);

  const handleSubmit = async () => {
    try {
      if (isEdit && id) {
        await updateMutation.mutateAsync({ id, data: formValues });
        notifications.show({ message: 'Updated', color: 'blue' });
      } else {
        await createMutation.mutateAsync(formValues);
        notifications.show({ message: 'Created', color: 'green' });
      }
      navigate('/wl-admin/super-distributors/list');
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  };

  if (isEdit && (isLoading || !formValues.name)) return <Loader />;

  return (
    <Container size="sm">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Super Distributor' : 'Create Super Distributor'}
      </Title>

      <Stack>
        <TextInput
          label="Name"
          value={formValues.name}
          onChange={(e) => setFormValues(f => ({ ...f, name: e.target.value }))}
        />
        <TextInput
          label="Email"
          value={formValues.email}
          onChange={(e) => setFormValues(f => ({ ...f, email: e.target.value }))}
        />
        <TextInput
          label="Mobile"
          value={formValues.mobile}
          onChange={(e) => setFormValues(f => ({ ...f, mobile: e.target.value }))}
        />
        {!isEdit && (
          <TextInput
            label="Password"
            type="password"
            value={formValues.password}
            onChange={(e) => setFormValues(f => ({ ...f, password: e.target.value }))}
          />
        )}

        <Button onClick={handleSubmit} loading={createMutation.isPending || updateMutation.isPending}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </Stack>
    </Container>
  );
}
