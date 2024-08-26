const ChatSidebar = ({ activeChat, setActiveChat }) => {
  const contacts = []

  return (
    <div className="w-1/4 bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">Chats</div>
      <div className="overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setActiveChat(contact)}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeChat?.id === contact.id ? 'bg-gray-700' : ''
            }`}
          >
            {contact.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar
