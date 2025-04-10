// utils/alertHelper.ts
import { message } from 'antd';

export const showAlert = (
  type: 'success' | 'error' | 'info' | 'warning' | 'loading',
  content: string,
  duration = 3
) => {
  message[type](content, duration);
};
