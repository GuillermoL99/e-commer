const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Usar el servicio predefinido de Gmail
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: { 
        user: process.env.EMAIL, // tu dirección de email
        pass: process.env.EMAIL_PASSWORD // tu contraseña de aplicación
    },
    tls: {
        rejectUnauthorized: false // Para evitar problemas con certificados
    }
});

async function sendEmail(to, subject, text, html) {
    try {
        console.log('🔄 Intentando enviar email a:', to);
        console.log('📧 Configuración SMTP:', {
            host: 'smtp.gmail.com',
            port: 587,
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD ? '***configurada***' : '❌ NO CONFIGURADA'
        });

        const info = await transporter.sendMail({
            from: `"E-commerce App" <${process.env.EMAIL}>`, // dirección del remitente
            to, // lista de destinatarios
            subject, // línea de asunto
            text, // cuerpo de texto plano
            html, // cuerpo html
        });
        
        console.log('✅ Email enviado exitosamente:', info.messageId);
        return { success: true, messageId: info.messageId };

    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error: error.message };
    }
}  

module.exports = sendEmail;
