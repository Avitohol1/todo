import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import ProtectedRoute from './pages/ProtectedRoute'

const App = () => {
  return (
  <Router>
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
