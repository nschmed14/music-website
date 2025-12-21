// api/contact.js - DEBUG VERSION
exports.handler = async (event, context) => {
    console.log('=== CONTACT FUNCTION CALLED ===');
    console.log('HTTP Method:', event.httpMethod);
    console.log('Environment variables available:', {
        hasServiceId: !!process.env.REACT_APP_EMAILJS_SERVICE_ID,
        hasTemplateId: !!process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        hasPublicKey: !!process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        hasPrivateKey: !!process.env.EMAILJS_PRIVATE_KEY
    });
    
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        console.log('Method not allowed');
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

        // Check if EmailJS environment variables are set
        console.log('Checking environment variables...');
        const missingVars = [];
        if (!process.env.REACT_APP_EMAILJS_SERVICE_ID) missingVars.push('REACT_APP_EMAILJS_SERVICE_ID');
        if (!process.env.REACT_APP_EMAILJS_TEMPLATE_ID) missingVars.push('REACT_APP_EMAILJS_TEMPLATE_ID');
        if (!process.env.REACT_APP_EMAILJS_PUBLIC_KEY) missingVars.push('REACT_APP_EMAILJS_PUBLIC_KEY');
        if (!process.env.EMAILJS_PRIVATE_KEY) missingVars.push('EMAILJS_PRIVATE_KEY');
        
        if (missingVars.length > 0) {
            console.error('Missing environment variables:', missingVars);
            return {
                statusCode: 500,
                body: JSON.stringify({ 
                    error: `Email service not configured. Missing: ${missingVars.join(', ')}` 
                })
            };
        }

        console.log('All env vars present, attempting to send via EmailJS...');
        
        // Send email via EmailJS
        const emailjsPayload = {
            service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
            template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'noahschmedding@gmail.com', // Your email
                reply_to: email
            }
        };

        console.log('Sending to EmailJS with payload (excluding sensitive data)...');
        console.log('Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID.substring(0, 10) + '...');
        console.log('Template ID:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID.substring(0, 10) + '...');
        console.log('Public Key:', process.env.REACT_APP_EMAILJS_PUBLIC_KEY.substring(0, 10) + '...');

        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailjsPayload)
        });

        console.log('EmailJS response status:', emailjsResponse.status);
        
        const responseText = await emailjsResponse.text();
        console.log('EmailJS response:', responseText.substring(0, 200));

        if (!emailjsResponse.ok) {
            console.error('EmailJS error response:', responseText);
            throw new Error(`EmailJS failed with status ${emailjsResponse.status}`);
        }

        console.log('✅ Email sent successfully!');
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
        console.error('Error stack:', error.stack);
        
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                error: 'Unable to send your message. Please try again later.' 
            })
        };
    }
};