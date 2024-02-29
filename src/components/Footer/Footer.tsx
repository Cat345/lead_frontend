import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

import TelegramLogo from '../../shared/assets/telegram.svg';

export const Footer = () => {
  return (
    <Button
      id="follow-tg"
      component={Link}
      to="https://t.me/lead_pro_service"
      target="_blank"
      sx={{
        ':hover': {
          transform: 'scale(1.05)',
        },
        transition: '.3s',
        position: 'fixed',
        bottom: '16px',
        right: '16px',
      }}
    >
      <span style={{ height: '20px', width: '20px', marginRight: '5px' }}>
        <TelegramLogo />
      </span>
      <a
        href="https://t.me/lead_pro_service"
        style={{ textDecoration: 'none', color: 'inherit' }}
        target="_blank"
      >
        Пишите нам в Telegram
      </a>
    </Button>
  );
};
