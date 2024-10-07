import { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { ImageStatic, OSM, TileWMS } from "ol/source";
import { fromLonLat } from "ol/proj";
import ImageLayer from "ol/layer/Image";

export default function CustomGeoServer() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          opacity: 1,
        }),
        new TileLayer({
          source: new TileWMS({
            url: "http://172.30.1.72:8082/geoserver/tutorial/wms?service=WMS",
            params: {
              LAYERS: "nurc:Img_Sample",
              TILED: true,
            },
            serverType: "geoserver",
          }),
        }),
      ],
      view: new View({
        center: [14103205.00517622, 4294124.963399725],
        zoom: 5,
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
