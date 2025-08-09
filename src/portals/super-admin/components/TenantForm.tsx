import {
  TextInput,
  Button,
  ColorInput,
  Stack,
  Group,
  FileInput,
  Image,
  Modal,
  Box,
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


// import {
//   TextInput,
//   Button,
//   ColorInput,
//   Stack,
//   Group,
//   FileInput,
//   Image
// } from '@mantine/core';
// import { useNavigate } from 'react-router';
// import { useCreateTenant, useUpdateTenant } from '../hooks/tenants.hooks';
// import { showError, showSuccess } from '../../../utils/notifications';
// import {
//   createTenantSchema,
//   updateTenantSchema,
//   type CreateTenantInput
// } from '../schema/tenant.schema';
// import type { Tenant } from '../types/tenant.types';
// import { useForm } from '@mantine/form';
// import { zod4Resolver } from 'mantine-form-zod-resolver';
// import { THEME_COLORS } from '../../../constants/constants';
// import { useState, useEffect } from 'react';
// import {
//   getTenantLogoUploadUrl,
//   updateTenantLogoKey,
//   getTenantLogoDownloadUrl
// } from '../api/tenants.api';

// type Props = {
//   mode: 'create' | 'edit';
//   initialValues?: Partial<Tenant>;
// };

// export default function TenantForm({ mode, initialValues }: Props) {
//   const navigate = useNavigate();
//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(
//     initialValues?.logoUrl ?? null
//   );

//   const schema = mode === 'create' ? createTenantSchema : updateTenantSchema;

//   const form = useForm({
//     initialValues: {
//       name: '',
//       slug: '',
//       logoUrl: '',
//       themeColor: '#004aad',
//       status: 'ACTIVE',
//       ...initialValues
//     },
//     validate: zod4Resolver(schema)
//   });

//   const createMutation = useCreateTenant();
//   const updateMutation = useUpdateTenant();

//   useEffect(() => {
//     if (mode === 'edit' && initialValues?.id) {
//       (async () => {
//         try {
//           const res = await getTenantLogoDownloadUrl(initialValues.id as string);
//           if (res?.downloadUrl) {
//             setPreviewUrl(res.downloadUrl);
//             form.setFieldValue('logoUrl', res.fileKey ?? '');
//           }
//         } catch (err) {
//           console.warn('logo preview fetch failed', err);
//         }
//       })();
//     }
//   }, [mode, initialValues?.id]);

//   const handleLogoUpload = async (tenantId: string) => {
//     if (!logoFile) return null;

//     try {
//       setUploading(true);
//       const { uploadUrl, fileKey } = await getTenantLogoUploadUrl(
//         tenantId,
//         logoFile.name,
//         logoFile.type
//       );

//       const uploadRes = await fetch(uploadUrl, {
//         method: 'PUT',
//         headers: { 'Content-Type': logoFile.type },
//         body: logoFile
//       });

//       if (!uploadRes.ok) throw new Error('Upload failed');

//       await updateTenantLogoKey(tenantId, fileKey);

//       const { downloadUrl } = await getTenantLogoDownloadUrl(tenantId);
//       setPreviewUrl(downloadUrl);
//       form.setFieldValue('logoUrl', fileKey);
//       return fileKey;
//     } catch (err) {
//       showError(err);
//       throw err;
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     const values = form.getValues();

//     const validation = form.validate();
//     if (validation.hasErrors) return; // stop if validation fails

//     console.log('ffj', values); // this will now run every time

//     try {
//       let tenantId = initialValues?.id;

//       if (mode === 'create') {
//         const res = await createMutation.mutateAsync(values as CreateTenantInput);
//         tenantId = res.data?.id;
//         showSuccess(res);
//       } else if (mode === 'edit' && initialValues?.id) {
//         const res = await updateMutation.mutateAsync({
//           id: initialValues.id,
//           data: values
//         });
//         showSuccess(res);
//       }

//       if (tenantId && logoFile) {
//         await handleLogoUpload(tenantId);
//       }

//       navigate('/tenants/list');
//     } catch (err) {
//       showError(err);
//     }
//   };

//   return (
//     <Stack>
//       <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
//       <TextInput
//         label="Slug"
//         withAsterisk
//         placeholder="yourbrand.fintech.com"
//         {...form.getInputProps('slug')}
//       />

//       {previewUrl && (
//         <Image
//           src={previewUrl}
//           alt="Tenant Logo"
//           width={120}
//           h={200}
//           radius="md"
//         />
//       )}

//       <FileInput
//         label={previewUrl ? 'Replace Logo' : 'Upload Logo'}
//         placeholder="Choose logo file"
//         accept="image/png,image/jpeg,image/svg+xml"
//         value={logoFile}
//         onChange={setLogoFile}
//       />

//       <ColorInput
//         label="Theme Color"
//         format="hex"
//         swatches={THEME_COLORS}
//         swatchesPerRow={5}
//         withPicker={false}
//         {...form.getInputProps('themeColor')}
//       />

//       <Group mt="md">
//         <Button
//           onClick={handleSubmit}
//           loading={
//             createMutation.isPending || updateMutation.isPending || uploading
//           }
//         >
//           {mode === 'create' ? 'Create' : 'Update'}
//         </Button>
//         <Button variant="light" onClick={() => navigate(-1)}>
//           Cancel
//         </Button>
//       </Group>
//     </Stack>
//   );
// }


// import {
//   TextInput,
//   Button,
//   ColorInput,
//   Stack,
//   Group,
//   FileInput,
//   Image
// } from '@mantine/core';
// import { useNavigate } from 'react-router';
// import { useCreateTenant, useUpdateTenant } from '../hooks/tenants.hooks';
// import { showError, showSuccess } from '../../../utils/notifications';
// import {
//   createTenantSchema,
//   updateTenantSchema,
//   type CreateTenantInput
// } from '../schema/tenant.schema';
// import type { Tenant } from '../types/tenant.types';
// import { useForm } from '@mantine/form';
// import { zod4Resolver } from 'mantine-form-zod-resolver';
// import { THEME_COLORS } from '../../../constants/constants';
// import { useState, useEffect } from 'react';
// import { getTenantLogoUploadUrl, updateTenantLogoKey, getTenantLogoDownloadUrl } from '../api/tenants.api';

// type Props = {
//   mode: 'create' | 'edit';
//   initialValues?: Partial<Tenant>;
// };

// export default function TenantForm({ mode, initialValues }: Props) {
//   const navigate = useNavigate();
//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues?.logoUrl ?? null); // will hold presigned GET URL

//   const schema = mode === 'create' ? createTenantSchema : updateTenantSchema;

//   const form = useForm({
//     initialValues: {
//       name: '',
//       slug: '',
//       logoUrl: '',      // will hold the fileKey OR URL depending on usage
//       themeColor: '#004aad',
//       status: 'ACTIVE',
//       ...initialValues,
//     },
//     validate: zod4Resolver(schema)
//   });

//   const createMutation = useCreateTenant();
//   const updateMutation = useUpdateTenant();

//   // On edit mode: fetch fresh presigned GET URL for preview
//   useEffect(() => {
//     if (mode === 'edit' && initialValues?.id) {
//       (async () => {
//         try {
//           const res = await getTenantLogoDownloadUrl(initialValues.id as string);
//           if (res?.downloadUrl) {
//             setPreviewUrl(res.downloadUrl);
//             // Keep the fileKey in hidden field (logoUrl) if you prefer
//             form.setFieldValue('logoUrl', res.fileKey ?? '');
//           }
//         } catch (err) {
//           // don't block edit — just log
//           console.warn('logo preview fetch failed', err);
//         }
//       })();
//     }
//   }, [mode, initialValues?.id]);

//   const handleLogoUpload = async (tenantId: string) => {
//     if (!logoFile) return null;

//     try {
//       setUploading(true);
//       // 1) request upload (PUT) URL and fileKey
//       const { uploadUrl, fileKey } = await getTenantLogoUploadUrl(tenantId, logoFile.name, logoFile.type);

//       // 2) do the PUT
//       const uploadRes = await fetch(uploadUrl, {
//         method: 'PUT',
//         headers: { 'Content-Type': logoFile.type },
//         body: logoFile
//       });

//       if (!uploadRes.ok) throw new Error('Upload failed');

//       // 3) tell backend to set the fileKey in DB
//       await updateTenantLogoKey(tenantId, fileKey);

//       // 4) get fresh presigned GET URL for immediate preview
//       const { downloadUrl } = await getTenantLogoDownloadUrl(tenantId);
//       setPreviewUrl(downloadUrl);
//       form.setFieldValue('logoUrl', fileKey);
//       return fileKey;
//     } catch (err) {
//       showError(err);
//       throw err;
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = form.onSubmit(async (values) => {
//     console.log('ffj')
//     try {
//       let tenantId = initialValues?.id;

//       if (mode === 'create') {
//         const res = await createMutation.mutateAsync(values as CreateTenantInput);
//         // ensure backend returns created tenant id under res.data.id (adapt to your API)
//         tenantId = res.data?.id;
//         showSuccess(res);
//       } else if (mode === 'edit' && initialValues?.id) {
//         const res = await updateMutation.mutateAsync({
//           id: initialValues.id,
//           data: values,
//         });
//         showSuccess(res);
//       }

//       // IMPORTANT: upload logo AFTER tenant exists, AND AWAIT upload before navigate
//       if (tenantId && logoFile) {
//         await handleLogoUpload(tenantId);
//       }

//       navigate('/tenants/list');
//     } catch (err) {
//       showError(err);
//     }
//   });

//   return (
//     <form>
//       <Stack>
//         <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
//         <TextInput label="Slug" withAsterisk placeholder="yourbrand.fintech.com" {...form.getInputProps('slug')} />

//         {/* Preview using presigned GET URL */}
//         {previewUrl && (
//           <Image src={previewUrl} 
//           alt="Tenant Logo" width={120} h={200} radius="md" 
//           // withPlaceholder 
//           />
//         )}

//         <FileInput
//           label={previewUrl ? 'Replace Logo' : 'Upload Logo'}
//           placeholder="Choose logo file"
//           accept="image/png,image/jpeg,image/svg+xml"
//           value={logoFile}
//           onChange={setLogoFile}
//         />

//         <ColorInput label="Theme Color" format="hex" swatches={THEME_COLORS} swatchesPerRow={5} withPicker={false} {...form.getInputProps('themeColor')} />

//         <Group mt="md">
//           <Button type="submit" loading={createMutation.isPending || updateMutation.isPending || uploading}>
//             {mode === 'create' ? 'Create' : 'Update'}
//           </Button>
//           <Button variant="light" onClick={() => navigate(-1)}>Cancel</Button>
//         </Group>
//       </Stack>
//     </form>
//   );
// }


// import {
//   TextInput,
//   Button,
//   ColorInput,
//   Stack,
//   Group,
//   FileInput,
//   Image
// } from '@mantine/core';
// import { useNavigate } from 'react-router';
// import { useCreateTenant, useUpdateTenant } from '../hooks/tenants.hooks';
// import { showError, showSuccess } from '../../../utils/notifications';
// import {
//   createTenantSchema,
//   updateTenantSchema,
//   type CreateTenantInput
// } from '../schema/tenant.schema';
// import type { Tenant } from '../types/tenant.types';
// import { useForm } from '@mantine/form';
// import { zod4Resolver } from 'mantine-form-zod-resolver';
// import { THEME_COLORS } from '../../../constants/constants';
// import { useState } from 'react';
// import { getTenantLogoUploadUrl, updateTenantLogoUrl } from '../api/tenants.api';

// type Props = {
//   mode: 'create' | 'edit';
//   initialValues?: Partial<Tenant>;
// };

// export default function TenantForm({ mode, initialValues }: Props) {
//   const navigate = useNavigate();
//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const schema = mode === 'create' ? createTenantSchema : updateTenantSchema;

//   const form = useForm({
//     initialValues: {
//       name: '',
//       slug: '',
//       logoUrl: '',
//       themeColor: '#004aad',
//       status: 'ACTIVE',
//       ...initialValues,
//     },
//     validate: zod4Resolver(schema)
//   });

//   const createMutation = useCreateTenant();
//   const updateMutation = useUpdateTenant();

//   const handleLogoUpload = async (tenantId: string) => {
//     if (!logoFile) return;

//     try {
//       setUploading(true);
//       // 1️⃣ Get upload URL from backend
//       const { uploadUrl, fileKey } = await getTenantLogoUploadUrl(
//         tenantId,
//         logoFile.name,
//         logoFile.type
//       );

//       // 2️⃣ Upload directly to S3
//       const uploadRes = await fetch(uploadUrl, {
//         method: 'PUT',
//         headers: { 'Content-Type': logoFile.type },
//         body: logoFile
//       });

//       if (!uploadRes.ok) throw new Error('Logo upload failed');

//       // 3️⃣ Save fileKey to DB & update logoUrl in form
//       const { logoUrl } = await updateTenantLogoUrl(tenantId, fileKey);
//       form.setFieldValue('logoUrl', logoUrl);
//       showSuccess('Logo uploaded successfully');
//     } catch (err) {
//       showError(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = form.onSubmit(async (values) => {
//     try {
//       let tenantId = initialValues?.id;

//       if (mode === 'create') {
//         const res = await createMutation.mutateAsync(values as CreateTenantInput);
//         tenantId = res.data?.id; // Ensure backend returns ID
//         showSuccess(res);
//       } else if (mode === 'edit' && initialValues?.id) {
//         const res = await updateMutation.mutateAsync({
//           id: initialValues.id,
//           data: values,
//         });
//         showSuccess(res);
//       }

//       if (tenantId && logoFile) {
//         await handleLogoUpload(tenantId);
//       }

//       navigate('/tenants/list');
//     } catch (err) {
//       showError(err);
//     }
//   });

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack>
//         <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
//         <TextInput
//           label="Slug"
//           withAsterisk
//           placeholder="yourbrand.fintech.com"
//           {...form.getInputProps('slug')}
//         />

//         {/* Logo Preview (only if exists) */}
//         {form.values.logoUrl && (
//           <Image
//             src={form.values.logoUrl}
//             alt="Tenant Logo"
//             width={120}
//             radius="md"
//             // withPlaceholder
//           />
//         )}

//         <FileInput
//           label={form.values.logoUrl ? 'Replace Logo' : 'Upload Logo'}
//           placeholder="Choose logo file"
//           accept="image/png,image/jpeg,image/svg+xml"
//           value={logoFile}
//           onChange={setLogoFile}
//         />

//         <ColorInput
//           label="Theme Color"
//           format="hex"
//           swatches={THEME_COLORS}
//           swatchesPerRow={5}
//           withPicker={false}
//           {...form.getInputProps('themeColor')}
//         />

//         <Group mt="md">
//           <Button
//             type="submit"
//             loading={
//               createMutation.isPending ||
//               updateMutation.isPending ||
//               uploading
//             }
//           >
//             {mode === 'create' ? 'Create' : 'Update'}
//           </Button>
//           <Button variant="light" onClick={() => navigate(-1)}>
//             Cancel
//           </Button>
//         </Group>
//       </Stack>
//     </form>
//   );
// }


// import {
//   TextInput,
//   Button,
//   ColorInput,
//   Stack,
//   Group,
//   FileInput
// } from '@mantine/core';
// import { useNavigate } from 'react-router';
// import { useCreateTenant, useUpdateTenant } from '../hooks/tenants.hooks';
// import { showError, showSuccess } from '../../../utils/notifications';
// import {
//   createTenantSchema,
//   updateTenantSchema,
//   type CreateTenantInput
// } from '../schema/tenant.schema';
// import type { Tenant } from '../types/tenant.types';
// import { useForm } from '@mantine/form';
// import { zod4Resolver } from 'mantine-form-zod-resolver';
// import { THEME_COLORS } from '../../../constants/constants';
// import { useState } from 'react';
// import { getTenantLogoUploadUrl, updateTenantLogoUrl } from '../api/tenants.api';

// type Props = {
//   mode: 'create' | 'edit';
//   initialValues?: Partial<Tenant>;
// };

// export default function TenantForm({ mode, initialValues }: Props) {
//   const navigate = useNavigate();
//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const schema = mode === 'create' ? createTenantSchema : updateTenantSchema;

//   const form = useForm({
//     initialValues: {
//       name: '',
//       slug: '',
//       logoUrl: '',
//       themeColor: '#004aad',
//       status: 'ACTIVE',
//       ...initialValues,
//     },
//     validate: zod4Resolver(schema)
//   });

//   const createMutation = useCreateTenant();
//   const updateMutation = useUpdateTenant();

//   const handleLogoUpload = async (tenantId: string) => {
//     if (!logoFile) return;

//     try {
//       setUploading(true);
//       // 1️⃣ Get upload URL from backend
//       const { uploadUrl, fileKey } = await getTenantLogoUploadUrl(
//         tenantId,
//         logoFile.name,
//         logoFile.type
//       );

//       console.log(uploadUrl, fileKey)

//       // 2️⃣ Upload directly to S3
//       const uploadRes = await fetch(uploadUrl, {
//         method: 'PUT',
//         headers: { 'Content-Type': logoFile.type },
//         body: logoFile
//       });

//       if (!uploadRes.ok) throw new Error('Logo upload failed');

//       // 3️⃣ Save fileKey to DB & update logoUrl in form
//       const { logoUrl } = await updateTenantLogoUrl(tenantId, fileKey);
//       form.setFieldValue('logoUrl', logoUrl);
//       showSuccess('Logo uploaded successfully');
//     } catch (err) {
//       showError(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = form.onSubmit(async (values) => {
//     try {
//       let tenantId = initialValues?.id;

//       if (mode === 'create') {
//         const res = await createMutation.mutateAsync(values as CreateTenantInput);
//         tenantId = res.data?.id; // Make sure your backend returns new ID
//         showSuccess(res);
//       } else if (mode === 'edit' && initialValues?.id) {
//         const res = await updateMutation.mutateAsync({
//           id: initialValues.id,
//           data: values,
//         });
//         showSuccess(res);
//       }

//       // If there’s a new logo selected, upload after tenant record exists
//       if (tenantId && logoFile) {
//         await handleLogoUpload(tenantId);
//       }

//       navigate('/tenants/list');
//     } catch (err) {
//       showError(err);
//     }
//   });

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack>
//         <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
//         <TextInput
//           label="Slug"
//           withAsterisk
//           placeholder="yourbrand.fintech.com"
//           {...form.getInputProps('slug')}
//         />

//         {/* Old manual input removed */}
//         {/* <TextInput label="Logo URL" {...form.getInputProps('logoUrl')} /> */}

//         <FileInput
//           label="Logo"
//           placeholder="Choose logo file"
//           accept="image/png,image/jpeg,image/svg+xml"
//           value={logoFile}
//           onChange={setLogoFile}
//         />

//         <ColorInput
//           label="Theme Color"
//           format="hex"
//           swatches={THEME_COLORS}
//           swatchesPerRow={5}
//           withPicker={false}
//           {...form.getInputProps('themeColor')}
//         />

//         <Group mt="md">
//           <Button
//             type="submit"
//             loading={
//               createMutation.isPending ||
//               updateMutation.isPending ||
//               uploading
//             }
//           >
//             {mode === 'create' ? 'Create' : 'Update'}
//           </Button>
//           <Button variant="light" onClick={() => navigate(-1)}>
//             Cancel
//           </Button>
//         </Group>
//       </Stack>
//     </form>
//   );
// }


// import {
//   TextInput,
//   Button,
//   ColorInput,
//   Stack,
//   Group,
// } from '@mantine/core';
// import { useNavigate } from 'react-router';
// import { useCreateTenant, useUpdateTenant } from '../hooks/tenants.hooks';
// import { showError, showSuccess } from '../../../utils/notifications';
// import {
//   createTenantSchema,
//   updateTenantSchema,
//   type CreateTenantInput
// } from '../schema/tenant.schema.ts';
// import type { Tenant } from '../types/tenant.types.ts';
// import { useForm } from '@mantine/form';
// import { zod4Resolver } from 'mantine-form-zod-resolver';
// import { THEME_COLORS } from '../../../constants/constants.ts';

// type Props = {
//   mode: 'create' | 'edit';
//   initialValues?: Partial<Tenant>;
// };

// export default function TenantForm({ mode, initialValues }: Props) {
//   const navigate = useNavigate();

//   const schema = mode === 'create' ? createTenantSchema : updateTenantSchema;

// const form = useForm({
//   initialValues: {
//     name: '',
//     slug: '',
//     logoUrl: '',
//     themeColor: '#004aad',
//     status: 'ACTIVE',
//     ...initialValues,
//   },
//   validate: zod4Resolver(schema)
// });


//   const createMutation = useCreateTenant();
//   const updateMutation = useUpdateTenant();

//   const handleSubmit = form.onSubmit(async (values) => {
//     try {
//       if (mode === 'create') {
//         const res = await createMutation.mutateAsync(values as CreateTenantInput);
//         showSuccess(res);
//       } else if (mode === 'edit' && initialValues?.id) {
//         const res = await updateMutation.mutateAsync({
//           id: initialValues.id,
//           data: values,
//         });
//         showSuccess(res);
//       }
//       navigate('/tenants/list');
//     } catch (err) {
//       showError(err);
//     }
//   });

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack>
//         <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
//         <TextInput
//           label="Slug"
//           withAsterisk
//           placeholder="yourbrand.fintech.com"
//           {...form.getInputProps('slug')}
//         />
//         <TextInput
//           label="Logo URL"
//           placeholder="https://cdn.com/logo.png"
//           {...form.getInputProps('logoUrl')}
//         />
//         <ColorInput
//   label="Theme Color"
//   format="hex"
//   swatches={THEME_COLORS}
//   swatchesPerRow={5}
//   withPicker={false}
//   {...form.getInputProps('themeColor')}
// />
//         {/* <ColorInput label="Theme Color" {...form.getInputProps('themeColor')} /> */}
//         <Group mt="md">
//           <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
//             {mode === 'create' ? 'Create' : 'Update'}
//           </Button>
//           <Button variant="light" onClick={() => navigate(-1)}>
//             Cancel
//           </Button>
//         </Group>
//       </Stack>
//     </form>
//   );
// }
