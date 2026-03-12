/**
 * Wireframe3D - legacy compatibility shim.
 */
import React from 'react';
import ParticleGalaxy from './ParticleGalaxy';
import Blob3D from './Blob3D';
import NeuralNetwork3D from './NeuralNetwork3D';
import MeshGradientWaves from './MeshGradientWaves';

const Wireframe3D = ({ shape = 'icosahedron', color = '#4ade80' }) => {
    switch (shape) {
        case 'sphere': return React.createElement(NeuralNetwork3D, { color });
        case 'torus':
        case 'cube':   return React.createElement(Blob3D, { color });
        case 'octahedron': return React.createElement(MeshGradientWaves, { color });
        default:       return React.createElement(ParticleGalaxy, { color });
    }
};

export default Wireframe3D;
