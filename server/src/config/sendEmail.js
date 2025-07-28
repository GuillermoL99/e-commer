const sendEmail = require("./emailServices.js");

const sendEmailFun = async ({ sendTo, subject, text, html }) => {
    try {
        console.log('📨 SendEmailFun llamada con:', { sendTo, subject });
        
        const result = await sendEmail(sendTo, subject, text, html);
        
        console.log('📤 Resultado del envío:', result);
        
        if (result.success) {
            console.log('✅ Email enviado exitosamente');
            return {
                success: true,
                message: "Email sent successfully"
            };
        } else {
            console.log('❌ Falló el envío de email:', result.error);
            return {
                success: false,
                message: "Failed to send email: " + result.error
            };
        }
    } catch (error) {
        console.error('💥 Error in sendEmailFun:', error);
        return {
            success: false,
            message: "Error sending email: " + error.message
        };
    }
};

module.exports = sendEmailFun;