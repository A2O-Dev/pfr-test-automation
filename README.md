# PFR Test Automation

# Requirements

Node: 18

# Steps to install

1. Install dependencies

   ```shell
   npm install
   ```

2. Copy .env.example file

   ```shell
   cp .env.example .env
   ```

3. Set up environment variables in .env file

   ```
   SITEADMIN_USERNAME=put the credential
   SITEADMIN_PASSWORD=put the credential
   PFR_URL=put the url
   ```

4. Run tests

   ```shell
   npm run wdio
   ```
