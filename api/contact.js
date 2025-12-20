const EmailJS = require('@emailjs/nodejs');

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, message, recaptchaToken } = req.body;

        // 1. Validate required fields
        if (!name || !email || !message || !recaptchaToken) {
            return res.status(400).json({ 
                error: 'Missing required fields' 
            });
        }

        // 2. Server-side validation
        if (name.length < 2 || name.length > 100) {
            return res.status(400).json({ 
                error: 'Name must be 2-100 characters' 
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format' 
            });
        }

        if (message.length < 10 || message.length > 2000) {
            return res.status(400).json({ 
                error: 'Message must be 10-2000 characters' 
            });
        }

        // 3. Verify reCAPTCHA server-side (CRITICAL)
        const recaptchaSecret = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;
        
        const recaptchaResponse = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${recaptchaSecret}&response=${recaptchaToken}`
            }
        );

        const recaptchaData = await recaptchaResponse.json();
        
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            console.warn('Failed reCAPTCHA verification:', {
                score: recaptchaData.score,
                errors: recaptchaData['error-codes']
            });
            return res.status(400).json({ 
                error: 'Security verification failed' 
            });
        }

        // 4. Initialize EmailJS with your keys
        const emailjs = new EmailJS(
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
            process.env.EMAILJS_PRIVATE_KEY  // Server-side private key
        );

        // 5. Send email using v5 syntax
        await emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            {
                from_name: name.trim(),
                from_email: email.trim(),
                message: message.trim(),
                reply_to: email.trim(),
                timestamp: new Date().toISOString(),
                recaptcha_score: recaptchaData.score
            }
        );

        // 6. Success response
        return res.status(200).json({ 
            success: true,
            message: 'Message sent successfully' 
        });

    } catch (error) {
        console.error('Serverless function error:', error);
        
        // Don't expose internal errors to client
        const userMessage = error.message.includes('Invalid')
            ? 'Invalid form configuration'
            : 'Failed to send message. Please try again.';

        return res.status(500).json({ 
            error: userMessage 
        });
    }
};