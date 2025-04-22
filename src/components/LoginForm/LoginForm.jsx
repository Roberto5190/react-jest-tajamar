import { useState } from "react";

// Estructura inicial (complétala con tu código)
export default function LoginForm() {
    // TODO: Añade los estados necesarios aquí
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Estados para errores y carga
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [loginResult, setLoginResult] = useState(null)

    // VALIDACION
    const validate = () => {
        const newErrors = {}
        if (!email) newErrors.email = 'El correo es obligatorio'
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Correo inválido'
        if (!password) newErrors.password = 'La contraseña es obligatoria'
        else if (password.length < 8) newErrors.password = 'Mínimo 8 caracteres'
        return newErrors
    }

    // TODO: Añade la función handleSubmit aquí
    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setIsLoading(true)
        setLoginResult(null)

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Error al iniciar sesión')
            }

            setLoginResult({ success: true, user: data.user })
        } catch (error) {
            setLoginResult({ success: false, message: error.message })
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            {loginResult && (
                <p className={loginResult.success ? 'text-success' : 'text-danger'}>
                    {loginResult.success
                        ? `¡Bienvenido, ${loginResult.user.name}!`
                        : loginResult.message}
                </p>
            )}
        </form>
    );
}