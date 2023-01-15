import Head from "next/head";
import { useCallback, useState } from "react";
import { Card } from "react-bootstrap";
import AddressForm from "../components/address-form";
import SaveAddressModal from "../components/save-modal";

export default function Home() {
  const [originalAddress, setOriginalAddress] = useState(null);
  const [verifiedAddress, setVerifiedAddress] = useState(null);

  return (
    <>
      <Head>
        <title>USPS Address Validator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-100 row">
        <div className="col-8 offset-2 col-sm-4 offset-sm-4">
          <Card className="w-100">
            <Card.Body>
              <Card.Title>Address Validator</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Validate/Standardizes addresses using USPS
              </Card.Subtitle>

              <hr />

              <div className="mt-4">
                <AddressForm                    
                  className="w-100"
                  onVerificationComplete={(originalAddress, verifiedAddress) => {
                    setOriginalAddress(originalAddress);
                    setVerifiedAddress(verifiedAddress);
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </div>

        <SaveAddressModal
          originalAddress={originalAddress}
          verifiedAddress={verifiedAddress}
          onClose={() => {
            setOriginalAddress(null);
            setVerifiedAddress(null);
          }}
        />
      </div>
    </>
  );
}
