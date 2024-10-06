import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";

function App() {
  const mapRef = useRef(null);

  const [map, setMap] = useState(null);
  const [lon, setLon] = useState(127.12);
  const [lat, setLat] = useState(37.41);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([69.24843722816026, 41.31653827549364]),
        zoom: 14,
      }),
    });

    setMap(map);
    return () => {
      map.setTarget(null);
    };
  }, []);

  const moveMap = () => {
    if (map) {
      const newCenter = fromLonLat([parseFloat(lon), parseFloat(lat)]);
      map.getView().setCenter(newCenter);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="longitude">Longitude: </label>
        <input
          type="text"
          id="longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />
        <label htmlFor="latitude">Latitude: </label>
        <input
          type="text"
          id="latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <button onClick={moveMap}>Go to Location</button>
      </div>

      <div
        ref={mapRef}
        style={{
          height: "400px",
          width: "100%",
        }}
      />
    </div>
  );
}

export default App;
