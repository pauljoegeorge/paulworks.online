import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, Circle } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import L from "leaflet";
import styled from "styled-components";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useExpenses } from "../Expenses/hooks/useExpenses";
import { addDateToUrl } from "../../utils/utils";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 64px);
`;

function MapViewContainer() {
  const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
  const [selectedMonth, setSelectedMonth] = useState();
  const { actions, expenses } = useExpenses([]);
  const expensesWithLocation = expenses.filter(
    (expense) => expense.latitude && expense.longitude
  );
  const defaultPosition = [35.682839, 139.759455];
  const defaultRadius = 200;

  const circles = expensesWithLocation.map((expense) => ({
    center: [expense.latitude, expense.longitude],
    radius: defaultRadius,
  }));

  const markers = expensesWithLocation.map((expense) => ({
    position: [expense.latitude, expense.longitude],
    content: `${expense.category_names}: ${expense.amount_spent}`,
  }));

  const customIcon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      actions.getGroupedExpenses(selectedMonth);
    }
  }, [selectedMonth]);

  return (
    <Wrapper>
      <MapContainer
        center={circles.length === 0 ? defaultPosition : circles[0].center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <ReactLeafletGoogleLayer apiKey={googleMapsKey} type="roadmap" />
        {circles.map((circle) => (
          <Circle center={circle.center} radius={circle.radius} />
        ))}

        {markers.map((marker) => (
          <Marker position={marker.position} icon={customIcon}>
            <Popup>{marker.content}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Wrapper>
  );
}

export default MapViewContainer;
