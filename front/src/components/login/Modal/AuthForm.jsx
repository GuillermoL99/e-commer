import React, { useState } from "react";
import { registrarUsuario, loginUsuario } from "../../api/auth";

export function LoginForm({ onSwitch, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const result = await loginUsuario({ email, password });
      onSuccess && onSuccess(result);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {error && <div className="text-red-600 text-xs">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 font-medium hover:bg-blue-700 transition"
      >
        Entrar
      </button>
      <p className="text-xs mt-2">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => onSwitch("register")}
          className="text-blue-600 underline"
        >
          Regístrate
        </button>
      </p>
    </form>
  );
}

export function RegisterForm({ onSwitch, onSuccess }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const result = await registrarUsuario({
        nombre,
        apellido,
        email,
        password,
        telefono,
      });
      onSuccess && onSuccess(result);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Registrarse</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Teléfono (opcional)"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="border p-2 rounded"
      />
      {error && <div className="text-red-600 text-xs">{error}</div>}
      <button
        type="submit"
        className="bg-green-600 text-white rounded p-2 font-medium hover:bg-green-700 transition"
      >
        Registrarse
      </button>
      <p className="text-xs mt-2">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="text-blue-600 underline"
        >
          Inicia sesión
        </button>
      </p>
    </form>
  );
}