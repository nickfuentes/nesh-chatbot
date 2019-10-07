import React, { useState, useEffect } from "react"
import Map from "google-map-react"
import Marker from "./Marker"
import { api_key } from "../config"

const WellsMap = () => {
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
    }
  }

  const [wellsinfo, setWellsInfo] = useState([])
  const fetchWells = () => {
    fetch("http://localhost:3001/all-wells")
      .then(response => response.json())
      .then(json => {
        setWellsInfo(json)
      })
  }

  useEffect(() => {
    fetchWells()
  }, [])

  const [center, setCenter] = useState({ lat: 29.7954, lng: -95.5698 })
  const [zoom, setZoom] = useState(11)
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        bootstrapURLKeys={{ key: api_key }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
      >
        {wellsinfo.map(well => {
          return (
            <Marker
              lat={well.surfaceHoleLatitude}
              lng={well.surfaceHoleLongitude}
              name="My Marker"
              color="blue"
            />
          )
        })}
      </Map>
    </div>
  )
}

export default WellsMap
