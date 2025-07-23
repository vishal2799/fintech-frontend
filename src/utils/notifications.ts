// src/utils/notifications.ts
import { notifications } from '@mantine/notifications';

export const showSuccess = (res: any, fallback = 'Success') => {
  notifications.show({
    message: res?.message || fallback,
    color: 'green',
  });
};

export const showError = (err: any, fallback = 'Something went wrong') => {
  const message =
    err?.response?.data?.message || err?.message || fallback;
  notifications.show({ message, color: 'red' });
};
