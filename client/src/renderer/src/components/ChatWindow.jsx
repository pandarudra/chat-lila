import { useState } from 'react'

const ChatWindow = ({ activeChat }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'You', content: message }])
      setMessage('')
    }
  }

  return (
    <div className="w-3/4 flex flex-col">
      <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
        {activeChat ? (
          <>
            <div className="text-xl font-bold mb-4">{activeChat.name}</div>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center text-gray-500 mt-10">Select a chat to start messaging</div>
        )}
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
