import React, { useState } from 'react';

export default function DiscordClient() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 32, maxWidth: 400, margin: '0 auto' }}>
        <h2>Iniciar sesión en Discord</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario de Discord"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
          <input
            type="password"
            placeholder="Token (simulado)"
            value={token}
            onChange={e => setToken(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
          <button type="submit" style={{ width: '100%', padding: 10, background: '#5865F2', color: '#fff', border: 'none', borderRadius: 6 }}>
            Iniciar sesión
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <h2>¡Bienvenido a Discord!</h2>
      {/* Aquí podrías mostrar la UI del chat de Discord */}
    </div>
  );
} 