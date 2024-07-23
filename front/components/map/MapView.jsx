"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import shp from 'shpjs'; // Asegúrate de que shpjs está instalado
import L from 'leaflet';

const MapView = ({ markers, shapefileUrl }) => {
  const [map, setMap] = useState(null);
  const [geoJsonLayer, setGeoJsonLayer] = useState(null);

  const MapInitializer = () => {
    const leafletMap = useMap();
    useEffect(() => {
      setMap(leafletMap);
    }, [leafletMap]);

    return null;
  };

  useEffect(() => {
    console.log("Shapefile URL changed:", shapefileUrl); // Agrega esta línea para verificar los cambios
  
    const fetchShapefile = async () => {
      if (!shapefileUrl || !map) return;
    
      const correctedShapefileUrl = `http://localhost:4000${shapefileUrl}`;
      console.log("Fetching shapefile from:", correctedShapefileUrl); // Verifica la URL en consola
    
      try {
        const response = await fetch(correctedShapefileUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch shapefile');
        }
    
        const arrayBuffer = await response.arrayBuffer();
        const geojson = await shp(arrayBuffer);
    
        console.log("GeoJSON data:", geojson); // Verifica el contenido del GeoJSON
    
        // Limpia el mapa antes de agregar nuevos datos
        if (geoJsonLayer) {
          map.removeLayer(geoJsonLayer);
        }
    
        const newGeoJsonLayer = L.geoJSON(geojson).addTo(map);
        setGeoJsonLayer(newGeoJsonLayer);
      } catch (error) {
        console.error("Error loading shapefile:", error);
      }
    };
    

  
    fetchShapefile();
  }, [shapefileUrl, map]);
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
      
      <MapInitializer />
    </MapContainer>
  );
};

export default MapView;
