import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
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
  height: 100vh;
  margin-top: 50px;
`;

function MapViewContainer() {
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
        style={{ width: "100%", height: "90%" }}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
        />
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
