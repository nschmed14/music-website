import { useState } from 'react';
import Header from './Header';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
      <div className="relative min-h-screen overflow-hidden">
        <Header />
        
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <img
            src="/assets/contact.jpg"
            alt="Contact Background"
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10 pt-40">
          <h1 className="text-4xl font-Kanit font-light mb-6 text-white">Contact Me for Lessons</h1>
          
          {submitted && (
            <div className="mb-6 p-4 bg-[#2C423F] text-white rounded-lg">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-gray-300 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-[#2C423F] focus:border-[#2C423F]"
              required
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email" 
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-gray-300 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-[#2C423F] focus:border-[#2C423F]"
              required
            />
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message" 
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-gray-300 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-[#2C423F] focus:border-[#2C423F] min-h-[150px]"
              required
            ></textarea>
            <button 
              type="submit" 
              className="px-6 py-3 bg-[#2C423F] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200 font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
}