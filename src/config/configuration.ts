export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    database: process.env.DATABASE,
    base_url: process.env.BASE_URL,
  };
};
