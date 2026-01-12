// api/contact.js - USING EMAILJS NODE SDK
const emailjs = require('@emailjs/nodejs');

exports.handler = async (event, context) => {
    console.log('=== CONTACT FUNCTION CALLED ===');
    console.log('HTTP Method:', event.httpMethod);
    
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        console.log('Parsing request body...');
        const body = JSON.parse(event.body);
        const { name, email, message } = body;
        console.log('Received:', { name, email, message: message.substring(0, 50) + '...' });
        
        // Basic validation
        if (!name || !email || !message) {
            console.log('Validation failed: missing fields');
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Validation failed: invalid email');
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid email format' })
            };
        }

        console.log('All validation passed, sending via EmailJS Node SDK...');
        
        // Send email using EmailJS Node.js SDK
        const result = await emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'noahschmedding@gmail.com',
                reply_to: email
            },
            {
                publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY
            }
        );

        console.log('✅ Email sent successfully! EmailJS response:', result);
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                success: true, 
                message: 'Thank you! Your message has been sent successfully.'
            })
        };

    } catch (error) {
        console.error('❌ Contact form error:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Unable to send your message. Please try again later.';
        
        if (error.message.includes('Invalid private key')) {
            errorMessage = 'Email service configuration error. Please contact site administrator.';
        } else if (error.message.includes('Invalid template')) {
            errorMessage = 'Email template error. Please contact site administrator.';
        }
        
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                error: errorMessage,
                debug: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};