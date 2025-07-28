// React y dependencias externas
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

// API y hooks
import { loginUsuario, obtenerPerfil } from '../../components/api/auth'
import { useAuth } from '../../components/hooks/useAuth'

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
  Google, 
  Facebook, 
  Apple 
} from '@mui/icons-material'

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [FormsFields, setFormsFields] = useState({
        email: '',
        password: ''
    });

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Mostrar mensaje de éxito si viene desde verificación
    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // Limpiar el mensaje después de 5 segundos
            setTimeout(() => setSuccessMessage(''), 5000);
        }
    }, [location]);

    const handleChange = (e) => {
        setFormsFields(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        // Limpiar errores cuando el usuario empiece a escribir
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!FormsFields.email.trim() || !FormsFields.password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await loginUsuario({
                email: FormsFields.email,
                password: FormsFields.password
            });

            // El login fue exitoso, ahora obtener los datos del usuario
            console.log('Login exitoso:', result);
            
            // Obtener los datos del perfil del usuario
            const userProfile = await obtenerPerfil();
            console.log('Datos del usuario:', userProfile);
            
            // Actualizar el contexto de autenticación con los datos del usuario
            login(userProfile);
            
            // Redirigir a la página principal
            navigate('/', { replace: true });

        } catch (error) {
            setError(error.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    
    const forgotPassword = (e) => {
        e.preventDefault();
        if(FormsFields.email.trim() !== '') {
            navigate("/forgot-password", { state: { email: FormsFields.email } });
        } else {
            navigate("/forgot-password");
        }
    };


    return (
        <section className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4'>
            <div className='container mx-auto'>
                <div className='max-w-md mx-auto'>
                    {/* Header con logo */}
                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg'>
                            <Lock className='text-white text-2xl' />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>¡Bienvenido de vuelta!</h1>
                        <p className='text-gray-600'>Inicia sesión para continuar con tu experiencia</p>
                    </div>

                    {/* Card principal */}
                    <div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 backdrop-blur-sm'>
                        {/* Mensajes de error y éxito */}
                        {error && (
                            <Alert severity="error" className='mb-4 !rounded-xl'>
                                {error}
                            </Alert>
                        )}
                        {successMessage && (
                            <Alert severity="success" className='mb-4 !rounded-xl'>
                                {successMessage}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            {/* Campo Email */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Correo Electrónico
                                </label>
                                <TextField
                                    name="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    variant="outlined"
                                    fullWidth
                                    value={FormsFields.email}
                                    onChange={handleChange}
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
                                    placeholder="••••••••"
                                    variant="outlined"
                                    fullWidth
                                    value={FormsFields.password}
                                    onChange={handleChange}
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

                            {/* Recordar usuario y olvidé contraseña */}
                            <div className='flex items-center justify-between'>
                                <label className='flex items-center space-x-2 cursor-pointer'>
                                    <input type="checkbox" className='w-4 h-4 text-[#ff5252] border-gray-300 rounded focus:ring-[#ff5252]' />
                                    <span className='text-sm text-gray-600'>Recordarme</span>
                                </label>
                                <button 
                                    type="button"
                                    className='text-sm text-[#ff5252] hover:text-[#e04848] font-medium transition-colors bg-transparent border-none cursor-pointer' 
                                    onClick={forgotPassword}
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            {/* Botón de inicio de sesión */}
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
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </Button>

                            

                            
                        </form>

                        {/* Footer */}
                        <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
                            <p className='text-gray-600'>
                                ¿No tienes una cuenta?{' '}
                                <Link to="/register" className='text-[#ff5252] hover:text-[#e04848] font-semibold transition-colors'>
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};

export default Login;