import React, { useState } from 'react';
import './ProfessionalDashboard.css';

const cameraData = {
    1: { headcount: '8,421', density: '6.2/m²', oxygen: '20.8%', video: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/Video_Ready_Quiet_Zone_Footage.mp4?alt=media&token=787d67de-441a-4b0a-a11e-3ccc983e4865' },
    2: { headcount: '6,982', density: '4.8/m²', oxygen: '20.9%', video: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/Crowd_Flow_Simulation_Video_Ready.mp4?alt=media&token=aeb6c48f-290d-4e2c-9751-922ef0e3f8f0' },
    3: { headcount: '7,513', density: '5.1/m²', oxygen: '20.9%', video: 'https://firebasestorage.googleapis.com/v0/b/project-drishti-v1-b22d8.firebasestorage.app/o/Crowd_Buildup_Video_Generated.mp4?alt=media&token=c1b5dd40-796d-4283-959f-b5b9d12c2228' },
};

export default function CCTVPage() {
    const [selectedFeed, setSelectedFeed] = useState(1);

    const renderSelectedFeed = () => {
        const data = cameraData[selectedFeed];
        return (
          <div className="main-feed-content">
            <div className="feed-header">CAMERA FEED {selectedFeed} [LIVE]</div>
            <div className="feed-visual-placeholder">
              <video src={data.video} autoPlay loop muted className="feed-image" />
              <div className="main-feed-data-panel">
                  <div className="data-point main"><span className="data-label">Visual Headcount</span><span className="data-value">{data.headcount}</span></div>
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
            <div 
              className={`camera-thumbnail ${selectedFeed === 1 ? 'active' : ''}`}
              onClick={() => setSelectedFeed(1)}
            >
              <div className="thumb-header">CAM 01</div>
              <div className="thumb-visual">
                <video src={cameraData[1].video} autoPlay loop muted className="thumb-video" />
                <div className="thumb-data-panel">
                    <div className="data-point"><span className="data-label">Vis. Headcount</span><span className="data-value">{cameraData[1].headcount}</span></div>
                    <div className="data-point"><span className="data-label">Device Density</span><span className="data-value">{cameraData[1].density}</span></div>
                    <div className="data-point"><span className="data-label">Oxygen Level</span><span className="data-value">{cameraData[1].oxygen}</span></div>
                </div>
              </div>
            </div>
            <div 
              className={`camera-thumbnail ${selectedFeed === 2 ? 'active' : ''}`}
              onClick={() => setSelectedFeed(2)}
            >
               <div className="thumb-header">CAM 02</div>
               <div className="thumb-visual">
                 <video src={cameraData[2].video} autoPlay loop muted className="thumb-video" />
                 <div className="thumb-data-panel">
                    <div className="data-point"><span className="data-label">Vis. Headcount</span><span className="data-value">{cameraData[2].headcount}</span></div>
                    <div className="data-point"><span className="data-label">Device Density</span><span className="data-value">{cameraData[2].density}</span></div>
                    <div className="data-point"><span className="data-label">Oxygen Level</span><span className="data-value">{cameraData[2].oxygen}</span></div>
                </div>
               </div>
            </div>
            <div 
              className={`camera-thumbnail ${selectedFeed === 3 ? 'active' : ''}`}
              onClick={() => setSelectedFeed(3)}
            >
               <div className="thumb-header">CAM 03</div>
               <div className="thumb-visual">
                 <video src={cameraData[3].video} autoPlay loop muted className="thumb-video" />
                 <div className="thumb-data-panel">
                    <div className="data-point"><span className="data-label">Vis. Headcount</span><span className="data-value">{cameraData[3].headcount}</span></div>
                    <div className="data-point"><span className="data-label">Device Density</span><span className="data-value">{cameraData[3].density}</span></div>
                    <div className="data-point"><span className="data-label">Oxygen Level</span><span className="data-value">{cameraData[3].oxygen}</span></div>
                </div>
               </div>
            </div>
          </div>
        </>
    );
} 