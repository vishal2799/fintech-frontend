import {
  Button,
  NumberInput,
  Stack,
  Textarea,
  Group,
  FileInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { useCreditRequest } from '../hooks/wallet.hooks';
import {
  creditRequestSchema,
  type CreditRequestInput,
} from '../schema/wallet.schema';
import { useState } from 'react';
import { getProofUploadUrl, updateProofKey } from '../api/wallet.api';
import { showError } from '../../../utils/notifications';

export default function WalletRequestForm() {
  const creditRequest = useCreditRequest();
  const [proofFile, setProofFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<CreditRequestInput>({
    initialValues: {
      amount: 0,
      remarks: '',
      proofUrl: '',
    },
    validate: zod4Resolver(creditRequestSchema),
  });

    const handleProofUpload = async (creditRequestId: string) => {
      if (!proofFile) return null;
      try {
        setUploading(true);
        const { uploadUrl, fileKey } = await getProofUploadUrl(
          creditRequestId,
          proofFile.name,
          proofFile.type
        );
  
        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': proofFile.type },
          body: proofFile
        });
  
        if (!uploadRes.ok) throw new Error('Upload failed');
  
        await updateProofKey(creditRequestId, fileKey);
  
        // const { downloadUrl } = await getProofDownloadUrl(creditRequestId);
        // setPreviewUrl(downloadUrl);
        form.setFieldValue('logoUrl', fileKey);
        return fileKey;
      } catch (err) {
        showError(err);
        throw err;
      } finally {
        setUploading(false);
      }
    };


  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const res = await creditRequest.mutateAsync(values);
      let creditRequestId = res?.data?.data?.id;
      if (creditRequestId && proofFile) {
        await handleProofUpload(creditRequestId);
      }
      notifications.show({
        message: 'Credit request submitted',
        color: 'green',
      });
      form.reset();
      setProofFile(null);
    } catch (err: any) {
      notifications.show({
        message: err?.response?.data?.message || 'Submission failed',
        color: 'red',
      });
    }
  });

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Stack>
        <NumberInput
          label="Amount"
          withAsterisk
          min={1}
          {...form.getInputProps('amount')}
        />
        
                <FileInput
                  label={'Upload Proof'}
                  placeholder={proofFile ? proofFile.name : 'Choose Proof file'}
                  accept="image/png,image/jpeg,image/svg+xml"
                  value={proofFile}
                  onChange={setProofFile}
                  clearable
                />

        <Textarea
          label="Remarks"
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('remarks')}
        />

        <Group mt="md">
          <Button type="submit" loading={creditRequest.isPending || uploading}>
            Submit Request
          </Button>
        </Group>
      </Stack>
    </form>
    </>
  );
}


// import { Button, Stack, Textarea, NumberInput, Group } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { useNavigate } from 'react-router';
// import { useRequestWalletCredit } from '../api/wallet.hooks';
// import { notifications } from '@mantine/notifications';

// export default function CreditRequestForm() {
//   const navigate = useNavigate();
//   const form = useForm({
//     initialValues: {
//       amount: 0,
//       remarks: '',
//     },
//     validate: {
//       amount: (val) => (val <= 0 ? 'Amount must be greater than 0' : null),
//     },
//   });

//   const mutation = useRequestWalletCredit();

//   const handleSubmit = form.onSubmit(async (values) => {
//     try {
//       await mutation.mutateAsync(values);
//       notifications.show({ message: 'Credit request sent', color: 'green' });
//       navigate(-1);
//     } catch (err: any) {
//       notifications.show({ message: err.message || 'Error', color: 'red' });
//     }
//   });

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack>
//         <NumberInput
//           label="Amount"
//           withAsterisk
//           {...form.getInputProps('amount')}
//         />
//         <Textarea
//           label="Remarks"
//           placeholder="Reason for credit request"
//           {...form.getInputProps('remarks')}
//         />

//         <Group mt="md">
//           <Button type="submit" loading={mutation.isPending}>
//             Submit Request
//           </Button>
//           <Button variant="light" onClick={() => navigate(-1)}>Cancel</Button>
//         </Group>
//       </Stack>
//     </form>
//   );
// }
