import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const WhatsAppIntegration = () => {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const fetchWhatsAppUrl = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/whatsapp/url');
        const data = await response.json();
        setIframeUrl(data.url);
      } catch (error) {
        console.error('Error fetching WhatsApp URL:', error);
        setIframeUrl('https://web.whatsapp.com');
      }
    };

    fetchWhatsAppUrl();
  }, []);

  const handleRedirect = () => {
    window.open(iframeUrl, '_blank');
  };

  return (
    <div className="integration-container">
      <div className="integration-header">
        <h2>WhatsApp Integration</h2>
        <button className="redirect-button" onClick={handleRedirect}>
          <FaExternalLinkAlt /> Abrir en nueva pestaña
        </button>
      </div>
      <div className="iframe-container">
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            title="WhatsApp Web"
            className="embedded-frame"
            allow="camera; microphone"
          />
        ) : (
          <p>Loading WhatsApp...</p>
        )}
      </div>
    </div>
  );
};

export default WhatsAppIntegration; 