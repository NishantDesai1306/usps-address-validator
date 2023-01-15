This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisite software
1. NodeJS - download and install nodejs 13.12.1 or above from https://nodejs.org/en/download/
2. Mongodb - download and install mongodb from https://www.mongodb.com/docs/manual/administration/install-community/
3. Mongodb Compass - in step 2 if mongodb compass was not installed then download and install it from https://www.mongodb.com/products/compass
  1. Open mongodb compass
  2. connect to mongodb://localhost:27017
  3. Now you should see "database" tab, press on "Create Database" button
  4. Enter "usps_address_verifier" in database name
  5. Enter "addresses" in collection name
  6. Press "Create Database" button

## Getting Started

1. Clone the repo.

2. Install npm packages

```bash
npm install
```

3. Create file `.env.local` using `env.local.sample` as reference, and provide corresponding values for the environment variables

3. Make sure your mongodb server is running.

4. run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can use this dummy address for testing
```
Address Line 1: Suite 6100
Address Line 2: 185 Berry St
City: San Francisco
State: California
Zip: 94556
```
