import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Link from "next/link";

const MapView = ({ markers }) => {
  if (!markers || markers.length === 0) {
    return <div>No hay marcadores disponibles</div>;
  }

  return (
    <MapContainer
      center={[-38.504912173936795, -68.36843939858379]}
      zoom={6}
      className="rounded-lg overflow-hidden shadow-md"
      style={{ width: "800px", height: "450px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
        minZoom={3}
      />
      {markers.map((marker) => (
        <Marker key={marker.uwi} position={[marker.lat, marker.long]}>
          <Popup>
            <Link
              href={`/datos/${marker.id}`}
              className="text-blue-500 hover:underline"
            >
              UWI: {marker.uwi}
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
