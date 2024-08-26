import { useState } from 'react'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null)

  return (
    <div className="flex h-screen">
      <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatWindow activeChat={activeChat} />
    </div>
  )
}

export default ChatPage
