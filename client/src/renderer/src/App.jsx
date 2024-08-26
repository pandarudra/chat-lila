import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Signup from './components/Signup'
import ChatPage from './components/ChatPage'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ChatPage />} />
      </Routes>
    </Router>
  )
}

export default App
