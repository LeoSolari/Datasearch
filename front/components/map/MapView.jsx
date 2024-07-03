"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Link from "next/link";

const MapView = ({ markers }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet-defaulticon-compatibility");
      import(
        "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
      );
    }
  }, []);

  if (!markers || markers.length === 0) {
    return <div>No hay marcadores disponibles</div>;
  }

  return (
    <MapContainer
      center={[-38.504912173936795, -68.36843939858379]}
      zoom={6}
      className="rounded-lg overflow-hidden shadow-md"
      style={{ width: "1800px", height: "600px" }}
    >
      <TileLayer
        url='https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
        noWrap={true}
        minZoom={3}
      />
      {markers.map((marker) => (
        <Marker key={marker.uwi} position={[marker.lat, marker.long]}>
          <Popup>
            <Link
              href={`/openWorks/wellHeaders/${marker.id}`}
              className="text-blue-500 hover:underline"
            >
              WELL NAME: {marker.uwi}
            </Link>
            <p>Lat: {marker.lat}</p>
            <p>Long: {marker.long}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
