import useAuth from "../../hooks/useAuth";
import React from "react";

// Estructura inicial (complétala con tu código)
export default function LoginForm() {
    const {
        email,
        setEmail,
        password, 
        setPassword,
        errors, 
        isLoading, 
        loginResult, 
        handleSubmit
    } = useAuth()


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