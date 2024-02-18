// Importing React hooks and tsparticles for particle effects.
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Background = () => {
  // Callback to initialize particles on component mount.
  const particlesInit = useCallback(async (main) => {
    // Ensures that particles.js is fully loaded.
    await loadFull(main);
  }, []);

  // Callback for when particles are successfully loaded.
  const particlesLoaded = useCallback((container) => {
    console.log(container); // Logs the particles container for debugging.
  }, []);

  // Options for the particle effect including number, links, movement, size, opacity, and shape.
  const particleOptions = {
    fullScreen: {
      enable: true,
      zIndex: 0 // Sets the z-index to ensure the particles are in the background.
    },
    particles: {
      number: {
        value: 200, // Number of particles.
      },
      links: {
        enable: true, // Enables links/lines between particles.
        color: '#00FFCD', // Color of the links.
        opacity: 0.4, // Opacity of the links.
      },
      move: {
        enable: true, // Enables movement of particles.
        speed: 3, // Speed of particle movement.
      },
      size: {
        value: { min: 1, max: 5 }, // Size range of particles.
      },
      opacity: {
        value: 0.5, // Opacity of particles.
      },
      shape: {
        type: 'triangle', // Shape of particles.
      },
    },
    detectRetina: true, // Enables retina display support.
  };

  // Rendering the Particles component with the defined options.
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleOptions}
    />
  );
};

export default Background;