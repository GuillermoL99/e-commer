// React y dependencias externas
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// API
import { registrarUsuario } from "../../components/api/auth"

// Material-UI
import { 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Divider, 
  Chip, 
  Alert,
  CircularProgress
} from '@mui/material'
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person, 
  Google, 
  Facebook, 
  Apple 
} from '@mui/icons-material'

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.password
        ) {
            setError("Por favor, completa todos los campos.");
            return;
        }
        if (form.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);
        setError("");
        
        try {
            const result = await registrarUsuario({
                name: form.name,
                email: form.email,
                password: form.password
            });

            setSuccess(true);
            setForm({
                name: "",
                email: "",
                password: "",
            });

            // Guardar el email para la verificación
            localStorage.setItem("pendingVerification", form.email);
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate("/verify", { state: { email: form.email } });
            }, 2000);

        } catch (error) {
            setError(error.message || "Error al registrar usuario");
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <section className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4'>
            <div className='container mx-auto'>
                <div className='max-w-md mx-auto'>
                    {/* Header con logo */}
                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg'>
                            <Person className='text-white text-2xl' />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>¡Únete a nosotros!</h1>
                        <p className='text-gray-600'>Crea tu cuenta y comienza tu experiencia</p>
                    </div>

                    {/* Card principal */}
                    <div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 backdrop-blur-sm'>
                        {/* Mensajes de error y éxito */}
                        {error && (
                            <Alert severity="error" className='mb-4 !rounded-xl'>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert severity="success" className='mb-4 !rounded-xl'>
                                ¡Registro exitoso! Revisa tu correo electrónico para verificar tu cuenta. Serás redirigido en breve...
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            {/* Campo Nombre */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Nombre Completo
                                </label>
                                <TextField
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Tu nombre completo"
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person className='text-gray-400' />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '& fieldset': {
                                                borderColor: '#e5e7eb',
                                                borderWidth: '2px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ff5252',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff5252',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {/* Campo Email */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Correo Electrónico
                                </label>
                                <TextField
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email className='text-gray-400' />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '& fieldset': {
                                                borderColor: '#e5e7eb',
                                                borderWidth: '2px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ff5252',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff5252',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {/* Campo Contraseña */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Contraseña
                                </label>
                                <TextField
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock className='text-gray-400' />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '& fieldset': {
                                                borderColor: '#e5e7eb',
                                                borderWidth: '2px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#ff5252',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff5252',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                            </div>

                            

                            {/* Botón de registro */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                                sx={{
                                    background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                                    borderRadius: '12px',
                                    padding: '12px 0',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    textTransform: 'none',
                                    boxShadow: '0 8px 25px rgba(255, 82, 82, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                                        boxShadow: '0 12px 35px rgba(255, 82, 82, 0.4)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                        Creando cuenta...
                                    </>
                                ) : (
                                    "Crear Cuenta"
                                )}
                            </Button>

                            
                        </form>

                        {/* Footer */}
                        <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
                            <p className='text-gray-600'>
                                ¿Ya tienes una cuenta?{' '}
                                <Link to="/login" className='text-[#ff5252] hover:text-[#e04848] font-semibold transition-colors'>
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};

export default Register;