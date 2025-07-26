import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext'; // Import useAuth hook
import './ProfessionalDashboard.css';

const cameraData = {
    1: { 
        name: "Service Area",
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

export default function CCTVPage() {
    const { userRole } = useAuth(); // Get userRole from AuthContext
    const [selectedFeed, setSelectedFeed] = useState(1);
    const [headcountData, setHeadcountData] = useState({});
    const [liveCounts, setLiveCounts] = useState({});
    
    const mainVideoRef = useRef(null);
    const thumbVideoRefs = useRef({});

    // 1. Fetch data for all video feeds just once on component mount
    useEffect(() => {
        Object.keys(cameraData).forEach(id => {
            fetch(`${cameraData[id].jsonData}?t=${new Date().getTime()}`)
                .then(response => response.json())
                .then(data => {
                    setHeadcountData(prevData => ({ ...prevData, [id]: data }));
                })
                .catch(error => console.error('Error fetching headcount data:', error));
        });
    }, []);

    // 2. Effect for updating the thumbnail video feeds
    useEffect(() => {
        if (Object.keys(headcountData).length === 0) return;

        const cleanupFunctions = [];
        Object.keys(thumbVideoRefs.current).forEach(id => {
            const videoElement = thumbVideoRefs.current[id];
            if (!videoElement) return;

            const handleTimeUpdate = () => {
                const currentTime = videoElement.currentTime;
                const dataForFeed = headcountData[id];
                if (dataForFeed) {
                    const point = dataForFeed.reduce((p, c) => (Math.abs(c.timestamp - currentTime) < Math.abs(p.timestamp - currentTime) ? c : p));
                    setLiveCounts(prev => ({ ...prev, [id]: point.count }));
                }
            };
            videoElement.addEventListener('timeupdate', handleTimeUpdate);
            cleanupFunctions.push(() => {
                if (videoElement) videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            });
        });

        return () => cleanupFunctions.forEach(fn => fn());
    }, [headcountData]);

    // 3. Effect for updating the main video feed. Re-runs when the selected feed changes.
    useEffect(() => {
        const videoElement = mainVideoRef.current;
        if (!videoElement || !headcountData[selectedFeed]) return;

        const handleTimeUpdate = () => {
            const currentTime = videoElement.currentTime;
            const data = headcountData[selectedFeed];
            if (data) {
                const point = data.reduce((p, c) => (Math.abs(c.timestamp - currentTime) < Math.abs(p.timestamp - currentTime) ? c : p));
                setLiveCounts(prev => ({ ...prev, [selectedFeed]: point.count }));
            }
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            if (videoElement) videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [selectedFeed, headcountData]);


    const renderSelectedFeed = () => {
        const data = cameraData[selectedFeed];
        const currentCount = liveCounts[selectedFeed] ?? 0;
        const capacityPercent = Math.round((currentCount / data.capacity) * 100);
        const oxygenLevel = 20.9 - (capacityPercent / 100) * 1.5;
        const deviceDensity = Math.round(currentCount * 1.2);

        return (
          <div className="main-feed-content">
            <div className="feed-header">CAMERA FEED {selectedFeed} ({data.name}) [LIVE]</div>
            <div className="feed-visual-placeholder">
              <video 
                ref={mainVideoRef} 
                key={selectedFeed}
                src={data.video} 
                autoPlay 
                loop 
                muted 
                className="feed-image" 
              />
              <div className="main-feed-data-panel">
                  <div className="data-point main"><span className="data-label">Crowd Density</span><span className="data-value">{capacityPercent}%</span></div>
                  <div className="data-point main"><span className="data-label">Est. Oxygen</span><span className="data-value">{oxygenLevel.toFixed(1)}%</span></div>
                  <div className="data-point main"><span className="data-label">Device Density</span><span className="data-value">~{deviceDensity}</span></div>
              </div>
            </div>
          </div>
        );
    };

    return (
        <>
          <div className="main-feed-screen">
            {renderSelectedFeed()}
            {userRole === 'admin' && (
              <div className="admin-actions">
                <button className="admin-button">Admin Action</button>
              </div>
            )}
          </div>
    
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
                      onClick={() => setSelectedFeed(parseInt(id, 10))}
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