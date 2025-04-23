import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Dashboard() {
    // ESTADOS
    const [user, setUser] = useState(null) //Datos de usuario
    const [loading, setLoading] = useState(true) //control de carga/verificación

    // Hook de React Router para redireccionar
    const navigate = useNavigate()


    // TODO: Verifica autenticación
    useEffect(() => {
        const token = localStorage.getItem('token') //verificamos si hay token en el localStorage
        if (!token) {
            navigate('/login')
            return
        }

        // FETCH USER
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/profile', { //llamamos a la API simulada de /api/profile con el token
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (!res.ok) {
                    throw new Error("Usuario no autorizado");
                }

                const data = await res.json() //Obtenemos los datos del usuario
                setUser(data) //guardamos los datos del usuario

            } catch (err) {
                console.log('Error de autenticación', err.message);
                navigate('/login') //redirigimos a login si hay error de autentificación
            } finally {
                setLoading(false) //terminamos la carga
            }
        }
        // /fetchUser()

        fetchUser()
    }, [navigate])

    //PANTALLA LOADING
    if (loading) return <p>Cargando dashboard...</p>

    // TODO: Obtén datos del usuario

    return (
        <div>
            <h1>Bienvenido al Dashboard</h1>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
            {/* Aquí podrías agregar más secciones del dashboard */}
        </div>
    );
}