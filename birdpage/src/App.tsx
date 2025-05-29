import React, { useState } from 'react'
import './App.css'
import Home from './components/Home'
import TelegramIntegration from './components/TelegramIntegration'
import { FaHome, FaWhatsapp, FaTelegramPlane, FaDiscord } from 'react-icons/fa'

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home />
      case 'telegram':
        return <TelegramIntegration />
      default:
        return <Home />
    }
  }

  return (
    <div className="App">
      <div 
        className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="sidebar-item" onClick={() => setActiveSection('home')}>
          {isSidebarExpanded ? 'Home' : <FaHome size={24} />}
        </div>
        <div className="sidebar-item">
          {isSidebarExpanded ? 'WhatsApp' : <FaWhatsapp size={24} color="green" />}
        </div>
        <div className="sidebar-item" onClick={() => setActiveSection('telegram')}>
          {isSidebarExpanded ? 'Telegram' : <FaTelegramPlane size={24} color="#0088CC" />}
        </div>
        <div className="sidebar-item">
          {isSidebarExpanded ? 'Discord' : <FaDiscord size={24} color="#7289DA" />}
        </div>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  )
}

export default App
