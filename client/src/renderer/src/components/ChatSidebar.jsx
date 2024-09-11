import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ChatSidebar = ({ activeChat, setActiveChat }) => {
  const [contacts, setContacts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const contacts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/getinfo/${localStorage.getItem('uID')}`
        )
        setContacts(res.data)
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }
    }

    contacts()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('uID')
    navigate('/')
  }
  return (
    <div className="w-1/4 bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">Chats</div>
      <div className="overflow-y-auto">
        {contacts.map((contact, i) => (
          <div
            key={contact.id}
            onClick={() => setActiveChat(contact)}
            className={`chat-item flex justify-evenly items-center py-2 px-4 hover:bg-gray-700 cursor-pointer  transition duration-300 ease-in-out ${
              activeChat?.id === contact.id ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <img src={contact.pic} alt={contact.name} className="w-10 h-10 rounded-full mr-4" />
            <div className="flex flex-col">
              <p className="text-base font-medium">{contact.name}</p>
              {contact.status && <p className="text-sm text-gray-400">{contact.status}</p>}
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="w-full py-2 bg-green-700 hover:bg-green-600">Add Contact</button>
      </div>
      <button
        onClick={() => logout()}
        className="fixed bottom-1
        left-1  bg-red-500 text-white py-2 px-4 rounded-r-full hover:bg-red-600 transition duration-300 ease-in-out
      "
      >
        Logout
      </button>
    </div>
  )
}

export default ChatSidebar
