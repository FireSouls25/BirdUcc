import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const TelegramIntegration = () => {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const fetchTelegramUrl = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/telegram/url');
        const data = await response.json();
        setIframeUrl(data.url);
      } catch (error) {
        console.error('Error fetching Telegram URL:', error);
        setIframeUrl('https://web.telegram.org');
      }
    };

    fetchTelegramUrl();
  }, []);

  const handleRedirect = () => {
    window.open(iframeUrl, '_blank');
  };

  return (
    <div className="integration-container">
      <div className="integration-header">
        <h2>Telegram Integration</h2>
        <button className="redirect-button" onClick={handleRedirect}>
          <FaExternalLinkAlt /> Abrir en nueva pestaña
        </button>
      </div>
      <div className="iframe-container">
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            title="Telegram Web"
            className="embedded-frame"
            allow="camera; microphone"
          />
        ) : (
          <p>Loading Telegram...</p>
        )}
      </div>
    </div>
  );
};

export default TelegramIntegration; 