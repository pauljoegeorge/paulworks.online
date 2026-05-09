import React, { useEffect, useState } from "react";
import { CentralDiv } from "../../components/Div";
import { H1 } from "../../components/Text";
import Camera from "../../components/Camera";
import { useExpenses } from "../Expenses/hooks/useExpenses";

function AutoVisionTransactionContainer() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { actions, isLoading } = useExpenses([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  const handleCapture = (imageSrc) => {
    const valuesWithLocation = {
      expenses: {
        latitude,
        longitude,
        bill_image: imageSrc,
      },
    };
    actions.creatAutoeExpense(valuesWithLocation);
  };

  return (
    <CentralDiv className="text-center">
      <div className="mt-12 w-full">
        <H1>Read Receipt</H1>
        {isLoading && (
          <div className="flex justify-center mt-4">
            <div
              className="inline-block w-8 h-8 rounded-full animate-spin"
              style={{ border: "4px solid var(--border)", borderTopColor: "var(--primary)" }}
            />
          </div>
        )}
        <Camera onCapture={handleCapture} />
      </div>
    </CentralDiv>
  );
}

export default AutoVisionTransactionContainer;
