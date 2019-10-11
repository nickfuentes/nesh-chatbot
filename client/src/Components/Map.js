import React, { useState } from "react";
import { connect } from "react-redux";
import Map from "google-map-react";
import Marker from "./Marker";
import { api_key } from "../config";

const WellsMap = props => {
  const getMapOptions = ({ maps: any }) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }]
        }
      ]
    };
  };

  // const [wellsinfo, setWellsInfo] = useState([])
  // const fetchWells = () => {
  //   fetch("http://localhost:5000/all-wells")
  //     .then(response => response.json())
  //     .then(json => {
  //       setWellsInfo(json)
  //     })
  // }

  // useEffect(() => {
  //   fetchWells()
  // }, [])

  const [center, setCenter] = useState({ lat: 29.7954, lng: -95.5698 });
  const [zoom, setZoom] = useState(4);
  return (
    <div style={{ height: "92vh", width: "100%" }}>
      <Map
        bootstrapURLKeys={{ key: api_key }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
      >
        {props.wellsInfo.map(well => {
          return (
            <Marker
              key={well.lat}
              lat={well.lat}
              lng={well.long}
              name="My Marker"
              color="blue"
            />
          );
        })}
      </Map>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    wellsInfo: state.query.wellsInfo
  };
};

export default connect(mapStateToProps)(WellsMap);
