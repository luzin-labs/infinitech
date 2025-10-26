'use client';

import { useMemo } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
}

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function NetworkBackground() {
  // Generate fixed node positions (20 nodes spread across viewport)
  const nodes = useMemo<Node[]>(() => {
    const nodeCount = 20;
    const generatedNodes: Node[] = [];

    // Use a seeded approach for consistent positioning
    for (let i = 0; i < nodeCount; i++) {
      // Distribute nodes across the viewport area
      // Using a pseudo-random but fixed distribution
      const angle = (i / nodeCount) * 2 * Math.PI;
      const radius = 20 + (i % 3) * 15; // Varying distances from center
      const offsetX = 50 + (i * 37) % 80; // Pseudo-random X offset
      const offsetY = 30 + (i * 53) % 70; // Pseudo-random Y offset

      generatedNodes.push({
        id: i,
        x: offsetX + Math.cos(angle) * radius,
        y: offsetY + Math.sin(angle) * radius,
      });
    }

    return generatedNodes;
  }, []);

  // Calculate connections between nodes within 250px distance
  const connections = useMemo<Connection[]>(() => {
    const maxDistance = 250;
    const generatedConnections: Connection[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const node1 = nodes[i];
        const node2 = nodes[j];

        // Calculate distance between nodes
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= maxDistance) {
          generatedConnections.push({
            x1: node1.x,
            y1: node1.y,
            x2: node2.x,
            y2: node2.y,
          });
        }
      }
    }

    return generatedConnections;
  }, [nodes]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      preserveAspectRatio="none"
    >
      {/* Glow filter for nodes */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {connections.map((connection, index) => (
        <line
          key={`connection-${index}`}
          x1={`${connection.x1}%`}
          y1={`${connection.y1}%`}
          x2={`${connection.x2}%`}
          y2={`${connection.y2}%`}
          stroke="#4f46e5"
          strokeWidth="1"
          opacity="0.25"
        />
      ))}

      {/* Network nodes */}
      {nodes.map((node) => (
        <circle
          key={`node-${node.id}`}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r="3.5"
          fill="#6366f1"
          opacity="0.6"
          filter="url(#glow)"
          className="network-node"
        />
      ))}

      <style jsx>{`
        @keyframes pulse-node {
          0%, 100% {
            opacity: 0.6;
            r: 3.5px;
          }
          50% {
            opacity: 0.8;
            r: 4.2px;
          }
        }

        .network-node {
          animation: pulse-node 2s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}
