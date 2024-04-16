import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const DataView = ({ UWI, lat, long }) => {
  return (
    <MapContainer center={[lat, long]} zoom={6} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
        minZoom={4}
      />

      <Marker key={UWI} position={[lat, long]}>
        <Popup>
          <p>Lat: {lat}</p>
          <p>Long: {long}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default DataView;
