import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import {
  Title,
  Container,
  TextInput,
  Button,
  Stack,
  Loader,
  Select,
} from '@mantine/core';
import {
  useRetailers,
  useCreateRetailer,
  useUpdateRetailer,
} from '../hooks/retailers.hooks';
import { useDistributors } from '../hooks/distributors.hooks';
import { notifications } from '@mantine/notifications';

export default function RetailerFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const { data: all = [], isLoading } = useRetailers();
  const { data: distributors = [] } = useDistributors();
  const createMutation = useCreateRetailer();
  const updateMutation = useUpdateRetailer();

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    parentId: '',
  });

  useEffect(() => {
    if (isEdit && all.length > 0) {
      const match = all.find((u) => u.id === id);
      if (match) {
        setFormValues({
          name: match.name || '',
          email: match.email || '',
          mobile: match.mobile || '',
          password: '',
          parentId: match.parentId || '',
        });
      }
    }
  }, [isEdit, id, all]);

  const handleSubmit = async () => {
    try {
      if (isEdit && id) {
        await updateMutation.mutateAsync({ id, data: formValues });
        notifications.show({ message: 'Updated', color: 'blue' });
      } else {
        await createMutation.mutateAsync(formValues);
        notifications.show({ message: 'Created', color: 'green' });
      }
      navigate('/admin/retailers/list');
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  };

  if (isEdit && (isLoading || !formValues.name)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Retailer' : 'Create Retailer'}
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
        <Select
          label="Distributor"
          data={distributors.map((d) => ({ value: d.id, label: d.name }))}
          value={formValues.parentId}
          onChange={(val) => setFormValues(f => ({ ...f, parentId: val || '' }))}
        />

        <Button onClick={handleSubmit} loading={createMutation.isPending || updateMutation.isPending}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </Stack>
    </Container>
  );
}
