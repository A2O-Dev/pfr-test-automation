import * as dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

export const urls = {
  host: env.PFR_URL ?? 'http://localhost/',
  login: `${env.PFR_URL ?? 'http://localhost/'}auth/login`,
  callerFindLead: `${env.PFR_URL ?? 'http://localhost/'}caller/find-lead`
}
