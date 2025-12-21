// api/contact.js - WITH EMAILJS INTEGRATION (using built-in fetch)
exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { name, email, message } = body;
        
        // Basic validation
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid email format' })
            };
        }

        // Check if EmailJS environment variables are set
        if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || 
            !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 
            !process.env.EMAILJS_PRIVATE_KEY) {
            console.error('EmailJS environment variables are missing');
            return {
                statusCode: 500,
                body: JSON.stringify({ 
                    error: 'Email service not configured. Please contact the site administrator.' 
                })
            };
        }

        // Send email via EmailJS
        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
                template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
                accessToken: process.env.EMAILJS_PRIVATE_KEY,
                template_params: {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_email: 'naschmedding@gmail.com',
                    reply_to: email
                }
            })
        });

        if (!emailjsResponse.ok) {
            const errorText = await emailjsResponse.text();
            console.error('EmailJS error:', errorText);
            throw new Error('Failed to send email');
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                success: true, 
                message: 'Thank you! Your message has been sent successfully.'
            })
        };

    } catch (error) {
        console.error('Contact form error:', error);
        
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                error: 'Unable to send your message. Please try again later.' 
            })
        };
    }
};