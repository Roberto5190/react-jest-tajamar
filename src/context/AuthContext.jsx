// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const AuthContext = createContext();

// El proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);   // Estado para el usuario
    const [loading, setLoading] = useState(true);  // Estado para saber si estamos cargando los datos

    useEffect(() => {
        // Al cargar la app, verificamos si hay un token en localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // Si existe un token, simulamos la verificación de la sesión
            fetchUser(token);
        } else {
            setLoading(false); // Si no hay token, ya hemos terminado
        }
    }, []);


    // Función para obtener los datos del usuario desde la API (simulada con MSW)
    const fetchUser = async (token) => {
        try {
            const res = await fetch('/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                throw new Error('No autorizado');
            }

            const data = await res.json();
            setUser(data);  // Guardamos los datos del usuario
        } catch (error) {
            setUser(null);  // Si hay error, no hay usuario autenticado
            localStorage.removeItem('token')
        } finally {
            setLoading(false);  // Terminamos la carga
        }
    };

    // Función para hacer el login
    const login = (token, user) => {
        localStorage.setItem('token', token);  // Guardamos el token
        setUser(user);  // Guardamos los datos del usuario
    };

    // Función para hacer logout
    const logout = () => {
        localStorage.removeItem('token');  // Eliminamos el token
        setUser(null);  // Limpiamos los datos del usuario
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
