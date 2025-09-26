import { Container, Title } from '@mantine/core';
import CreditRequestForm from '../components/CreditRequestForm';

export default function CreditRequestFormPageRetailer() {
  return (
    <Container fluid size="lg">
      <Title order={2} mb="md">Request Wallet Credit</Title>
      <CreditRequestForm />
    </Container>
  );
}
