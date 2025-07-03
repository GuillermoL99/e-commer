import React, { useState, useRef, useEffect } from 'react';

const OtpBox = ({ onChange, length }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        // Enfocar el primer input al montar el componente
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        // Solo permitir números
        if (value && isNaN(value)) return;
        
        // Actualizar el valor OTP
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(''));
        
        // Auto-focus al siguiente input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // Si el campo actual está vacío, ir al anterior
                inputRefs.current[index - 1]?.focus();
            } else {
                // Limpiar el campo actual
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
                onChange(newOtp.join(''));
            }
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData('text');
        const pasteValues = pasteData.slice(0, length).split('');
        
        if (pasteValues.every(val => !isNaN(val) && val !== '')) {
            const newOtp = Array(length).fill('');
            pasteValues.forEach((val, idx) => {
                if (idx < length) newOtp[idx] = val;
            });
            setOtp(newOtp);
            onChange(newOtp.join(''));
            
            // Enfocar el último input lleno o el siguiente vacío
            const nextIndex = Math.min(pasteValues.length, length - 1);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    return (
        <div className="flex justify-center gap-3 mb-6">
            {otp.map((data, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className={`
                        w-14 h-14 text-center text-xl font-bold border-2 rounded-xl
                        transition-all duration-300 outline-none
                        ${otp[index] 
                            ? 'border-[#ff5252] bg-[#ff5252]/5 text-[#ff5252] shadow-md' 
                            : 'border-gray-300 bg-white text-gray-700 hover:border-[#ff5252]/50'
                        }
                        focus:border-[#ff5252] focus:bg-[#ff5252]/5 focus:shadow-lg focus:scale-105
                        placeholder-gray-400
                    `}
                    placeholder="0"
                />
            ))}
        </div>
    );
};

export default OtpBox;