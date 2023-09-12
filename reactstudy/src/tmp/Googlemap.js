import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';

const Googlemap = () => {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState(null);
  const [center, setCenter] = useState(null);
  const [duration, setDuration] = useState('');
  const [travelMode, setTravelMode] = useState('');
  const [routeInstructions, setRouteInstructions] = useState([]);

  useEffect(() => {
    const url = `/maps/api/directions/json?origin=Boston%2C%20MA&destination=Concord%2C%20MA&waypoints=via%3ACharlestown%2CMA%7Cvia%3ALexington%2CMA&departure_time=now&key=AIzaSyAyZffxPv5S2NP2NEp_31-HH9XmDwSEWbM`;

    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        if (result.routes.length > 0) {
          const route = result.routes[0];
          setDirections(route);
          setOrigin(route.legs[0].start_location);
          setDestination(route.legs[0].end_location);
          setWaypoints(route.waypoint_order.map(index => route.legs[index].end_location));

          const lat = (route.legs[0].start_location.lat + route.legs[0].end_location.lat) / 2;
          const lng = (route.legs[0].start_location.lng + route.legs[0].end_location.lng) / 2;
          setCenter({ lat, lng });

          setDuration(route.legs[0].duration.text);
          setTravelMode(route.legs[0].steps[0].travel_mode);

          // Extract individual steps from the route and store them in routeInstructions
          const instructions = route.legs[0].steps.map(step => step.instructions);
          setRouteInstructions(instructions);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const apiKey = 'AIzaSyAyZffxPv5S2NP2NEp_31-HH9XmDwSEWbM';

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
  <div>
    <LoadScript googleMapsApiKey={apiKey}>
      {center && (
        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
          {directions && (
            <>
              <DirectionsRenderer
                directions={directions} // DirectionsResult 객체 전달
                options={{ polylineOptions: { strokeColor: '#FF0000', strokeWeight: 4 } }}
              />
            </>
          )}
          {/* DirectionsService를 DirectionsRenderer 아래로 이동 */}
          <DirectionsService
            options={{
              origin,
              destination,
              waypoints,
              travelMode, // travelMode를 상태 변수로 변경
            }}
            callback={(result) => {
              if (result !== null) {
                // setDirections(result)가 아니라 result 객체 전체를 전달
                setDirections(result);

                // Update duration and travel mode
                setDuration(result.routes[0].legs[0].duration.text);
                setTravelMode(result.routes[0].legs[0].steps[0].travel_mode);

                // Extract individual steps from the new route and update routeInstructions
                const instructions = result.routes[0].legs[0].steps.map(step => step.instructions);
                setRouteInstructions(instructions);
              }
            }}
          />
        </GoogleMap>
      )}
      <div style={{ marginTop: '10px' }}>
        {duration && <p>Estimated Duration: {duration}</p>}
        {travelMode && <p>Travel Mode: {travelMode}</p>}
        <ul>
          {routeInstructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </LoadScript>
  </div>
)};

export default Googlemap;
