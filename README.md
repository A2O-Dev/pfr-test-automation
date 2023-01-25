# PFR Test Automation

# Requirements

Node: 18

# Steps to install

1. Install dependencies

   ```shell
   npm install
   ```

2. Run tests

   ```shell
   npm run wdio
   ```

# Steps to install environment variable

1. Place the data corresponding to the environment variables.

   ```in the .env.example
   SITEADMIN_USERNAME=put the credential
   SITEADMIN_PASSWORD=put the credential
   PFR_URL=put the url
   ```
2. Execute the next commad
   ```in the terminal of the VScode
   cp .env.example .env