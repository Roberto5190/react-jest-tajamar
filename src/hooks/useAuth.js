import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function useAuth() {
    // TODO: Añade los estados necesarios aquí
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Estados para errores y carga
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginResult, setLoginResult] = useState(null);

    // VALIDACION EMAIL y PASSWORD
    const validate = () => {
        const newErrors = {}; //almacenamos mensajes de error
        if (!email) newErrors.email = "El correo es obligatorio";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Correo inválido";
        if (!password) newErrors.password = "La contraseña es obligatoria";
        else if (password.length < 8) newErrors.password = "Mínimo 8 caracteres";
        return newErrors;
    };

    // Manejo del SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate(); //asignamos el resultado de validate() en la constante
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; //si hay errores se interrumpe la ejecucion del submit
        }

        // Limpiamos estados anteriores e indicamos como activo el estado de carga
        setErrors({});
        setIsLoading(true);
        setLoginResult(null);

        // Manejo de errores
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });


            const data = await res.json();

            
            if (res.ok) {
                login(data.token, data.user);
                navigate("/dashboard");
            } else {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            setLoginResult({ success: true, user: data.user });
        } catch (error) {
            setLoginResult({ success: false, message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password, 
        setPassword,
        navigate,
        errors, 
        setErrors,
        isLoading, 
        setIsLoading,
        loginResult, 
        setLoginResult,
        validate,
        handleSubmit

    }
};
