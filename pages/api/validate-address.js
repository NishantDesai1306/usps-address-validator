import addressVerify from "../../utils/usps-address-validator";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      zip
    } = req.body;

    try {
      const address = await addressVerify(addressLine1, addressLine2, city, state, zip);
      res.status(200).json(address);
    }
    catch (e) {
      console.log(e)
      res.status(500).json({
        message: "Provided address is invalid."
      });
    }
  }
  else {
    res.status(404).json({ message: "API not found" })
  }
}
