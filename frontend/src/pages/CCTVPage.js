import React, { useState, useEffect, useRef } from 'react';
import './ProfessionalDashboard.css';

const cameraData = {
    1: { 
        headcount: 'N/A', 
        density: '6.2/m²', 
        oxygen: '20.8%', 
        video: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/Video_Ready_Quiet_Zone_Footage.mp4?alt=media&token=787d67de-441a-4b0a-a11e-3ccc983e4865',
        jsonData: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/crowd_data_zone_c.json?alt=media&token=92211f54-907c-4165-b3a2-bfd84dd0f2fe'
    },
    2: { 
        headcount: 'N/A', 
        density: '4.8/m²', 
        oxygen: '20.9%', 
        video: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/Crowd_Flow_Simulation_Video_Ready.mp4?alt=media&token=aeb6c48f-290d-4e2c-9751-922ef0e3f8f0',
        jsonData: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/crowd_data_zone_b.json?alt=media&token=f67360fa-2d25-4564-9278-391ec5343ddb'
    },
    3: { 
        headcount: 'N/A', 
        density: '5.1/m²', 
        oxygen: '20.9%', 
        video: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/Crowd_Buildup_Video_Generated.mp4?alt=media&token=c1b5dd40-796d-4283-959f-b5b9d12c2228',
        jsonData: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/crowd_data_zone_a.json?alt=media&token=3fe9dc55-0bec-43aa-8b36-b2f97b13e4e8'
    },
};

export default function CCTVPage() {
    const [selectedFeed, setSelectedFeed] = useState(1);
    const [headcountData, setHeadcountData] = useState({});
    const [currentHeadcount, setCurrentHeadcount] = useState('N/A');
    const videoRef = useRef(null);

    useEffect(() => {
        Object.keys(cameraData).forEach(id => {
            fetch(cameraData[id].jsonData)
                .then(response => response.json())
                .then(data => {
                    setHeadcountData(prevData => ({ ...prevData, [id]: data }));
                })
                .catch(error => console.error('Error fetching headcount data:', error));
        });
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;

        const updateHeadcount = () => {
            if (videoElement && headcountData[selectedFeed]) {
                const currentTime = videoElement.currentTime;
                const data = headcountData[selectedFeed];
                const currentDataPoint = data.find(point => currentTime >= point.timestamp && currentTime < point.timestamp + 0.5);
                if (currentDataPoint) {
                    setCurrentHeadcount(currentDataPoint.count);
                }
            }
        };

        if (videoElement) {
            videoElement.addEventListener('timeupdate', updateHeadcount);
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('timeupdate', updateHeadcount);
            }
        };
    }, [selectedFeed, headcountData]);

    const renderSelectedFeed = () => {
        const data = cameraData[selectedFeed];
        return (
          <div className="main-feed-content">
            <div className="feed-header">CAMERA FEED {selectedFeed} [LIVE]</div>
            <div className="feed-visual-placeholder">
              <video ref={videoRef} src={data.video} autoPlay loop muted className="feed-image" />
              <div className="main-feed-data-panel">
                  <div className="data-point main"><span className="data-label">Visual Headcount</span><span className="data-value">{currentHeadcount}</span></div>
                  <div className="data-point main"><span className="data-label">Device Density</span><span className="data-value">{data.density}</span></div>
                  <div className="data-point main"><span className="data-label">Oxygen Level</span><span className="data-value">{data.oxygen}</span></div>
              </div>
            </div>
          </div>
        );
    };

    return (
        <>
          <div className="main-feed-screen">
            {renderSelectedFeed()}
          </div>
    
          <div className="camera-bay">
            {Object.keys(cameraData).map(id => (
                <div 
                  key={id}
                  className={`camera-thumbnail ${selectedFeed.toString() === id ? 'active' : ''}`}
                  onClick={() => setSelectedFeed(parseInt(id, 10))}
                >
                  <div className="thumb-header">CAM {String(id).padStart(2, '0')}</div>
                  <div className="thumb-visual">
                    <video src={cameraData[id].video} autoPlay loop muted className="thumb-video" />
                    <div className="thumb-data-panel">
                        <div className="data-point"><span className="data-label">Vis. Headcount</span><span className="data-value">{headcountData[id] ? 'Live' : 'N/A'}</span></div>
                        <div className="data-point"><span className="data-label">Device Density</span><span className="data-value">{cameraData[id].density}</span></div>
                        <div className="data-point"><span className="data-label">Oxygen Level</span><span className="data-value">{cameraData[id].oxygen}</span></div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </>
    );
} 