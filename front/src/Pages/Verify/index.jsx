import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, Alert, CircularProgress } from '@mui/material';
import { CheckCircle, Email, ArrowBack } from '@mui/icons-material';
import OtpBox from '../../components/OtpBox';
import { verificarEmail } from '../../components/api/auth';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Obtener el email desde el state o localStorage
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        const emailFromState = location.state?.email;
        const emailFromStorage = localStorage.getItem('pendingVerification');
        
        if (emailFromState) {
            setEmail(emailFromState);
        } else if (emailFromStorage) {
            setEmail(emailFromStorage);
        } else {
            // Si no hay email, redirigir al registro
            navigate('/register');
        }
    }, [location, navigate]);
    
    const handleOtpChange = (value) => {
        setOtp(value);
        setError(''); // Limpiar errores al cambiar OTP
    };

    const handleVerify = async () => {
        if (otp.length === 6 && email) {
            setIsVerifying(true);
            setError('');
            
            try {
                const result = await verificarEmail({
                    email: email,
                    otp: otp
                });
                
                setSuccess(true);
                
                // Limpiar datos de verificación pendiente
                localStorage.removeItem('pendingVerification');
                
                // Redirigir al login después de 2 segundos
                setTimeout(() => {
                    navigate('/login', { 
                        state: { 
                            message: 'Cuenta verificada exitosamente. Ya puedes iniciar sesión.' 
                        } 
                    });
                }, 2000);
                
            } catch (error) {
                setError(error.message || 'Error al verificar el código');
            } finally {
                setIsVerifying(false);
            }
        } else {
            setError('Por favor, ingresa el código de 6 dígitos completo');
        }
    };

    const handleResendCode = () => {
        // Lógica para reenviar código
        setOtp('');
        // Aquí puedes agregar la lógica para reenviar OTP
    };

    return (
        <section className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 flex items-center justify-center'>
            <div className='w-full max-w-md'>
                {/* Botón de regresar */}
                <div className='mb-6'>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/register')}
                        sx={{
                            color: '#6b7280',
                            textTransform: 'none',
                            '&:hover': {
                                color: '#ff5252',
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        Volver al registro
                    </Button>
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
                            ¡Verificación exitosa! Redirigiendo al login...
                        </Alert>
                    )}

                    {/* Header con logo */}
                    <div className='text-center mb-8'>
                        <div className='w-20 h-20 bg-gradient-to-r from-[#ff5252] to-[#ff8a80] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300'>
                            <Email className='text-white text-3xl' />
                        </div>
                        <h1 className='text-2xl font-bold text-gray-800 mb-3'>Verifica tu Código</h1>
                        <p className='text-gray-600 leading-relaxed'>
                            Hemos enviado un código de 6 dígitos a:
                            <br />
                            <span className='text-[#ff5252] font-medium'>{email}</span>
                        </p>
                    </div>

                    {/* OTP Input */}
                    <div className='mb-8'>
                        <OtpBox length={6} onChange={handleOtpChange}/>
                    </div>

                    {/* Botón de verificar */}
                    <Button
                        onClick={handleVerify}
                        disabled={otp.length !== 6 || isVerifying}
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={isVerifying ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
                        sx={{
                            background: otp.length === 6 ? 'linear-gradient(135deg, #ff5252 0%, #ff8a80 100%)' : '#e5e7eb',
                            borderRadius: '12px',
                            padding: '14px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                            textTransform: 'none',
                            color: otp.length === 6 ? 'white' : '#9ca3af',
                            boxShadow: otp.length === 6 ? '0 8px 25px rgba(255, 82, 82, 0.3)' : 'none',
                            '&:hover': {
                                background: otp.length === 6 ? 'linear-gradient(135deg, #e04848 0%, #ff6f6f 100%)' : '#e5e7eb',
                                boxShadow: otp.length === 6 ? '0 12px 35px rgba(255, 82, 82, 0.4)' : 'none',
                                transform: otp.length === 6 ? 'translateY(-2px)' : 'none',
                            },
                            '&:disabled': {
                                background: '#e5e7eb',
                                color: '#9ca3af',
                                cursor: 'not-allowed'
                            },
                            transition: 'all 0.3s ease',
                            mb: 3
                        }}
                    >
                        {isVerifying ? 'Verificando...' : 'Verificar y Continuar'}
                    </Button>

                    {/* Reenviar código */}
                    <div className='text-center space-y-4'>
                        <p className='text-sm text-gray-600'>
                            ¿No recibiste el código?
                        </p>
                        <Button
                            onClick={handleResendCode}
                            sx={{
                                color: '#ff5252',
                                textTransform: 'none',
                                fontWeight: '600',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 82, 82, 0.05)',
                                    color: '#e04848'
                                }
                            }}
                        >
                            Reenviar Código
                        </Button>
                    </div>

                    {/* Información adicional */}
                    <div className='mt-8 pt-6 border-t border-gray-100'>
                        <div className='bg-blue-50 rounded-xl p-4'>
                            <div className='flex items-start gap-3'>
                                <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                    <span className='text-blue-600 text-xs font-bold'>i</span>
                                </div>
                                <div>
                                    <p className='text-sm text-blue-800 font-medium mb-1'>Proceso de verificación:</p>
                                    <ul className='text-xs text-blue-700 space-y-1'>
                                        <li>• Revisa tu carpeta de spam</li>
                                        <li>• El código expira en 10 minutos</li>
                                        <li>• Después podrás iniciar sesión</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Verify;