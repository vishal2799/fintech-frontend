import { Button, Container, Title, Text } from "@mantine/core";
// import { useNavigate } from "react-router";

export const LandingPage = () => {
//   const navigate = useNavigate();

  return (
    <Container size="md" style={{ textAlign: "center", marginTop: "5rem" }}>
      <Title order={1}>Welcome to VMudra Portal</Title>
      <Text size="lg" mt="md">
        Manage your tenants, employees, and services efficiently.
      </Text>
      <Button
        mt="xl"
        onClick={() => window.location.href = "/super-admin"}
        size="lg"
      >
        Go to Super Admin
      </Button>
    </Container>
  );
};
