import { useEffect, useRef, useState } from "react";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";

function Zoom() {
  const mapRef = useRef(null);

  const [map, setMap] = useState(null);

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
    window.map = map;
    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="longitude">zoo level: </label>
        <button
          onClick={() => {
            map.getView().setZoom(map.getView().getZoom() + 1);
          }}
        >
          zoom up
        </button>
        <button
          onClick={() => {
            map.getView().setZoom(map.getView().getZoom() - 1);
          }}
        >
          zoom down
        </button>
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

export default Zoom;
