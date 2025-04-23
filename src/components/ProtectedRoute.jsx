// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Importamos el contexto de autenticación

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);  // Obtenemos el estado de autenticación del contexto

    if (loading) {
        return <p>Cargando...</p>;  // Mientras se verifica el estado de autenticación, mostramos un loading
    }

    if (!user) {
        return <Navigate to="/login" />; // Si no hay usuario autenticado, redirigimos al login
    }

    // Si el usuario está autenticado, renderizamos el contenido protegido
    return children;
};

export default ProtectedRoute;
