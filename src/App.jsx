import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import {AuthProvider} from './context/AuthContext'
import { Navigate } from 'react-router-dom'


function App() {


  return (
    <AuthProvider> {/* Proveemos el contexto de autenticación a toda la app */}
      <Router>
        <Routes>
          {/* Ruta raíz que redirige al login */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<LoginForm />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
