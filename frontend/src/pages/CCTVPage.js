import React, { useState } from 'react';
import './ProfessionalDashboard.css';

const cameraData = {
    1: { headcount: '8,421', density: '6.2/m²', oxygen: '20.8%', image: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=800&q=80' },
    2: { headcount: '6,982', density: '4.8/m²', oxygen: '20.9%', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80' },
    3: { headcount: '7,513', density: '5.1/m²', oxygen: '20.9%', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80' },
};

export default function CCTVPage() {
    const [selectedFeed, setSelectedFeed] = useState(1);

    const renderSelectedFeed = () => {
        const data = cameraData[selectedFeed];
        return (
          <div className="main-feed-content">
            <div className="feed-header">CAMERA FEED {selectedFeed} [LIVE]</div>
            <div className="feed-visual-placeholder">
              <img src={data.image} alt={`Camera Feed ${selectedFeed}`} className="feed-image" />
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
              <div className="thumb-visual" style={{backgroundImage: `url(${cameraData[1].image})`}}>
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
               <div className="thumb-visual" style={{backgroundImage: `url(${cameraData[2].image})`}}>
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
               <div className="thumb-visual" style={{backgroundImage: `url(${cameraData[3].image})`}}>
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