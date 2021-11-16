import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import getCenter from "geolib/es/getCenter"

function Map({searchResults}) {
  const [selectedLocation, setSelectedLocation] = useState({})

  // Transform the searchResults object into geolib syntax{ latitude: 52.518611, longitude: 13.408056 }
  const coordinates = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  // The latitude and longtitude of the center of locations coordinates
  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })

  return <ReactMapGL
    mapStyle='mapbox://styles/vinxe08/ckvz4cuxp79rd14m6ibr493q7'
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport} 
    onViewportChange={(nextViewport) => setViewport(nextViewport) }
  >
    {searchResults.map((result) => (
      <div>
        <Marker 
          longitude={result.long}
          latitude={result.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">📌</p>
        </Marker>

        {selectedLocation.long === result.long ? (
          <Popup
            onClose={() => setSelectedLocation({})}
            closeOnClick={true}
            latitude={result.lat}
            longitude={result.long}
          >
            {result.title}
          </Popup>
        ): (
          false)}
      </div>
    ))}
  </ReactMapGL>
}

export default Map
