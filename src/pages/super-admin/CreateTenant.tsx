import { Button, TextInput, Stack } from '@mantine/core';
import { useState } from 'react';
import { useTenantService } from '../../hooks/useTenantService';

export const TenantForm = () => {
  const { createTenant } = useTenantService();
  const [form, setForm] = useState({
    name: '',
    slug: '',
    logoUrl: '',
    themeColor: '#000000',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    createTenant.mutate(form);
    console.log('hi')
  };

  return (
    <Stack>
      <TextInput label="Name" name="name" value={form.name} onChange={handleChange} />
      <TextInput label="Slug" name="slug" value={form.slug} onChange={handleChange} />
      <TextInput label="Logo URL" name="logoUrl" value={form.logoUrl} onChange={handleChange} />
      <TextInput label="Theme Color" name="themeColor" value={form.themeColor} onChange={handleChange} />
      <Button onClick={handleSubmit} loading={createTenant.isPending}>Create Tenant</Button>
    </Stack>
  );
};
