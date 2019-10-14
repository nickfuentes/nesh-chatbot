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

  const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    props.wellsInfo.forEach(place => {
      bounds.extend(new maps.LatLng(place.lat, place.long));
    });
    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
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
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          apiIsLoaded(map, maps, props.wellsInfo)
        }
      >
        {props.wellsInfo.map((well, i) => {
          return (
            <Marker
              key={i}
              lat={well.lat}
              lng={well.long}
              name="Well"
              color="#f4e141"
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
