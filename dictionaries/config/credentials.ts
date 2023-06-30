import * as dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

export const credentials = {
  admin: {
    username: env.SITEADMIN_USERNAME ?? 'siteadmin1',
    password: env.SITEADMIN_PASSWORD ?? 'admin'
  },
  caller: {
    username: env.CALLER_USERNAME ?? 'caller',
    password: env.CALLER_PASSWORD ?? 'admin'
  }
}
