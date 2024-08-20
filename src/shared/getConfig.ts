export const getConfig = () => {
  const config = {
    TG_BOT_USERNAME: import.meta.env.VITE_TG_BOT_USERNAME!,
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL!,
  };

  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`${key} не найден в .env`);
    }
  });

  return config;
};
