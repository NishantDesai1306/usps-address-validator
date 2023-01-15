This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisite software
1. NodeJS - download and install nodejs 13.12.1 or above from https://nodejs.org/en/download/
2. Mongodb - download and install mongodb from https://www.mongodb.com/docs/manual/administration/install-community/
3. Mongodb Compass - in step 2 if mongodb compass was not installed then download and install it from https://www.mongodb.com/products/compass
    1. Open mongodb compass
    2. connect to mongodb://localhost:27017
    ![connect_db](https://raw.githubusercontent.com/NishantDesai1306/usps-address-validator/main/demo/new-connection.png)
    3. Now you should see "database" tab, press on "Create Database" button
    ![database_tab](https://raw.githubusercontent.com/NishantDesai1306/usps-address-validator/main/demo/database-tab.png)
    4. Enter "usps_address_verifier" in database name
    5. Enter "addresses" in collection name
    6. Press "Create Database" button
    ![create_database](https://raw.githubusercontent.com/NishantDesai1306/usps-address-validator/main/demo/create-database.png)

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

---
## Testing app

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
![address-form](https://raw.githubusercontent.com/NishantDesai1306/usps-address-validator/main/demo/address-form.png)

You can use this dummy address for testing
```
Address Line 1: Suite 6100
Address Line 2: 185 Berry St
City: San Francisco
State: California
Zip: 94556
```

2. Press on "Validate" button, you should see save modal popping up
![save_address_modal](https://raw.githubusercontent.com/NishantDesai1306/usps-address-validator/main/demo/save-modal.png)

3. Select "Address format" you want to save and then press "Save" button, if mongodb is running fine then you should see success message
![save_address_success](https://raw.githubusercontent.com/NishantDesai1306/usps-address-validator/main/demo/save-success.png)

4. To validate the saved information in DB
    1. open mongodb compass
    2. connect to local database if it is not connected already
    3. select "addresses" collection from sidebar
    4. press on "find" button
![validate_saved_information](https://raw.githubusercontent.com/NishantDesai1306/usps-address-validator/main/demo/db-query.png)
