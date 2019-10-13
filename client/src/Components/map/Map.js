import React, { useState } from "react";
import { connect } from "react-redux";
import Map from "google-map-react";
import Marker from "./Marker";
import { api_key } from "../../config";
import mapStyle from "./mapStyle";

const WellsMap = props => {
  const getMapOptions = ({ maps: any }) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: mapStyle
    };
  };

  const [center] = useState({ lat: 29.7954, lng: -95.5698 });
  const [zoom] = useState(5);
  return (
    <div className="map-view">
      <Map
        bootstrapURLKeys={{ key: api_key }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
      >
        {props.wellsInfo.map((well, i) => {
          return (
            <Marker
              key={i}
              lat={well.lat}
              lng={well.long}
              name="My Marker"
              color="#1E5874"
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
