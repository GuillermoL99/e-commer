// React y dependencias externas
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Material-UI
import { 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Alert,
  LinearProgress
} from '@mui/material'
import { 
  Visibility, 
  VisibilityOff, 
  Lock, 
  CheckCircle,
  ArrowBack
} from '@mui/icons-material'

const ForgotPassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});
    
    const [formFields, setFormFields] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar errores cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        
        // Validar confirmación de contraseña en tiempo real
        if (name === 'confirmPassword' && formFields.newPassword !== value) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: 'Las contraseñas no coinciden'
            }));
        } else if (name === 'confirmPassword' && formFields.newPassword === value) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: ''
            }));
        }
    };

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return 'La contraseña debe tener al menos 8 caracteres';
        }
        if (!hasUpperCase) {
            return 'Debe contener al menos una letra mayúscula';
        }
        if (!hasLowerCase) {
            return 'Debe contener al menos una letra minúscula';
        }
        if (!hasNumbers) {
            return 'Debe contener al menos un número';
        }
        if (!hasSpecialChar) {
            return 'Debe contener al menos un carácter especial';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = {};
        
        // Validar nueva contraseña
        const passwordError = validatePassword(formFields.newPassword);
        if (passwordError) {
            newErrors.newPassword = passwordError;
        }
        
        // Validar confirmación
        if (formFields.newPassword !== formFields.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        setErrors({});
        
        // Simular llamada a API
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('¡Contraseña actualizada exitosamente!');
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }, 2000);
    };

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 12.5;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 12.5;
        return Math.min(strength, 100);
    };

    const getStrengthColor = (strength) => {
        if (strength < 25) return '#ff5252';
        if (strength < 50) return '#ff9800';
        if (strength < 75) return '#ffc107';
        return '#4caf50';
    };

    const getStrengthText = (strength) => {
        if (strength < 25) return 'Muy débil';
        if (strength < 50) return 'Débil';
        if (strength < 75) return 'Media';
        return 'Fuerte';
    };

    const passwordStrength = getPasswordStrength(formFields.newPassword);

    return (
        <section className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4'>
            <div className='container mx-auto'>
                <div className='max-w-md mx-auto'>
                    {/* Botón de regresar */}
                    <div className='mb-6'>
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={() => navigate('/login')}
                            sx={{
                                color: '#6b7280',
                                textTransform: 'none',
                                '&:hover': {
                                    color: '#ff5252',
                                    backgroundColor: 'transparent'
                                }
                            }}
                        >
                            Regresar al Login
                        </Button>
                    </div>

                    {/* Header con logo */}
                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg'>
                            <Lock className='text-white text-2xl' />
                        </div>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Nueva Contraseña</h1>
                        <p className='text-gray-600'>Crea una contraseña segura para tu cuenta</p>
                    </div>

                    {/* Mensaje de éxito */}
                    {successMessage && (
                        <Alert 
                            severity="success" 
                            icon={<CheckCircle />}
                            sx={{ mb: 3, borderRadius: '12px' }}
                        >
                            {successMessage}
                        </Alert>
                    )}

                    {/* Card principal */}
                    <div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 backdrop-blur-sm'>
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            {/* Campo Nueva Contraseña */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Nueva Contraseña
                                </label>
                                <TextField
                                    name="newPassword"
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    variant="outlined"
                                    fullWidth
                                    value={formFields.newPassword}
                                    onChange={handleChange}
                                    error={!!errors.newPassword}
                                    helperText={errors.newPassword}
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock className='text-gray-400' />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    onClick={handleClickShowNewPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '& fieldset': {
                                                borderColor: errors.newPassword ? '#ff5252' : '#e5e7eb',
                                                borderWidth: '2px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.newPassword ? '#ff5252' : '#ff5252',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff5252',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                                
                                {/* Indicador de fortaleza */}
                                {formFields.newPassword && (
                                    <div className='space-y-2'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-xs text-gray-600'>Fortaleza:</span>
                                            <span 
                                                className='text-xs font-medium'
                                                style={{ color: getStrengthColor(passwordStrength) }}
                                            >
                                                {getStrengthText(passwordStrength)}
                                            </span>
                                        </div>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={passwordStrength}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: '#e5e7eb',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: getStrengthColor(passwordStrength),
                                                    borderRadius: 3,
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Campo Confirmar Contraseña */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Confirmar Contraseña
                                </label>
                                <TextField
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    variant="outlined"
                                    fullWidth
                                    value={formFields.confirmPassword}
                                    onChange={handleChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock className='text-gray-400' />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            '& fieldset': {
                                                borderColor: errors.confirmPassword ? '#ff5252' : 
                                                            formFields.confirmPassword && formFields.newPassword === formFields.confirmPassword ? '#4caf50' : '#e5e7eb',
                                                borderWidth: '2px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.confirmPassword ? '#ff5252' : '#ff5252',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#ff5252',
                                                borderWidth: '2px',
                                            },
                                        },
                                    }}
                                />
                                
                                {/* Indicador de coincidencia */}
                                {formFields.confirmPassword && (
                                    <div className='flex items-center gap-2 mt-2'>
                                        {formFields.newPassword === formFields.confirmPassword ? (
                                            <>
                                                <CheckCircle className='text-green-500 text-sm' />
                                                <span className='text-xs text-green-600'>Las contraseñas coinciden</span>
                                            </>
                                        ) : (
                                            <span className='text-xs text-red-500'>Las contraseñas no coinciden</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Requisitos de contraseña */}
                            <div className='bg-blue-50 rounded-xl p-4'>
                                <h4 className='text-sm font-semibold text-blue-800 mb-2'>Requisitos de contraseña:</h4>
                                <ul className='text-xs text-blue-700 space-y-1'>
                                    <li className={formFields.newPassword.length >= 8 ? 'text-green-600' : ''}>
                                        • Al menos 8 caracteres
                                    </li>
                                    <li className={/[A-Z]/.test(formFields.newPassword) ? 'text-green-600' : ''}>
                                        • Una letra mayúscula
                                    </li>
                                    <li className={/[a-z]/.test(formFields.newPassword) ? 'text-green-600' : ''}>
                                        • Una letra minúscula
                                    </li>
                                    <li className={/\d/.test(formFields.newPassword) ? 'text-green-600' : ''}>
                                        • Un número
                                    </li>
                                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formFields.newPassword) ? 'text-green-600' : ''}>
                                        • Un carácter especial
                                    </li>
                                </ul>
                            </div>

                            {/* Botón de actualizar contraseña */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={isLoading || !formFields.newPassword || !formFields.confirmPassword || 
                                         formFields.newPassword !== formFields.confirmPassword}
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
                                    '&:disabled': {
                                        background: '#e5e7eb',
                                        color: '#9ca3af',
                                        boxShadow: 'none',
                                        transform: 'none'
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                            </Button>
                        </form>

                        {/* Loading bar */}
                        {isLoading && (
                            <LinearProgress 
                                sx={{ 
                                    mt: 2, 
                                    borderRadius: 1,
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#ff5252'
                                    }
                                }} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;