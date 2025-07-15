import {
  Menu,
  Avatar,
  Text,
  UnstyledButton,
  Group,
  Divider,
} from '@mantine/core';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';
import { notifications } from '@mantine/notifications';

export default function UserAvatarMenu() {
  const navigate = useNavigate();

const user = useAuthStore((state) => state.user);
const logout = useAuthStore((state) => state.logout);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Avatar radius="xl" color="blue">
              {initials}
            </Avatar>
            {/* <Text size="sm">{user?.name || 'User'}</Text> */}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item
          leftSection={<IconUser size={14} />}
          onClick={() => navigate('/profile')}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSettings size={14} />}
          onClick={() => navigate('/change-password')}
        >
          Change Password
        </Menu.Item>

        <Divider />
        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={() => {
            logout().then(() => {
  notifications.show({ message: 'Logged out successfully', color: 'green' });
  navigate('/login');
});
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
