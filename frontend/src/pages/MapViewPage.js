import React, { useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import './ProfessionalDashboard.css';

const API_KEY = "AIzaSyDOCireVjGcMsogwraXrWDsfiOjUUOVuWs";
const BIEC_CENTER = { lat: 13.0748, lng: 77.4952 };

// More accurate coordinates for BIEC Halls
const ZONES_CONFIG = {
  HALL_1: {
    path: [
      { lat: 13.0748, lng: 77.4965 },
      { lat: 13.0752, lng: 77.4982 },
      { lat: 13.0736, lng: 77.4988 },
      { lat: 13.0732, lng: 77.4971 },
    ]
  },
  HALL_2: {
    path: [
        { lat: 13.0732, lng: 77.4990 },
        { lat: 13.0736, lng: 77.5007 },
        { lat: 13.0721, lng: 77.5012 },
        { lat: 13.0716, lng: 77.4995 },
    ]
  },
  HALL_3: {
    path: [
        { lat: 13.0716, lng: 77.4973 },
        { lat: 13.0720, lng: 77.4990 },
        { lat: 13.0705, lng: 77.4995 },
        { lat: 13.0701, lng: 77.4978 },
    ]
  }
};

const DISPATCH_ROUTE = [
    { lat: 13.071, lng: 77.496 },
    { lat: 13.073, lng: 77.497 },
    { lat: 13.074, lng: 77.498 },
];

const MapViewPage = ({ simulationStatus, anomalySimulationState }) => {
  const [zones, setZones] = useState(ZONES_CONFIG);

  React.useEffect(() => {
    const newZoneOptions = {
        fillOpacity: 0.4,
        strokeOpacity: 1,
        strokeWeight: 2,
    };
    
    if (simulationStatus === 'resolved') {
        newZoneOptions.fillColor = '#00FF00'; // Green
        newZoneOptions.strokeColor = '#00FF00';
    } else {
        newZoneOptions.fillColor = '#FF0000'; // Red
        newZoneOptions.strokeColor = '#FF0000';
    }

    // Update the zones with new colors
    const updatedZones = { ...ZONES_CONFIG };
    for (const key in updatedZones) {
        updatedZones[key].options = newZoneOptions;
    }
    setZones(updatedZones);

  }, [simulationStatus]);


  return (
    <div className="main-feed-screen map-view">
      <APIProvider apiKey={API_KEY}>
        <Map
            defaultCenter={BIEC_CENTER}
            defaultZoom={16}
            mapId="drishti-map-view"
            disableDefaultUI={true}
        >
            <Polygons zones={zones} />
            {anomalySimulationState === 'dispatch-route' && <DispatchRoute />}
            {anomalySimulationState === 'echo-pulse' && <EchoPulse />}
            {anomalySimulationState === 'chimera-drones' && <ChimeraDrones />}
        </Map>
      </APIProvider>
    </div>
  );
};

const Polygons = ({ zones }) => {
    const map = useMap();
    const maps = useMapsLibrary('maps');

    React.useEffect(() => {
        if (!map || !maps) return;

        const polygons = Object.values(zones).map(zone => {
            const polygon = new maps.Polygon({
                paths: zone.path,
                ...zone.options
            });
            polygon.setMap(map);
            return polygon;
        });

        return () => {
            polygons.forEach(polygon => polygon.setMap(null));
        };
    }, [map, maps, zones]);

    return null;
}

const DispatchRoute = () => {
    const map = useMap();
    const maps = useMapsLibrary('maps');
    const markerLib = useMapsLibrary('marker');

    React.useEffect(() => {
        if (!map || !maps || !markerLib) return;

        const route = new maps.Polyline({
            path: DISPATCH_ROUTE,
            geodesic: true,
            strokeColor: '#FFFF00',
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });

        const unitMarker = new markerLib.Marker({
            position: DISPATCH_ROUTE[0],
            map: map,
            title: 'Unit S-14',
            icon: {
                path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 6,
                strokeColor: '#FFFF00',
                fillColor: '#FFFF00',
                fillOpacity: 1,
            }
        });

        route.setMap(map);

        return () => {
            route.setMap(null);
            unitMarker.setMap(null);
        };
    }, [map, maps, markerLib]);

    return null;
};

const EchoPulse = () => {
    const map = useMap();
    if (!map) return null;

    return <div className="echo-pulse-container" style={{position: 'absolute', top: '50%', left: '50%'}}><div className="echo-pulse"></div></div>;
}

const ChimeraDrones = () => {
    const map = useMap();
    if (!map) return null;

    // Simple drone icon positions for the demo
    const dronePositions = [
        { lat: 13.074, lng: 77.4975 },
        { lat: 13.073, lng: 77.4985 },
    ];

    return (
        <>
            {dronePositions.map((pos, i) => (
                <div key={i} className="drone-icon" style={{position: 'absolute', top: `${50 + (i*2)}%`, left: `${50 + (i*2)}%`}}></div>
            ))}
        </>
    );
};

export default MapViewPage; 