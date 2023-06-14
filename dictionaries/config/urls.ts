import * as dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const env = process.env

const host = env.PFR_URL ?? 'http://localhost/'

export const urls = {
  host,
  login: `${host}auth/login`,
  callerFindLead: `${host}caller/find-lead`
}
