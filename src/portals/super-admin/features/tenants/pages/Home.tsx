import {  Container, Flex } from "@mantine/core"
import { NavLink } from "react-router"

const Home = () => {
  return (
        <Container h={'100vh'}>
            <Flex
            h={'100%'}
      gap="md"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
    >
                    <NavLink to="/super-admin" className="bg-primary p-4 text-white rounded-sm">Super Admin Dashboard</NavLink>
    </Flex>
        </Container>
  )
}

export default Home