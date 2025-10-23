import React from 'react';
import { QrCode, BellRing, Heart, Bone } from 'lucide-react';

/**
 * Home.jsx
 * The main landing page view.
 * Receives the navigation function as a prop.
 */
const Home = ({ navigate }) => (
    <section id="home" className="p-8">
        <div className="text-center py-16 bg-sky-500 rounded-3xl shadow-2xl text-white mb-12">
            <Bone className="w-16 h-16 mb-4 inline-block animate-bounce mx-auto" />
            <h1 className="text-6xl font-extrabold mb-3">“Because Paws can’t speak, we RePawt for them!” </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Repawtly creates smart, stylish pet ID tags with a unique QR code. If your pet wanders off, anyone can scan the tag to instantly access their vital contact and health information.
            </p>
            <button
                className="mt-8 px-8 py-4 bg-amber-400 text-gray-900 font-extrabold text-lg rounded-full shadow-xl hover:bg-amber-300 transition duration-300 transform hover:scale-105"
                onClick={() => navigate('products')}
            >
                Browse Our Tags Today!
            </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-amber-400 text-center">
                <QrCode className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Profile Access</h3>
                <p className="text-gray-600">The QR code links directly to a secure, customizable profile page with emergency contacts and vet info.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-sky-500 text-center">
                <BellRing className="w-12 h-12 text-sky-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Alert System</h3>
                <p className="text-gray-600">Get an immediate notification the moment someone scans your pet's tag, complete with the location!</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-amber-400 text-center">
                <Heart className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Lifetime Warranty</h3>
                <p className="text-gray-600">All our smart tags are built to last and come with a free lifetime replacement policy. Buy once, secure forever.</p>
            </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-12 bg-sky-100 rounded-2xl">
            <h2 className="text-3xl font-bold text-sky-800 mb-4">Ready to RePawt?</h2>
            <p className="text-lg text-sky-700 mb-6">Give your furry friend the ultimate safety net. It only takes a minute to customize your perfect tag.</p>
            <button
                className="px-8 py-4 bg-sky-500 text-white font-extrabold text-lg rounded-full shadow-xl hover:bg-sky-700 transition duration-300 transform hover:scale-105"
                onClick={() => navigate('register')}
            >
                Get Started Now!
            </button>
        </div>
    </section>
);

export default Home;
