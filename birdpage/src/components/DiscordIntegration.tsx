import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const DiscordIntegration = () => {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const fetchDiscordUrl = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/discord/url');
        const data = await response.json();
        setIframeUrl(data.url);
      } catch (error) {
        console.error('Error fetching Discord URL:', error);
        setIframeUrl('https://discord.com/app');
      }
    };

    fetchDiscordUrl();
  }, []);

  const handleRedirect = () => {
    window.open(iframeUrl, '_blank');
  };

  return (
    <div className="integration-container">
      <div className="integration-header">
        <h2>Discord Integration</h2>
        <button className="redirect-button" onClick={handleRedirect}>
          <FaExternalLinkAlt /> Abrir en nueva pestaña
        </button>
      </div>
      <div className="iframe-container">
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            title="Discord Web"
            className="embedded-frame"
            allow="camera; microphone"
          />
        ) : (
          <p>Loading Discord...</p>
        )}
      </div>
    </div>
  );
};

export default DiscordIntegration; 