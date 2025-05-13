import React from "react";
import PlatformSelector from "./components/PlatformSelector";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <div className="flex h-screen bg-blue-50">
      <PlatformSelector />
      <ContactList />
      <ChatWindow />
    </div>
  );
}
