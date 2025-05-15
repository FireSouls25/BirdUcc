import React, { useState } from 'react';

export default function WhatsAppClient() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 32, maxWidth: 400, margin: '0 auto' }}>
        <h2>Iniciar sesión en WhatsApp</h2>
        <form onSubmit={handleLogin}>
          <input
            type="tel"
            placeholder="Número de teléfono"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
          <input
            type="text"
            placeholder="Código de verificación"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
          <button type="submit" style={{ width: '100%', padding: 10, background: '#25D366', color: '#fff', border: 'none', borderRadius: 6 }}>
            Iniciar sesión
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <h2>¡Bienvenido a WhatsApp!</h2>
      {/* Aquí podrías mostrar la UI del chat de WhatsApp */}
    </div>
  );
} 