import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { Alert, Button, ButtonGroup, Modal } from "react-bootstrap";

const ADDRESS_VERSION = {
  ORIGINAL: "ORIGINAL",
  STANDARDIZED: "STANDARDIZED",
};

export default function SaveAddressModal ({ originalAddress, verifiedAddress, onClose }) {
  const [isSaving, setIsSaving] = useState(false);
  const [wasSuccess, setWasSuccess] = useState(false);
  const [error, setError] = useState(null);
  const show = useMemo(() => !!originalAddress && !!verifiedAddress, [originalAddress, verifiedAddress]);
  const [selectedAddressVersion, setSelectedAddressVersion] = useState(ADDRESS_VERSION.STANDARDIZED);

  const handleSave = useCallback(async () => {
    let objToSave = {};

    if (selectedAddressVersion === ADDRESS_VERSION.ORIGINAL) {
      objToSave.addressLine1 = originalAddress.addressLine1;
      objToSave.addressLine2 = originalAddress.addressLine2;
      objToSave.state = originalAddress.state;
      objToSave.city = originalAddress.city;
      objToSave.zip = originalAddress.zip;
    }
    else if (selectedAddressVersion === ADDRESS_VERSION.STANDARDIZED) {
      objToSave.addressLine1 = verifiedAddress.street1;
      objToSave.addressLine2 = verifiedAddress.street2;
      objToSave.state = verifiedAddress.state;
      objToSave.city = verifiedAddress.city;
      objToSave.zip = verifiedAddress.zip;
    }

    try {
      setError(null);
      setIsSaving(true);
      setWasSuccess(false);

      await axios.post("/api/save-address", objToSave);
      setWasSuccess(true);
    }
    catch(e) {
      const apiMessage = e?.response?.data?.message;
      const errorMessage = apiMessage || e.toString();

      setError(errorMessage);
    }
    finally {
      setIsSaving(false);
    }

  }, [selectedAddressVersion, originalAddress, verifiedAddress]);

  if (!show) return null;

  return (
    <Modal show={!!verifiedAddress} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Save Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>
            Which address format do you want to save?
          </label>

          <ButtonGroup aria-label="Basic example">
            <Button
              variant={selectedAddressVersion === ADDRESS_VERSION.ORIGINAL ? "primary" : "secondary"}
              onClick={() => setSelectedAddressVersion(ADDRESS_VERSION.ORIGINAL)}
            >
              Original
            </Button>
            <Button
              variant={selectedAddressVersion === ADDRESS_VERSION.STANDARDIZED ? "primary" : "secondary" }
              onClick={() => setSelectedAddressVersion(ADDRESS_VERSION.STANDARDIZED)}
            >
              Standardized (USPS)
            </Button>
          </ButtonGroup>
        </div>

        <pre className="mt-4 border rounded p-2">
          <div>
            Address Line 1: {selectedAddressVersion === ADDRESS_VERSION.ORIGINAL ? originalAddress.addressLine1 : verifiedAddress.street1}
          </div>
          <div>
            Address Line 2: {selectedAddressVersion === ADDRESS_VERSION.ORIGINAL ? originalAddress.addressLine2 : verifiedAddress.street2}
          </div>
          <div>
            City: {selectedAddressVersion === ADDRESS_VERSION.ORIGINAL ? originalAddress.city : verifiedAddress.city}
          </div>
          <div>
            State: {selectedAddressVersion === ADDRESS_VERSION.ORIGINAL ? originalAddress.state : verifiedAddress.state}
          </div>
          <div>
            Zip Code: {selectedAddressVersion === ADDRESS_VERSION.ORIGINAL ? originalAddress.zip : verifiedAddress.zip}
          </div>
        </pre>

        {
          error && (
            <Alert variant="danger" className="mt-3 mb-0">
              {error}
            </Alert>
          )
        }

        {
          wasSuccess && (
            <Alert variant="success" className="mt-3 mb-0">
              Address saved successfully!
            </Alert>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}