// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/login'
import Introduction from './components/Introduction/introduction'
import Dashboard from './components/Dashboard/dashboard'
import MeditationTimer from './components/MeditationTimer/meditation'
import BhagavadGita from './components/Book/bhagvatgita'
import ChatInterface from './components/ChatInterface/chatinterface'
import ContactPage from './components/Contact/contact'
import AdminPanel from './components/Admin/admin'
import Community from './components/CommunityPanel/community'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<Login />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meditationTimer" element={<MeditationTimer />} />
        <Route path="/bhagavadGita" element={<BhagavadGita />} />
        <Route path="/chatinterface" element={<ChatInterface />} />
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  )
}

// Separate component to avoid hook issues
function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the application</p>
    </div>
  )
}

export default App