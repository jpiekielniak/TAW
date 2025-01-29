const config = {
  port: process.env.PORT || 3100,
  host: process.env.HOST || '0.0.0.0',
  databaseUrl: process.env.MONGODB_URI,
  JwtSecret: 'N9Hnsko/mv+JH7t67JvWkSxanZBr0AP6FJtAoRbwn8uwA9k8hcy6N8eUN2JdIJ4p'
};

export default config;
