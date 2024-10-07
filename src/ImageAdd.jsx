import { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { ImageStatic, OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import ImageLayer from "ol/layer/Image";

export default function ImageAdd() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          opacity: 1,
        }),
      ],
      view: new View({
        center: fromLonLat([69.24843722816026, 41.31653827549364]),
        zoom: 14,
      }),
    });

    const ImageSource = new ImageStatic({
      url: "nation.png",
      imageExtent: map.getView().calculateExtent(),
    });

    const myLayer = new ImageLayer({
      source: ImageSource,
    });

    map.addLayer(myLayer);

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
