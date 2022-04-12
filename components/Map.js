import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import Image from "next/image";

const Map = ({ searchResults, className }) => {
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
    
  }));

  // console.log(coordinates);

  const { latitude, longitude } = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 11,
  });

  
  const [selectedLocation, setSelectedLocation] = useState({
    description:
      "2 guests | 1 bed | 1 T&B | Wifi",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Island_Shangri-La%2C_Hong_Kong_-_Horizon_Harbour_View_Room.JPG/640px-Island_Shangri-La%2C_Hong_Kong_-_Horizon_Harbour_View_Room.JPG",
    lat: 14.55363,
    location: "Makati, Philippines",
    long: 121.02473,
    price: "₱50 per night",
    star: 4.9,
    title: "Horizon Harbour View Room",
    total: "₱15000",
  });

  return (
    <ReactMapGL
      mapStyle= "mapbox://styles/cededuarte/cl1wj0fu4001314ujx3gdc462"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      width="100%"
      height="100%"
      className={className}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetTop={-15}
            offsetLeft={-15}
          >
            <p
              onClick={() => {
                setSelectedLocation(result);
              }}
              role="image"
              aria-label="push-pin"
            >
              <LocationMarkerIcon className="h-5 text-red-400 animate-bounce cursor-pointer" />
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
              className="w-[150px] h-[250px] z-50 rounded-lg"
            >
              <Image
                src={result.img}
                height="170px"
                width="150px"
                objectFit="cover"
              />
              <br />
              <span className="text-md font-mono font-medium">
                {result.title}
              </span>
              <br />
              <span className="text-sm font-mono font-medium">
                {result.price}
              </span>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
