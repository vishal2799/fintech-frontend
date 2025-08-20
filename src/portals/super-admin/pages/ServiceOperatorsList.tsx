import { useState } from 'react';
import { ClientTable } from '../../../components/ClientTable';
import { Modal, TextInput, Button, Stack, Checkbox, Select, Badge } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showError, showSuccess } from '../../../utils/notifications';
import { useServiceOperators, useCreateServiceOperator, useUpdateServiceOperator, useDeleteServiceOperator } from '../hooks/serviceOperator.hooks';
// import { type serviceOperatorSchema } from '../schema/serviceOperator.schema';
import type { ServiceOperator } from '../types/serviceOperator.types';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { createServiceOperatorSchema, updateServiceOperatorSchema } from '../schema/serviceOperator.schema';
import { useServices } from '../hooks/services.hooks';

export default function ServiceOperatorListPage() {
  const { data = [] } = useServiceOperators();
  const createOperator = useCreateServiceOperator();
  const updateOperator = useUpdateServiceOperator();
  const deleteOperator = useDeleteServiceOperator();

    const { data: services = [], isLoading: servicesLoading } = useServices();

  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState<ServiceOperator | null>(null);

  const form = useForm({
    validate: zod4Resolver(editing !== null ? updateServiceOperatorSchema : createServiceOperatorSchema),
    initialValues: {
      serviceId: '',
      name: '',
      code: '',
    //   description: '',
      isActive: true,
    },
  });

  const openCreate = () => {
    setEditing(null);
    form.reset();
    setOpened(true);
  };

  const openEdit = (row: ServiceOperator) => {
    setEditing(row);
    form.setValues(row);
    setOpened(true);
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      let res;
      if (editing) {
        res = await updateOperator.mutateAsync({ id: editing.id, payload: values });
      } else {
        res = await createOperator.mutateAsync(values);
      }
      showSuccess(res);
      setOpened(false);
    } catch (err: any) {
      showError(err);
    }
  };

  const handleDelete = async (row: ServiceOperator) => {
    if (!confirm(`Delete operator "${row.name}"?`)) return;
    try {
      const res = await deleteOperator.mutateAsync(row.id);
      showSuccess(res);
    } catch (err: any) {
      showError(err);
    }
  };


  const serviceOptions = services.map(s => ({
    value: s.id,
    label: `${s.name} (${s.code})`,
  }));

  return (
    <>
      <ClientTable
        title="Service Operators"
        data={data}
        columns={[
          { key: 'name', label: 'Name', width: 160 },
          { key: 'code', label: 'Code', width: 120 },
          { key: 'isActive', label: 'Active', width: 100, render: (val) => (
            <Badge color={val.isActive ? 'green' : 'gray'} variant="filled">
                              {val.isActive ? 'Active' : 'Inactive'}
                            </Badge>
          ) },
        ]}
        searchFields={['name', 'code']}
        onEdit={openEdit}
        onDelete={handleDelete}
        onCreate={openCreate}
        perPage={5}
        rowActionsWidth={200}
      />

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={editing ? 'Edit Operator' : 'Create Operator'}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {/* TODO: Replace with real services dropdown */}
            <Select
          label="Service"
          placeholder={servicesLoading ? 'Loading services...' : 'Select service'}
          data={serviceOptions}
          searchable
          withAsterisk
          {...form.getInputProps('serviceId')}
        />
            {/* <Select
              label="Service"
              placeholder="Select service"
              data={[{ value: 'dmt', label: 'DMT' }, { value: 'aeps', label: 'AEPS' }]}
              {...form.getInputProps('serviceId')}
            /> */}
            <TextInput label="Name" placeholder="Operator name" {...form.getInputProps('name')} />
            <TextInput label="Code" placeholder="Unique code" {...form.getInputProps('code')} />
            {/* <Textarea label="Description" placeholder="Optional" {...form.getInputProps('description')} /> */}
            <Checkbox label="Active" {...form.getInputProps('isActive', { type: 'checkbox' })} />

            <Button type="submit" loading={createOperator.isPending || updateOperator.isPending}>
              {editing ? 'Update' : 'Create'}
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
