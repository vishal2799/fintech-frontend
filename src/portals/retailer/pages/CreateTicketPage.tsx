// import {
//   Button,
//   Container,
//   FileInput,
//   Select,
//   TextInput,
//   Textarea,
//   Title,
//   Stack,
// } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { useCreateSupportTicket } from '../hooks/supportTicket.hooks';
// import { type CreateSupportTicketInput, createSupportTicketSchema } from '../schema/supportTicket.schema';
// import { useNavigate } from 'react-router';
// import { zod4Resolver } from 'mantine-form-zod-resolver';

// export default function CreateTicketPage() {
//   const navigate = useNavigate();
//   const createMutation = useCreateSupportTicket();

//   const form = useForm<CreateSupportTicketInput>({
//     validate: zod4Resolver(createSupportTicketSchema),
//     initialValues: {
//       subject: '',
//       description: '',
//       category: '',
//       attachment: undefined,
//     },
//   });

//   const handleSubmit = async (values: CreateSupportTicketInput) => {
//     await createMutation.mutateAsync(values);
//     navigate('/retailer/tickets');
//   };

//   return (
//     <Container size="lg">
//       <Title mb="md">Create Support Ticket</Title>
//       <form onSubmit={form.onSubmit(handleSubmit)}>
//         <Stack>
//           <Select
//             label="Category"
//             data={['TRANSACTION', 'technical', 'kyc', 'OTHER']}
//             {...form.getInputProps('category')}
//             placeholder="Select category"
//           />
//           <TextInput label="Subject" {...form.getInputProps('subject')} />
//           <Textarea
//             label="Description"
//             minRows={4}
//             autosize
//             {...form.getInputProps('description')}
//           />
//           <FileInput
//             label="Optional Attachment"
//             accept="image/*,application/pdf"
//             {...form.getInputProps('attachment')}
//           />
//           <Button type="submit" loading={createMutation.isPending}>
//             Submit Ticket
//           </Button>
//         </Stack>
//       </form>
//     </Container>
//   );
// }
