import USStates from "../us-states.json";
import * as Yup from "yup";

const validationSchema = Yup.object({
  addressLine1: Yup.string()
    .required('Field is required'),
  addressLine2: Yup.string()
    .required('Field is required'),
  city: Yup.string()
    .required('Field is required'),
  state: Yup.string()
    .oneOf(USStates.map(({ value }) => value), "Invalid state selected")
    .length(2, "Invalid state selected")
    .required('Field is required'),
  zip: Yup.string()
    .matches(/^[0-9]{5}$/, "Entered zip code is invalid")
    .required('Field is required')
});

export default validationSchema;