import axios from "axios";
import { Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import validationSchema from "../utils/validator-schema/address";
import Input from "./input";
import USStates from "../utils/us-states.json";

export default function AddressForm({ className, onVerificationComplete }) {
  const [isInvalid, setIsInvalid] = useState(false);
  const stateOptions = useMemo(() => {
    return [
      { title: "(select)", disabled: true, value: "" },
      ...USStates,
    ]
  }, []);

  const handleSubmit = useCallback(async (values, actions) => {
    const { addressLine1, addressLine2, city, state, zip } = values;

    actions.setSubmitting(true);

    try {
      setIsInvalid(false);
      const {
        data: verifiedAddress,
      } = await axios.post("/api/validate-address", { addressLine1, addressLine2, city, state, zip });
      onVerificationComplete(values, verifiedAddress);
    }
    catch (e) {
      setIsInvalid(true);
      console.log(e); 
    }
    finally {
      actions.setSubmitting(false);
    }
  }, [onVerificationComplete]);

  return (
    <Formik
      initialValues={{
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: ""
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange
    >
      {
        (props) => (
          <Form className={className}>
            <Input
              className="mb-3"
              label="Address Line 1"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.addressLine1}
              name="addressLine1"
              error={props.touched.addressLine1 && props.errors.addressLine1}
            />

            <Input
              className="mb-3"
              label="Address Line 2"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.addressLine2}
              name="addressLine2"
              error={props.touched.addressLine2 && props.errors.addressLine2}
            />

            <Input
              className="mb-3"
              label="City"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.city}
              name="city"
              error={props.touched.city && props.errors.city}
            />

            <Input
              type="select"
              className="mb-3"
              label="State"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.state}
              name="state"
              options={stateOptions}
              error={props.touched.state && props.errors.state}
            />

            <Input
              className="mb-3"
              label="Zip Code"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.zip}
              name="zip"
              error={props.touched.zip && props.errors.zip}
            />

            {
              isInvalid && (
                <Alert variant="danger" className="mt-3 mb-0">
                  Entered address is invalid.
                </Alert>
              )
            }
            
            <div className="mt-4 d-flex justify-content-center">
              <Button
                variant="primary"
                size="lg"
                type="button"
                onClick={props.submitForm}
                disabled={props.isSubmitting || Object.keys(props.errors).length > 0}
              >
                {props.isSubmitting ? 'Validating...' : 'Validate'}
              </Button>
            </div>
          </Form>
        )
      }
    </Formik>
  );
}
