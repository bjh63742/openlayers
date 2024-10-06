import { useEffect, useRef } from "react";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { StadiaMaps } from "ol/source";
import { fromLonLat } from "ol/proj";

function DefaltMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new StadiaMaps({
            layer: "stamen_watercolor",
            // apiKey: 'OPTIONAL'
          }),
        }),
        new TileLayer({
          source: new StadiaMaps({
            layer: "stamen_terrain_labels",
            // apiKey: 'OPTIONAL'
          }),
        }),
        // new TileLayer({
        //   source: new OSM(),
        //   opacity: 1,
        // }),
      ],
      view: new View({
        center: fromLonLat([69.24843722816026, 41.31653827549364]),
        zoom: 14,
      }),
    });

    window.map = map;
    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div>
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

export default DefaltMap;
