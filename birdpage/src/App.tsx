import React, { useState } from 'react'
import './App.css'
import Home from './components/Home'
import TelegramIntegration from './components/TelegramIntegration'
import WhatsAppIntegration from './components/WhatsAppIntegration'
import DiscordIntegration from './components/DiscordIntegration'
import { FaHome, FaWhatsapp, FaTelegramPlane, FaDiscord } from 'react-icons/fa'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />
      case 'telegram':
        return <TelegramIntegration />
      case 'whatsapp':
        return <WhatsAppIntegration />
      case 'discord':
        return <DiscordIntegration />
      default:
        return <Home />
    }
  }

  return (
    <div className="App">
      <div className="nav-panel">
        <div className="nav-header">
          <h2>BirdUcc</h2>
          <img src="/logobird.png" alt="BirdUcc Logo" className="app-logo" />
        </div>
        <div className="nav-item" onClick={() => setActiveSection('home')}>
          <FaHome size={24} />
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => setActiveSection('whatsapp')}>
          <FaWhatsapp size={24} color="green" />
          <span>WhatsApp</span>
        </div>
        <div className="nav-item" onClick={() => setActiveSection('telegram')}>
          <FaTelegramPlane size={24} color="#0088CC" />
          <span>Telegram</span>
        </div>
        <div className="nav-item" onClick={() => setActiveSection('discord')}>
          <FaDiscord size={24} color="#7289DA" />
          <span>Discord</span>
        </div>
        <div className="ucc-info">
          <img src="/ucc_logo.png" alt="UCC Logo" className="ucc-logo" />
          <p>INGENIERIA SOFTWARE</p>
        </div>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default App
