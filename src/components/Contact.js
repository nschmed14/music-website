/**
 * @file ContactForm.js
 * @description Secure contact form component with serverless backend
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React, { useState, useEffect, useRef } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [recaptchaReady, setRecaptchaReady] = useState(false);
    const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
    const isInitialized = useRef(false);

    useEffect(() => {
        // Skip if already initialized or no key
        if (isInitialized.current || !recaptchaKey) {
            setRecaptchaReady(true); // Allow form without reCAPTCHA
            return;
        }

        // Check if reCAPTCHA is already loaded
        if (window.grecaptcha && window.grecaptcha.ready) {
            setRecaptchaReady(true);
            isInitialized.current = true;
            return;
        }

        // Load reCAPTCHA script
        const loadRecaptcha = () => {
            const scriptId = 'recaptcha-v3-script';
            
            // Don't load if already loading/loaded
            if (document.getElementById(scriptId)) {
                // Script exists, wait for it to load
                const checkReady = setInterval(() => {
                    if (window.grecaptcha && window.grecaptcha.ready) {
                        clearInterval(checkReady);
                        setRecaptchaReady(true);
                        isInitialized.current = true;
                    }
                }, 100);
                
                setTimeout(() => clearInterval(checkReady), 5000); // Timeout after 5s
                return;
            }

            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`;
            script.id = scriptId;
            script.async = true;
            script.defer = true;
            
            script.onload = () => {
                if (window.grecaptcha) {
                    window.grecaptcha.ready(() => {
                        console.log('reCAPTCHA v3 initialized successfully');
                        setRecaptchaReady(true);
                        isInitialized.current = true;
                    });
                }
            };
            
            script.onerror = (err) => {
                console.error('Failed to load reCAPTCHA:', err);
                setError('Security system failed to load. Form may not work.');
                setRecaptchaReady(true); // Allow form to work without reCAPTCHA
                isInitialized.current = true;
            };

            document.head.appendChild(script);
        };

        // Start loading
        loadRecaptcha();
        
        // Fallback: If reCAPTCHA doesn't load in 3 seconds, allow form anyway
        const fallbackTimer = setTimeout(() => {
            if (!isInitialized.current) {
                console.warn('reCAPTCHA loading timeout - proceeding without it');
                setRecaptchaReady(true);
                isInitialized.current = true;
            }
        }, 3000);

        return () => {
            clearTimeout(fallbackTimer);
        };
    }, [recaptchaKey]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/<[^>]*>/g, '');
        setFormData(prev => ({
            ...prev,
            [name]: sanitizedValue
        }));
        if (error) setError('');
    };

    const getRecaptchaToken = async () => {
        // If reCAPTCHA isn't ready or key is test key, return a mock token
        if (!recaptchaReady || !window.grecaptcha || recaptchaKey === '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI') {
            console.log('Using mock reCAPTCHA token for testing');
            return 'test-recaptcha-token-' + Date.now();
        }

        try {
            console.log('Getting reCAPTCHA token...');
            return await window.grecaptcha.execute(recaptchaKey, {
                action: 'contact_submit'
            });
        } catch (err) {
            console.error('reCAPTCHA token error:', err);
            // Return mock token on error so form still works
            return 'error-recaptcha-token-' + Date.now();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Client-side validation
        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email');
            return;
        }
        if (!formData.message.trim() || formData.message.length < 10) {
            setError('Message must be at least 10 characters');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Get token (real or mock)
            const recaptchaToken = await getRecaptchaToken();
            
            console.log('Sending form data with token:', recaptchaToken.substring(0, 20) + '...');
            
            // Send to serverless function
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    message: formData.message.trim(),
                    recaptchaToken
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Submission failed');
            }

            // Success
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            
            // Auto-hide success message
            setTimeout(() => setSubmitted(false), 5000);

        } catch (err) {
            console.error('Form submission error:', err);
            setError(err.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <Header />
            
            {/* Background Image */}
            <div className="fixed inset-0 -z-10">
                <picture>
                    <source srcSet="/assets/contact.webp" type="image/webp" />
                    <img
                        src="/assets/contact.jpg"
                        alt="Contact Background"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: '33% center' }}
                        loading="lazy"
                        decoding="async"
                        width="1920"
                        height="1080"
                    />
                </picture>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10 pt-40 flex-grow flex justify-end">
                <div className="w-full max-w-lg mr-0 lg:mr-8">
                    {/* Contact Header */}
                    <div className="bg-[#5C4033]/80 backdrop-blur-md border-2 border-black rounded-xl p-6 mb-6">
                        <h1 
                            className="text-4xl md:text-5xl font-light mb-4 text-white" 
                            style={{ fontFamily: "'Ringbearer', sans-serif" }}
                        >
                            Contact Me
                        </h1>
                        
                        <p className="text-white text-lg mb-4">
                            If you are reaching out regarding a lesson inquiry, please include:
                        </p>
                        
                        <ul className="text-white space-y-2 ml-4 list-disc">
                            <li>Student's name</li>
                            <li>Student's year in school</li>
                            <li>Student's primary instrument</li>
                            <li>How many years the student has been playing</li>
                        </ul>
                    </div>
                    
                    {/* Status Messages */}
                    {submitted && (
                        <div className="mb-6 p-4 bg-green-900/90 backdrop-blur-md border-2 border-green-600 text-white rounded-lg">
                            <p className="font-semibold">✅ Message Sent Successfully!</p>
                            <p className="text-sm mt-1 opacity-90">
                                I'll get back to you within 24-48 hours.
                            </p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/90 backdrop-blur-md border-2 border-red-600 text-white rounded-lg">
                            <p className="font-semibold">❌ Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {/* Form */}
                    <div className="bg-[#5C4033]/80 backdrop-blur-md border-2 border-black rounded-xl p-6">
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name *" 
                                className="w-full px-4 py-3 bg-[#4A2C2A]/70 backdrop-blur-sm text-white placeholder-gray-300 border border-[#6B4F4F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A5A] focus:border-[#8B5A5A] transition-all"
                                required
                                disabled={loading}
                                minLength="2"
                                maxLength="100"
                            />
                            
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email *" 
                                className="w-full px-4 py-3 bg-[#4A2C2A]/70 backdrop-blur-sm text-white placeholder-gray-300 border border-[#6B4F4F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A5A] focus:border-[#8B5A5A] transition-all"
                                required
                                disabled={loading}
                            />
                            
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message *" 
                                className="w-full px-4 py-3 bg-[#4A2C2A]/70 backdrop-blur-sm text-white placeholder-gray-300 border border-[#6B4F4F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A5A] focus:border-[#8B5A5A] transition-all min-h-[150px]"
                                required
                                disabled={loading}
                                minLength="10"
                                maxLength="2000"
                            />
                            
                            <div className="text-xs text-gray-300 text-center pt-2">
                                <p>reCAPTCHA Status: {recaptchaReady ? 'Ready' : 'Initializing...'}</p>
                                <p className="text-[10px] opacity-70">Using {recaptchaKey === '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' ? 'TEST' : 'LIVE'} key</p>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full px-6 py-3 bg-[#5C4033] text-white rounded-lg hover:bg-[#8B5A5A] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-[#6B4F4F]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg 
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                                            fill="none" 
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : 'Send Message'}
                            </button>
                            
                            <p className="text-gray-300 text-sm text-center pt-2">
                                Your information is protected and will only be used to respond to your inquiry.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default ContactForm;