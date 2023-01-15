import USPS from "usps-webtools";

const usps = new USPS({
  server: 'http://production.shippingapis.com/ShippingAPI.dll',
  userId: process.env.USPS_WEB_TOOLS_USERNAME,
  ttl: 10000
});

export default function addressVerify(addressLine1, addressLine2, city, state, zip) {
  return new Promise((resolve, reject) => {
    usps.verify({
      street1: addressLine1,
      street2: addressLine2,
      city,
      state,
      zip,
    }, (err, address) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(address);
    });
  })
}