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
            url: "http://172.30.1.72:8082/geoserver/tutorial/wms",
            params: {
              layers: "TL_SCCO_CTPRVN",
              formate: "image/png",
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

// http://172.30.1.72:8082/geoserver/tutorial/wms?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&STYLES=&TRANSPARENT=true&layers=nurc%3AImg_Sample&formate=image%2Fpng&request=GetMap&FORMAT_OPTIONS=dpi%3A180&WIDTH=512&HEIGHT=512&CRS=EPSG%3A3857&BBOX=12523442.714243278%2C2504688.542848654%2C13775786.985667605%2C3757032.814272982
