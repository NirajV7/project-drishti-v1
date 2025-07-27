import React, { useState, useEffect } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import './ProfessionalDashboard.css';

const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your key
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
const KOSH_VECTOR_PATH = [
    { lat: 13.0760, lng: 77.4940 },
    { lat: 13.0755, lng: 77.4965 },
    { lat: 13.0740, lng: 77.4970 },
    { lat: 13.0735, lng: 77.4950 } // Discovery point
];
const STAFF_DISPATCH_PATH = [
    { lat: 13.0725, lng: 77.4980 }, // Start point for staff
    { lat: 13.0735, lng: 77.4950 }  // End point (backpack location)
];

const MapViewPage = ({ simulationStatus, anomalySimulationState, koshState }) => {
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
            {koshState === 'searching' && <KoshSearchAnimation />}
            {koshState === 'located' && <KoshDiscovery />}
            {(koshState === 'dispatched' || koshState === 'complete') && <KoshStaffDispatch />}
        </Map>
      </APIProvider>
      {koshState === 'located' && (
          <div className="backpack-video-feed">
              <div className="panel-header">ITEM LOCATED: G-45</div>
              <video src="/backpack_found.mp4" autoPlay loop muted />
          </div>
      )}
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

const KoshSearchAnimation = () => {
    const map = useMap();
    const maps = useMapsLibrary('maps');

    useEffect(() => {
        if (!map || !maps) return;

        const vectorPath = new maps.Polyline({
            path: KOSH_VECTOR_PATH,
            geodesic: true,
            strokeColor: '#FFFF00',
            strokeOpacity: 0.8,
            strokeWeight: 6,
        });

        vectorPath.setMap(map);
        // In a real app, the scanning animation would be more complex
        // For this demo, the path itself represents the search
        
        return () => { vectorPath.setMap(null); };
    }, [map, maps]);

    return null;
};

const KoshDiscovery = () => {
    const map = useMap();
    const markerLib = useMapsLibrary('marker');

    useEffect(() => {
        if (!map || !markerLib) return;

        const discoveryMarker = new markerLib.Marker({
            position: KOSH_VECTOR_PATH[KOSH_VECTOR_PATH.length - 1],
            map: map,
            title: 'Backpack Located',
            icon: {
                path: 'M 0, -1 L 0.5878, -0.809 L 0.9511, -0.309 L 0.9511, 0.309 L 0.5878, 0.809 L 0, 1 L -0.5878, 0.809 L -0.9511, 0.309 L -0.9511, -0.309 L -0.5878, -0.809 Z',
                fillColor: '#FFD700',
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#FFFFFF',
                scale: 25,
            },
        });

        return () => { discoveryMarker.setMap(null); };
    }, [map, markerLib]);

    return null;
};

const KoshStaffDispatch = () => {
    const map = useMap();
    const maps = useMapsLibrary('maps');
    const markerLib = useMapsLibrary('marker');

    useEffect(() => {
        if (!map || !maps || !markerLib) return;

        const staffPath = new maps.Polyline({
            path: STAFF_DISPATCH_PATH,
            geodesic: true,
            strokeColor: '#1890ff',
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });

        const staffMarker = new markerLib.Marker({
            position: STAFF_DISPATCH_PATH[0],
            map: map,
            title: 'Staff E-38',
            // Simple dot icon for staff
            icon: {
                path: 'M -1, 0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0',
                fillColor: '#1890ff',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8,
            },
        });

        staffPath.setMap(map);
        staffMarker.setMap(map);

        return () => {
            staffPath.setMap(null);
            staffMarker.setMap(null);
        };
    }, [map, maps, markerLib]);

    return null;
};

export default MapViewPage; 