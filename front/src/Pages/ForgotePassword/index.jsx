// React y dependencias externas
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

// Material-UI
import { 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  Alert,
  LinearProgress,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'
import { 
  Visibility, 
  VisibilityOff, 
  Lock, 
  CheckCircle,
  ArrowBack,
  Email,
  VpnKey
} from '@mui/icons-material'

// API
import { 
  solicitarRecuperacionPassword, 
  verificarCodigoRecuperacion, 
  restablecerPassword 
} from '../../components/api/passwordRecovery'

const ForgotPassword = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Obtener el email desde el state de navegación
    useEffect(() => {
        if (location.state && location.state.email) {
            setFormData(prev => ({
                ...prev,
                email: location.state.email
            }));
        }
    }, [location.state]);

    const steps = ['Ingresa tu email', 'Verificar código', 'Nueva contraseña'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar mensajes cuando el usuario empiece a escribir
        setErrorMessage('');
        setSuccessMessage('');
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

    // Paso 1: Solicitar código de recuperación
    const handleRequestCode = async (e) => {
        e.preventDefault();
        
        if (!formData.email) {
            setErrorMessage('Por favor ingresa tu correo electrónico');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            await solicitarRecuperacionPassword(formData.email);
            setSuccessMessage('Código de recuperación enviado a tu correo');
            setCurrentStep(1);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Paso 2: Verificar código OTP
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        
        if (!formData.otp || formData.otp.length !== 6) {
            setErrorMessage('Por favor ingresa el código de 6 dígitos');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            await verificarCodigoRecuperacion(formData.email, formData.otp);
            setSuccessMessage('Código verificado correctamente');
            setCurrentStep(2);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Paso 3: Restablecer contraseña
    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        const passwordError = validatePassword(formData.newPassword);
        if (passwordError) {
            setErrorMessage(passwordError);
            return;
        }
        
        if (formData.newPassword !== formData.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            await restablecerPassword(formData.email, formData.newPassword, formData.confirmPassword);
            setSuccessMessage('¡Contraseña actualizada exitosamente!');
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
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

    const passwordStrength = getPasswordStrength(formData.newPassword);

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <form onSubmit={handleRequestCode} className='space-y-4'>
                        <div className='text-center mb-8'>
                            <Email className='text-6xl text-blue-500 mb-4' />
                            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                                Recuperar Contraseña
                            </h2>
                            <p className='text-gray-600'>
                                {formData.email ? 
                                    'Confirma tu correo electrónico y te enviaremos un código de verificación' :
                                    'Ingresa tu correo electrónico y te enviaremos un código de verificación'
                                }
                            </p>
                        </div>

                        <TextField
                            name="email"
                            type="email"
                            label="Correo Electrónico"
                            placeholder="tu@ejemplo.com"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
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
                                },
                                mb: 3 // Agregar margen inferior
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={isLoading || !formData.email}
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
                                },
                            }}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar Código'}
                        </Button>
                    </form>
                );

            case 1:
                return (
                    <form onSubmit={handleVerifyCode} className='space-y-4'>
                        <div className='text-center mb-8'>
                            <VpnKey className='text-6xl text-green-500 mb-4' />
                            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                                Verificar Código
                            </h2>
                            <p className='text-gray-600'>
                                Ingresa el código de 6 dígitos que enviamos a<br/>
                                <strong>{formData.email}</strong>
                            </p>
                        </div>

                        <TextField
                            name="otp"
                            type="text"
                            label="Código de Verificación"
                            placeholder="123456"
                            variant="outlined"
                            fullWidth
                            value={formData.otp}
                            onChange={handleChange}
                            disabled={isLoading}
                            inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                },
                                mb: 3 // Agregar margen inferior
                            }}
                        />

                        <div className='flex gap-3'>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => setCurrentStep(0)}
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    borderColor: '#ff5252',
                                    color: '#ff5252',
                                    '&:hover': {
                                        borderColor: '#e04848',
                                        backgroundColor: 'rgba(255, 82, 82, 0.04)',
                                    },
                                }}
                            >
                                Volver
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isLoading || !formData.otp || formData.otp.length !== 6}
                                sx={{
                                    background: 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)',
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)',
                                    },
                                }}
                            >
                                {isLoading ? 'Verificando...' : 'Verificar'}
                            </Button>
                        </div>
                    </form>
                );

            case 2:
                return (
                    <form onSubmit={handleResetPassword} className='space-y-4'>
                        <div className='text-center mb-8'>
                            <Lock className='text-6xl text-purple-500 mb-4' />
                            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                                Nueva Contraseña
                            </h2>
                            <p className='text-gray-600'>
                                Crea una contraseña segura para tu cuenta
                            </p>
                        </div>

                        {/* Campo Nueva Contraseña */}
                        <div className='space-y-2'>
                            <TextField
                                name="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                label="Nueva Contraseña"
                                placeholder="••••••••"
                                variant="outlined"
                                fullWidth
                                value={formData.newPassword}
                                onChange={handleChange}
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
                                    },
                                }}
                            />
                            
                            {/* Indicador de fortaleza */}
                            {formData.newPassword && (
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
                            <TextField
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                label="Confirmar Contraseña"
                                placeholder="••••••••"
                                variant="outlined"
                                fullWidth
                                value={formData.confirmPassword}
                                onChange={handleChange}
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
                                            borderColor: formData.confirmPassword && formData.newPassword === formData.confirmPassword ? '#4caf50' : '#e5e7eb',
                                        },
                                    },
                                }}
                            />
                            
                            {/* Indicador de coincidencia */}
                            {formData.confirmPassword && (
                                <div className='flex items-center gap-2 mt-2'>
                                    {formData.newPassword === formData.confirmPassword ? (
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
                        <div className='bg-blue-50 rounded-xl p-4 mb-4'>
                            <h4 className='text-sm font-semibold text-blue-800 mb-2'>Requisitos de contraseña:</h4>
                            <ul className='text-xs text-blue-700 space-y-1'>
                                <li className={formData.newPassword.length >= 8 ? 'text-green-600' : ''}>
                                    • Al menos 8 caracteres
                                </li>
                                <li className={/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : ''}>
                                    • Una letra mayúscula
                                </li>
                                <li className={/[a-z]/.test(formData.newPassword) ? 'text-green-600' : ''}>
                                    • Una letra minúscula
                                </li>
                                <li className={/\d/.test(formData.newPassword) ? 'text-green-600' : ''}>
                                    • Un número
                                </li>
                                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? 'text-green-600' : ''}>
                                    • Un carácter especial
                                </li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={isLoading || !formData.newPassword || !formData.confirmPassword || 
                                     formData.newPassword !== formData.confirmPassword}
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
                                },
                            }}
                        >
                            {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                        </Button>
                    </form>
                );

            default:
                return null;
        }
    };

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

                    {/* Stepper */}
                    <Box sx={{ mb: 4 }}>
                        <Stepper activeStep={currentStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    {/* Mensajes de éxito y error */}
                    {successMessage && (
                        <Alert 
                            severity="success" 
                            icon={<CheckCircle />}
                            sx={{ mb: 3, borderRadius: '12px' }}
                        >
                            {successMessage}
                        </Alert>
                    )}

                    {errorMessage && (
                        <Alert 
                            severity="error"
                            sx={{ mb: 3, borderRadius: '12px' }}
                        >
                            {errorMessage}
                        </Alert>
                    )}

                    {/* Card principal */}
                    <div className='bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 backdrop-blur-sm'>
                        {renderStepContent()}

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

                    {/* Link al login */}
                    <div className='text-center mt-6'>
                        <Typography variant="body2" color="textSecondary">
                            ¿Recordaste tu contraseña?{' '}
                            <Link 
                                to="/login" 
                                className='text-[#ff5252] hover:text-[#e04848] font-medium transition-colors'
                            >
                                Iniciar Sesión
                            </Link>
                        </Typography>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;