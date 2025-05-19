import React, { useEffect, useState } from "react";
import { CentralDiv } from "../../components/Div";
import { CustomRow as Row } from "../../components/Table";
import { H1 } from "../../components/Text";
import Camera from "../../components/Camera";
import { useExpenses } from "../Expenses/hooks/useExpenses";

function AutoVisionTransactionContainer() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { actions } = useExpenses([]);

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
    <CentralDiv
      className="justify-content-center text-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="mt-5 w-100 justify-content-center text-center">
        <H1>Read Receipt</H1>
        <Camera onCapture={handleCapture} />
      </Row>
    </CentralDiv>
  );
}

export default AutoVisionTransactionContainer;
