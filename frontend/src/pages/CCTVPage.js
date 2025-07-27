import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext'; 
import AlertModal from '../components/common/AlertModal';
import AIChatPanel from './AIChatPanel';
import './ProfessionalDashboard.css';

const initialCameraData = {
    1: { 
        name: "West Seating Area",
        capacity: 50,
        video: '/zone-c.mp4',
        jsonData: '/crowd_data_zone_c.json'
    },
    2: { 
        name: "Entrance",
        capacity: 75,
        video: '/zone-b.mp4',
        jsonData: '/crowd_data_zone_b.json'
    },
    3: { 
        name: "Main Stage",
        capacity: 100,
        video: '/zone-a.mp4',
        jsonData: '/crowd_data_zone_a.json'
    },
};

export default function CCTVPage({ setActivePage, setGhostProtocolScenarioId, anomalySimulationState, isKiliDroneActive }) {
    const { userRole } = useAuth();
    const [selectedFeed, setSelectedFeed] = useState(1);
    const [headcountData, setHeadcountData] = useState({});
    const [liveCounts, setLiveCounts] = useState({});
    const [cameraData, setCameraData] = useState(initialCameraData);
    const [isSimulating, setIsSimulating] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [selectedFeedStats, setSelectedFeedStats] = useState({ capacityPercent: 0, oxygenLevel: 20.9, deviceDensity: 0 });
    const [anomalyAlert, setAnomalyAlert] = useState(null);
    const [showAtmosphericSensors, setShowAtmosphericSensors] = useState(false);
    
    const mainVideoRef = useRef(null);
    const thumbVideoRefs = useRef({});
    const simulationIntervalRef = useRef(null);

    useEffect(() => {
        if (isKiliDroneActive) {
            setCameraData(prev => ({
                ...prev,
                '4': {
                    id: '4',
                    name: 'KILI DRONE - LIVE',
                    video: '/kili_drone_feed.mp4',
                    data: null, // No crowd data for the drone
                    capacity: 0,
                }
            }));
            setSelectedFeed('4'); // Switch to the drone feed
        }
    }, [isKiliDroneActive]);

    // Fetch initial data for all cameras or reset to it
    useEffect(() => {
        if (!isSimulating) {
            setCameraData(initialCameraData); // Reset video sources
            Object.keys(initialCameraData).forEach(id => {
                fetch(`${initialCameraData[id].jsonData}?t=${new Date().getTime()}`)
                    .then(response => response.json())
                    .then(data => {
                        setHeadcountData(prevData => ({ ...prevData, [id]: data }));
                    })
                    .catch(error => console.error('Error fetching headcount data:', error));
            });
        }
    }, [isSimulating]);
    
    // Effect to run and clean up the simulation timer
    useEffect(() => {
        if (isSimulating) {
            const simulationStartTime = Date.now();
            const simulationDuration = 8000; // 8 seconds in milliseconds
            const startCount = 10; // 20% of 50 capacity
            const endCount = 32;   // 64% of 50 capacity

            simulationIntervalRef.current = setInterval(() => {
                const elapsedTime = Date.now() - simulationStartTime;
                const progress = Math.min(elapsedTime / simulationDuration, 1);

                const currentCount = Math.round(startCount + (endCount - startCount) * progress);
                const capacityPercent = Math.round((currentCount / initialCameraData[1].capacity) * 100);
                const oxygenLevel = 20.9 - (capacityPercent / 100) * 1.5;
                const deviceDensity = Math.round(currentCount * 1.2);

                setSelectedFeedStats({ capacityPercent, oxygenLevel, deviceDensity });
                setLiveCounts(prev => ({ ...prev, 1: currentCount }));

                if (progress >= 1) {
                    clearInterval(simulationIntervalRef.current);
                    setShowAlert(true); // Trigger alert when simulation finishes
                }
            }, 100); // Update every 100ms for smooth transition
        }
        
        return () => {
            if (simulationIntervalRef.current) {
                clearInterval(simulationIntervalRef.current);
            }
        };
    }, [isSimulating]);

    // Effect for the new multimodal anomaly simulation
    useEffect(() => {
        if (anomalySimulationState === 'ambiguous-smoke') {
            // Swap video for service area (assuming it's camera 1)
            setCameraData(prev => ({
                ...prev,
                1: { ...prev[1], video: '/light_smoke.mp4' }
            }));
            setAnomalyAlert({
                type: 'low-priority',
                message: 'VISUAL ANOMALY: Possible smoke detected in Service Area. Low confidence.'
            });
            setShowAtmosphericSensors(false);
        } else if (anomalySimulationState === 'fire-confirmed') {
            setAnomalyAlert({
                type: 'high-priority',
                message: 'ALERT UPGRADED: Fire Confirmed by Atmospheric Sensors! O2 dropping, CO detected. Confidence: 99.8%.'
            });
            setShowAtmosphericSensors(true);
        } else if (anomalySimulationState === 'chimera-deployed') {
            // Swap video for drone feed and update alert
             setCameraData(prev => ({
                ...prev,
                1: { ...prev[1], name: "CHIMERA EYE 1 - LIVE", video: '/small_fire.mp4' }
            }));
            setAnomalyAlert({
                type: 'high-priority',
                message: 'FIRE CONFIRMED. DRONE ON-SCENE.'
            });
        } else {
            // Reset on inactive
            setCameraData(initialCameraData);
            setAnomalyAlert(null);
            setShowAtmosphericSensors(false);
        }

    }, [anomalySimulationState]);

    // Effect for handling video data updates (for non-simulation) and video ending
    useEffect(() => {
        const videoElement = mainVideoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            if (!isSimulating && headcountData[selectedFeed] && headcountData[selectedFeed].length > 0) {
                const data = headcountData[selectedFeed];
                const currentTime = videoElement.currentTime;
                const point = data.reduce((p, c) => (Math.abs(c.timestamp - currentTime) < Math.abs(p.timestamp - currentTime) ? c : p));
                const currentCount = point.count;

                const capacityPercent = Math.round((currentCount / cameraData[selectedFeed].capacity) * 100);
                const oxygenLevel = 20.9 - (capacityPercent / 100) * 1.5;
                const deviceDensity = Math.round(currentCount * 1.2);

                setSelectedFeedStats({ capacityPercent, oxygenLevel, deviceDensity });
            }
        };

        const handleVideoEnd = () => {
            if (videoElement.src.includes('camera-01-crowd-increasing')) {
                videoElement.currentTime = 5; 
                videoElement.play();
            }
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        videoElement.addEventListener('ended', handleVideoEnd);

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
                videoElement.removeEventListener('ended', handleVideoEnd);
            }
        };
    }, [selectedFeed, headcountData, cameraData, isSimulating]);

    // Effect for updating thumbnail data
     useEffect(() => {
        if (Object.keys(headcountData).length === 0) return;

        const cleanupFunctions = [];
        Object.keys(thumbVideoRefs.current).forEach(id => {
            const videoElement = thumbVideoRefs.current[id];
            if (!videoElement) return;

            const handleThumbTimeUpdate = () => {
                if (id === '1' && isSimulating) return;

                const currentTime = videoElement.currentTime;
                const dataForFeed = headcountData[id];
                if (dataForFeed && dataForFeed.length > 0) {
                    const point = dataForFeed.reduce((p, c) => (Math.abs(c.timestamp - currentTime) < Math.abs(p.timestamp - currentTime) ? c : p));
                    setLiveCounts(prev => ({ ...prev, [id]: point.count }));
                }
            };
            videoElement.addEventListener('timeupdate', handleThumbTimeUpdate);
            cleanupFunctions.push(() => {
                if (videoElement) videoElement.removeEventListener('timeupdate', handleThumbTimeUpdate);
            });
        });

        return () => cleanupFunctions.forEach(fn => fn());
    }, [headcountData, isSimulating]);


    const handleSimulation = () => {
        if (simulationIntervalRef.current) {
            clearInterval(simulationIntervalRef.current);
        }
        setShowChat(false);
        setShowAlert(false);
        setSelectedFeed(1); 
        setCameraData(prevData => ({
            ...prevData,
            1: { ...prevData[1], video: '/camera-01-crowd-increasing.mp4' }
        }));
        setIsSimulating(true);
    };
    
    const handleStopSimulation = () => {
        setIsSimulating(false);
    };

    const renderSelectedFeed = () => {
        const data = cameraData[selectedFeed];
        if (!data) return null;
        const { capacityPercent, oxygenLevel, deviceDensity } = selectedFeedStats;

        return (
          <div className="main-feed-content">
            <div className="feed-header">CAMERA FEED {selectedFeed} ({data.name}) [LIVE]</div>
            <div className="feed-visual-placeholder">
              <video 
                ref={mainVideoRef} 
                key={`${selectedFeed}-${data.video}`}
                src={data.video} 
                autoPlay 
                loop={!data.video.includes('camera-01-crowd-increasing')}
                muted 
                className="feed-image" 
              />
              {anomalyAlert && cameraData[selectedFeed]?.video.includes('smoke') && (
                  <div className={`anomaly-alert ${anomalyAlert.type}`}>
                      {anomalyAlert.message}
                  </div>
              )}
              <div className="main-feed-data-panel">
                  <div className="data-point main"><span className="data-label">Crowd Density</span><span className="data-value">{capacityPercent}%</span></div>
                  <div className="data-point main"><span className="data-label">Est. Oxygen</span><span className="data-value">{oxygenLevel.toFixed(1)}%</span></div>
                  <div className="data-point main"><span className="data-label">Device Density</span><span className="data-value">~{deviceDensity}</span></div>
              </div>
            </div>
          </div>
        );
    };

    const chatContext = `Current status for ${cameraData[selectedFeed]?.name || ''}: Crowd Density is at ${selectedFeedStats.capacityPercent}%, Estimated Oxygen is ${selectedFeedStats.oxygenLevel.toFixed(1)}%, and Device Density is approximately ${selectedFeedStats.deviceDensity}. A high-density bottleneck is predicted in 15 minutes. What are the best mitigation strategies?`;

    return (
        <>
          <div className="main-feed-screen">
            {renderSelectedFeed()}
            {userRole === 'admin' && (
              <div className="admin-actions">
                <button className="admin-button" onClick={handleSimulation}>Simulate Crowd Increase</button>
              </div>
            )}
          </div>
          
          {showAlert && (
            <AlertModal
              title="Predictive Alert"
              message={`A high-density bottleneck is predicted at ${cameraData[1].name} in 15 minutes. Confidence: 99%. Prediction based on visual, RF, and atmospheric data.`}
              onClose={() => {
                setShowAlert(false);
                handleStopSimulation();
                setShowChat(true);
              }}
            />
          )}

          {showChat && (
            <AIChatPanel 
              context={chatContext}
              onClose={() => setShowChat(false)}
              setActivePage={setActivePage}
              setGhostProtocolScenarioId={setGhostProtocolScenarioId}
            />
          )}

          {anomalySimulationState === 'echo-active' || anomalySimulationState === 'chimera-deployed' ? (
            <div className="status-cards-container">
                {anomalySimulationState === 'echo-active' && (
                    <div className="status-card">
                        <div className="card-header">PROJECT ECHO</div>
                        <div className="card-status active">ACTIVE: Clearing Path</div>
                    </div>
                )}
                {anomalySimulationState === 'chimera-deployed' && (
                     <div className="status-card">
                        <div className="card-header">PROJECT CHIMERA</div>
                        <div className="card-status active">DEPLOYED: Visual Confirmed</div>
                    </div>
                )}
            </div>
          ) : null}

          {showAtmosphericSensors && (
            <div className="atmospheric-sensors-panel">
                <div className="panel-header">ATMOSPHERIC SENSORS - SERVICE AREA</div>
                <div className="sensor-data critical">
                    <span className="sensor-label">OXYGEN (O2)</span>
                    <span className="sensor-value">18.2% <span className="trend down">▼</span></span>
                </div>
                <div className="sensor-data critical">
                    <span className="sensor-label">CARBON MONOXIDE (CO)</span>
                    <span className="sensor-value">450 ppm <span className="trend up">▲</span></span>
                </div>
            </div>
          )}
    
          <div className="camera-bay">
            {Object.keys(cameraData).map(id => {
                const data = cameraData[id];
                const currentCount = liveCounts[id] ?? 0;
                const capacityPercent = Math.round((currentCount / data.capacity) * 100);
                const oxygenLevel = 20.9 - (capacityPercent / 100) * 1.5;
                const deviceDensity = Math.round(currentCount * 1.2);
                
                return (
                    <div 
                      key={id}
                      className={`camera-thumbnail ${selectedFeed.toString() === id ? 'active' : ''}`}
                      onClick={() => {
                          if (isSimulating) handleStopSimulation();
                          setSelectedFeed(parseInt(id, 10));
                      }}
                    >
                      <div className="thumb-header">CAM {String(id).padStart(2, '0')}</div>
                      <div className="thumb-visual">
                        <video 
                            ref={el => thumbVideoRefs.current[id] = el}
                            src={data.video} 
                            autoPlay 
                            loop 
                            muted 
                            className="thumb-video" 
                        />
                        {anomalyAlert && id === '1' && (
                            <div className={`anomaly-alert-thumb ${anomalyAlert.type}`}>
                                {anomalyAlert.type === 'high-priority' ? 'ALERT' : 'ANOMALY'}
                            </div>
                        )}
                        <div className="thumb-data-panel">
                            <div className="data-point"><span className="data-label">Density</span><span className="data-value">{capacityPercent}%</span></div>
                            <div className="data-point"><span className="data-label">Oxygen</span><span className="data-value">{oxygenLevel.toFixed(1)}%</span></div>
                            <div className="data-point"><span className="data-label">Devices</span><span className="data-value">~{deviceDensity}</span></div>
                        </div>
                      </div>
                    </div>
                );
            })}
          </div>
        </>
    );
} 