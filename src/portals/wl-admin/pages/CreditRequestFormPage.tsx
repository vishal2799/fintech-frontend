import { Container, Title } from '@mantine/core';
import CreditRequestForm from '../components/CreditRequestForm';

export default function CreditRequestFormPage() {
  return (
    <Container size="lg">
      <Title order={2} mb="md">Request Wallet Credit</Title>
      <CreditRequestForm />
    </Container>
  );
}
