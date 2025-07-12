import { Button, Stack, TextInput } from '@mantine/core';
import { useState, useEffect } from 'react';
import type { CreateTenantInput, Tenant } from '../../types/tenantTypes';

type Props = {
  initialValues?: Tenant;
  onSubmit: (data: CreateTenantInput & { id?: string }) => void;
  isLoading?: boolean;
};

export const TenantForm = ({ initialValues, onSubmit, isLoading }: Props) => {
  const [form, setForm] = useState<CreateTenantInput>({
    name: '',
    slug: '',
    logoUrl: '',
    themeColor: '#000000',
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || '',
        slug: initialValues.slug || '',
        logoUrl: initialValues.logoUrl || '',
        themeColor: initialValues.themeColor || '#000000',
      });
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (initialValues?.id) {
      onSubmit({ ...form, id: initialValues.id });
    } else {
      onSubmit(form);
    }
  };

  return (
    <Stack>
      <TextInput label="Name" name="name" value={form.name} onChange={handleChange} />
      <TextInput label="Slug" name="slug" value={form.slug} onChange={handleChange} disabled={!!initialValues} />
      <TextInput label="Logo URL" name="logoUrl" value={form.logoUrl} onChange={handleChange} />
      <TextInput label="Theme Color" name="themeColor" value={form.themeColor} onChange={handleChange} />
      <Button onClick={handleSubmit} loading={isLoading}>
        {initialValues ? 'Update Tenant' : 'Create Tenant'}
      </Button>
    </Stack>
  );
};
