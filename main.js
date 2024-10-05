import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat, Projection } from "ol/proj";
import OSM from "ol/source/OSM";

const map = new Map({
  target: "map",
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
