import {
  TextInput,
  Button,
  ColorInput,
  Stack,
  Group,
  FileInput,
  Image,
  Modal,
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { useCreateTenant, useUpdateTenant } from '../hooks/tenants.hooks';
import { showError, showSuccess } from '../../../utils/notifications';
import {
  createTenantSchema,
  updateTenantSchema,
  type CreateTenantInput
} from '../schema/tenant.schema';
import type { Tenant } from '../types/tenant.types';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { THEME_COLORS } from '../../../constants/constants';
import { useState, useEffect } from 'react';
import {
  getTenantLogoUploadUrl,
  updateTenantLogoKey,
  getTenantLogoDownloadUrl
} from '../api/tenants.api';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<Tenant> | undefined;
};

export default function TenantForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialValues?.logoUrl ?? null
  );
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  const schema = mode === 'create' ? createTenantSchema : updateTenantSchema;

  const form = useForm({
    initialValues: {
      name: '',
      slug: '',
      logoUrl: '',
      themeColor: '#004aad',
      status: 'ACTIVE',
      ...initialValues
    },
    validate: zod4Resolver(schema)
  });

  const createMutation = useCreateTenant();
  const updateMutation = useUpdateTenant();

  useEffect(() => {
    if (initialValues) {
      form.setValues({
        name: initialValues.name ?? '',
        slug: initialValues.slug ?? '',
        logoUrl: initialValues.logoUrl ?? '',
        themeColor: initialValues.themeColor ?? '#004aad',
        status: initialValues.status ?? 'ACTIVE'
      });
    }
  }, [initialValues]);

  useEffect(() => {
    if (mode === 'edit' && initialValues?.id) {
      (async () => {
        try {
          const res = await getTenantLogoDownloadUrl(initialValues.id as string);
          if (res?.downloadUrl) {
            setPreviewUrl(res.downloadUrl);
            form.setFieldValue('logoUrl', res.fileKey ?? '');
          }
        } catch (err) {
          console.warn('logo preview fetch failed', err);
        }
      })();
    }
  }, [mode, initialValues?.id]);

  const handleLogoUpload = async (tenantId: string) => {
    if (!logoFile) return null;
    try {
      setUploading(true);
      const { uploadUrl, fileKey } = await getTenantLogoUploadUrl(
        tenantId,
        logoFile.name,
        logoFile.type
      );

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': logoFile.type },
        body: logoFile
      });

      if (!uploadRes.ok) throw new Error('Upload failed');

      await updateTenantLogoKey(tenantId, fileKey);

      const { downloadUrl } = await getTenantLogoDownloadUrl(tenantId);
      setPreviewUrl(downloadUrl);
      form.setFieldValue('logoUrl', fileKey);
      return fileKey;
    } catch (err) {
      showError(err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const manualSubmit = async () => {
    const validation = form.validate();
    if ((validation as any).hasErrors) return;

    const values = form.values;

    try {
      let tenantId = initialValues?.id;

      if (mode === 'create') {
        const res = await createMutation.mutateAsync(values as CreateTenantInput);
        tenantId = res?.data?.id;
        showSuccess(res);
      } else if (mode === 'edit' && initialValues?.id) {
        const res = await updateMutation.mutateAsync({
          id: initialValues.id,
          data: values
        });
        showSuccess(res);
      }

      if (tenantId && logoFile) {
        await handleLogoUpload(tenantId);
      }

      navigate('/tenants/list');
    } catch (err) {
      showError(err);
    }
  };

  return (
    <>
      <Modal
        opened={logoModalOpen}
        onClose={() => setLogoModalOpen(false)}
        title="Tenant Logo"
        centered
      >
        {previewUrl ? (
          <Image src={previewUrl} alt="Tenant Logo" radius="md" />
        ) : (
          <p>No logo</p>
        )}
      </Modal>

      <Stack>
        <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
        <TextInput
          label="Slug"
          withAsterisk
          placeholder="yourbrand.fintech.com"
          {...form.getInputProps('slug')}
        />

        {/* Single clickable preview */}
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Tenant Logo"
            width={120}
            h={100}
            radius="md"
            style={{ cursor: 'pointer' }}
            onClick={() => setLogoModalOpen(true)}
          />
        )}

        <FileInput
          label={previewUrl ? 'Replace Logo' : 'Upload Logo'}
          placeholder={logoFile ? logoFile.name : 'Choose logo file'}
          accept="image/png,image/jpeg,image/svg+xml"
          value={logoFile}
          onChange={setLogoFile}
          clearable
        />

        <ColorInput
          label="Theme Color"
          format="hex"
          swatches={THEME_COLORS}
          swatchesPerRow={5}
          withPicker={false}
          {...form.getInputProps('themeColor')}
        />

        <Group mt="md">
          <Button
            onClick={manualSubmit}
            loading={
              createMutation.isPending || updateMutation.isPending || uploading
            }
              disabled={!form.isValid()}

          >
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
          <Button variant="light" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </>
  );
}


