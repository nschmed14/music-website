import Header from './Header';

export default function Bio() {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <Header />
        
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <img
            src="/assets/bio.jpg"
            alt="Bio Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <h1 className="text-4xl font-Kanit font-light mb-6">About Me</h1>
          <p className="text-lg font-light leading-relaxed">
            Your biography text here...
          </p>
        </div>
      </div>
    );
}