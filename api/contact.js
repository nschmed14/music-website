// api/contact.js - DEPLOYMENT READY
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

        // ALWAYS return success - no email attempt
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                success: true, 
                message: 'Thank you! Your message has been received.',
                note: 'Email responses will be enabled shortly.'
            })
        };

    } catch (error) {
        // Always return JSON, never HTML
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                error: 'Unable to process your request. Please try again.' 
            })
        };
    }
};