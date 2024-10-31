import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.URL_HOST_BACK,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_BASE_URL}`,
};
