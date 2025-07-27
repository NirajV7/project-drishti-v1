import React, { useRef, useState, useEffect } from 'react';
import './GhostProtocol.css';
import './ProfessionalDashboard.css'; // Re-use styles

const NUM_VECTORS = 100;

const simulationScenarios = {
  1: {
    title: 'Oracle: What if we open Gate C?',
    description: 'Simulates the effect of fully opening the gate to relieve the initial bottleneck.',
    config: {
      type: 'DISPERSE_AND_REGROUP',
    }
  },
  2: {
    title: 'Recommendation: Pulse & Deploy',
    description: 'Simulates the AI-recommended action of controlled opening and team deployment.',
    config: {
      type: 'CONTROLLED_PULSE',
    }
  },
  3: {
    title: 'Empty Scenario Slot',
    description: 'Awaiting new simulation parameters.',
    config: {
      type: 'IDLE',
    }
  },
};


function getRandomVector(width, height) {
  return {
    x: Math.random() * (width - 10),
    y: Math.random() * (height - 10),
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    status: 'normal',
  };
}

function SimulationBox({ scenario, isThumbnail = false }) {
  const containerRef = useRef(null);
  const [vectors, setVectors] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    const containerNode = containerRef.current;
    if (containerNode) {
      resizeObserver.observe(containerNode);
    }

    return () => {
      if (containerNode) {
        resizeObserver.unobserve(containerNode);
      }
    };
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      return; 
    }

    const newVectors = [];
    const numV = isThumbnail ? NUM_VECTORS / 2 : NUM_VECTORS;
    for (let i = 0; i < numV; i++) {
      newVectors.push(getRandomVector(dimensions.width, dimensions.height));
    }
    setVectors(newVectors);

    function animate() {
      setVectors(prevVectors =>
        prevVectors.map(v => {
          let { x, y, dx, dy } = v;
          if (x + dx > dimensions.width - 10 || x + dx < 0) dx = -dx;
          if (y + dy > dimensions.height - 10 || y + dy < 0) dy = -dy;
          x += dx;
          y += dy;
          return { ...v, x, y, dx, dy };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [scenario, isThumbnail, dimensions]);

  return (
    <div
      className="simulation-container"
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {!isThumbnail &&
        <div id="status-box">{scenario.description}</div>
      }
      {vectors.map((v, i) => (
        <div
          key={i}
          className={`vector ${v.status}`}
          style={{ left: v.x, top: v.y }}
        />
      ))}
    </div>
  );
}

export default function GhostProtocolPage({ ghostProtocolScenarioId, setGhostProtocolScenarioId }) {

  const renderSelectedSim = () => {
    const scenario = simulationScenarios[ghostProtocolScenarioId];
    return (
      <div className="main-feed-content">
        <div className="feed-header">{scenario.title}</div>
        <div className="feed-visual-placeholder">
            <SimulationBox key={ghostProtocolScenarioId} scenario={scenario} />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="main-feed-screen">
        {renderSelectedSim()}
      </div>

      <div className="camera-bay">
        {Object.entries(simulationScenarios).map(([id, scenario]) => (
          <div
            key={id}
            className={`camera-thumbnail ${ghostProtocolScenarioId === parseInt(id) ? 'active' : ''}`}
            onClick={() => setGhostProtocolScenarioId(parseInt(id))}
          >
            <div className="thumb-header">{scenario.title}</div>
            <div className="thumb-visual">
                <SimulationBox scenario={scenario} isThumbnail={true} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
} 