import React, { useState } from 'react';
import './EmbeddedView.css';

interface EmbeddedViewProps {
  url: string;
  title: string;
}

const EmbeddedView: React.FC<EmbeddedViewProps> = ({ url, title }) => {
  const [showIframe, setShowIframe] = useState(true);

  const handleOpenNewWindow = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="embedded-container">
      <div className="embedded-header">
        <h2>{title}</h2>
        <div className="embedded-actions">
          <button onClick={handleOpenNewWindow} className="open-new-window-btn">
            Abrir en nueva ventana
          </button>
        </div>
      </div>
      {showIframe ? (
        <iframe
          src={url}
          title={title}
          className="embedded-frame"
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          onError={() => setShowIframe(false)}
        />
      ) : (
        <div className="embedded-fallback">
          <p>Este sitio no permite ser mostrado en un iframe.</p>
          <button onClick={handleOpenNewWindow} className="open-new-window-btn">
            Abrir {title} en una nueva ventana
          </button>
        </div>
      )}
    </div>
  );
};

export default EmbeddedView; 