import validator from "../../middleware/validator";
import Address from "../../models/address";
import validationSchema from "../../utils/validator-schema/address";

async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      zip
    } = req.body;

    try {
      const address = new Address({
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
      });
      
      var createdDocument = await address.save();
      return res.status(200).send(createdDocument);
    }
    catch (e) {
      console.log(e)
      res.status(500).json({
        message: "Something went wrong."
      });
    }
  }
  else {
    res.status(404).json({ message: "API not found" })
  }
}

export default validator("body", validationSchema, handler);