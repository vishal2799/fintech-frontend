import {
  Badge,
  Box,
  Button,
  Container,
  FileInput,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router';
import {
  useReplyToSupportTicket,
  useSupportTicket,
} from '../hooks/supportTicket.hooks';
import dayjs from 'dayjs';

export default function TicketDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: ticket, isLoading } = useSupportTicket(id);
  const replyMutation = useReplyToSupportTicket(id);

  const form = useForm({
    initialValues: {
      message: '',
      attachment: undefined as File | undefined,
    },
  });

  const handleReply = async (values: typeof form.values) => {
    await replyMutation.mutateAsync(values);
    form.reset();
  };

  if (isLoading || !ticket) return <Text>Loading...</Text>;

  return (
    <Container size="lg">
      <Box mb="md">
        <Title order={2} mb={4}>
          {ticket.subject}
        </Title>
        <Badge
          color={
            ticket.status === 'OPEN'
              ? 'yellow'
              : ticket.status === 'IN_PROGRESS'
              ? 'blue'
              : 'green'
          }
        >
          {ticket.status}
        </Badge>
        <Text size="sm" c="dimmed" mt={10}>
          {dayjs(ticket.createdAt).format('DD MMM YYYY, hh:mm A')}
        </Text>
        <Text mt="md">{ticket.description}</Text>
        {ticket.attachmentUrl && (
          <Text mt="xs">
            📎{' '}
            <a href={ticket.attachmentUrl} target="_blank" rel="noreferrer">
              View Attachment
            </a>
          </Text>
        )}
      </Box>

      <Stack mb="xl">
        <Title order={4}>Replies</Title>
        {ticket?.replies?.length === 0 && (
          <Text c="dimmed">No replies yet</Text>
        )}
        {ticket?.replies.map((msg) => (
          <Paper key={msg.id} p="md" shadow="xs" withBorder>
            <Text size="sm" fw={500}>
              {msg.senderType === 'USER' ? 'You' : msg.senderName}
            </Text>
            <Text size="sm" c="dimmed">
              {dayjs(msg.createdAt).format('DD MMM YYYY, hh:mm A')}
            </Text>
            <Text mt={6}>{msg.message}</Text>
            {msg.attachmentUrl && (
              <Text mt={4}>
                📎{' '}
                <a href={msg.attachmentUrl} target="_blank" rel="noreferrer">
                  View Attachment
                </a>
              </Text>
            )}
          </Paper>
        ))}
      </Stack>

      {ticket.status !== 'CLOSED' && (
        <form onSubmit={form.onSubmit(handleReply)}>
          <Stack>
            <Textarea
              label="Reply"
              autosize
              minRows={3}
              {...form.getInputProps('message')}
            />
            <FileInput
              label="Optional Attachment"
              accept="image/*,application/pdf"
              {...form.getInputProps('attachment')}
            />
            <Button type="submit" loading={replyMutation.isPending}>
              Send Reply
            </Button>
            <Button
              variant="outline"
              color="gray"
              onClick={() => navigate('/retailer/tickets')}
            >
              Back to Tickets
            </Button>
          </Stack>
        </form>
      )}
    </Container>
  );
}
