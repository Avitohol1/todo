import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import ProtectedRoute from './pages/ProtectedRoute'
import Navbar from './components/Navbar'

const App = () => {
  return (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/welcome" element={<Welcome />}/>
      <Route path="/" element={<ProtectedRoute>
        <Home />
      </ProtectedRoute>} />
    </Routes>
  </Router>
  )
}

export default App
