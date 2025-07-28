const verifyEmailTemplate = ({ username, otp }) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificar tu cuenta</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
            }
            
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
            }
            
            .header h1 {
                font-size: 28px;
                margin-bottom: 10px;
                font-weight: 300;
            }
            
            .content {
                padding: 40px 30px;
            }
            
            .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                color: #2c3e50;
            }
            
            .message {
                font-size: 16px;
                margin-bottom: 30px;
                line-height: 1.8;
                color: #555;
            }
            
            .verify-button {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 40px;
                text-decoration: none;
                border-radius: 50px;
                font-weight: bold;
                font-size: 16px;
                margin: 20px 0;
                transition: transform 0.3s ease;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            
            .verify-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
            }
            
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            
            .alternative-link {
                background-color: #f8f9fa;
                border: 1px dashed #dee2e6;
                border-radius: 8px;
                padding: 20px;
                margin: 30px 0;
            }
            
            .alternative-link p {
                font-size: 14px;
                color: #6c757d;
                margin-bottom: 10px;
            }
            
            .link-text {
                font-size: 12px;
                color: #007bff;
                word-break: break-all;
                background-color: white;
                padding: 10px;
                border-radius: 4px;
                border: 1px solid #e9ecef;
            }
            
            .footer {
                background-color: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            
            .footer p {
                font-size: 14px;
                color: #6c757d;
                margin-bottom: 10px;
            }
            
            .security-notice {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 20px;
                margin: 30px 0;
            }
            
            .security-notice h3 {
                color: #856404;
                font-size: 16px;
                margin-bottom: 10px;
            }
            
            .security-notice p {
                color: #856404;
                font-size: 14px;
            }
            
            .icon {
                width: 60px;
                height: 60px;
                margin: 0 auto 20px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 30px;
            }
            
            @media screen and (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 0;
                }
                
                .content {
                    padding: 30px 20px;
                }
                
                .header {
                    padding: 30px 20px;
                }
                
                .header h1 {
                    font-size: 24px;
                }
                
                .verify-button {
                    padding: 12px 30px;
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="icon">✉️</div>
                <h1>Verificar tu cuenta</h1>
                <p>Solo falta un paso más</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    ¡Hola ${username}!
                </div>
                
                <div class="message">
                    Gracias por registrarte en nuestra plataforma. Para completar tu registro y comenzar a disfrutar de todos nuestros servicios, necesitamos verificar tu dirección de correo electrónico con el siguiente código:
                </div>
                
                <div class="button-container">
                    <div style="background: #f8f9fa; border: 2px dashed #667eea; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
                        <h2 style="color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h2>
                        <p style="color: #666; margin: 10px 0 0 0;">Código de verificación</p>
                    </div>
                </div>
                
                <div class="alternative-link">
                    <p><strong>Instrucciones:</strong></p>
                    <p>Ingresa este código de 6 dígitos en la página de verificación para activar tu cuenta.</p>
                </div>
                
                <div class="security-notice">
                    <h3>🔒 Aviso de seguridad</h3>
                    <p>Este código de verificación expirará en <strong>10 minutos</strong> por razones de seguridad. Si no verificas tu cuenta en este tiempo, deberás solicitar un nuevo código de verificación.</p>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>¿No te registraste en nuestro sitio?</strong></p>
                <p>Si no creaste una cuenta con nosotros, puedes ignorar este correo de forma segura.</p>
                <p style="margin-top: 20px; font-size: 12px;">
                    Este es un correo automático, por favor no respondas a este mensaje.
                </p>
                <p style="font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Tu E-commerce. Todos los derechos reservados.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = verifyEmailTemplate;
