import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT  || 5050,
  jwt_secret_access_token: process.env.JWT_SECRET_ACCESS_TOKEN || 'default_access_token_secret',
  jwt_secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN || 'default_refresh_token_secret',
};


export default env;