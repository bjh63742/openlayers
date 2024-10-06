import { useEffect, useRef, useState } from "react";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";

function Gps() {
  const mapRef = useRef(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    lon: 0,
    lat: 0,
  });

  const updatePosition = (coordinate) => {
    const [x, y] = coordinate;
    const [lon, lat] = toLonLat(coordinate);
    setPosition({ x, y, lon, lat });
  };

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

    map.on("click", (event) => {
      updatePosition(event.coordinate);
    });

    map.on("pointermove", (event) => {
      if (event.dragging) return;
      updatePosition(event.coordinate);
    });

    window.map = map;
    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="longitude">zoo level: </label>{" "}
        <div id="mouse-position">
          x={position.x} y={position.y} <br />
          lon={position.lon} lat={position.lat}{" "}
        </div>
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

export default Gps;
