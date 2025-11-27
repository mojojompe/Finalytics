import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Legal: React.FC = () => {
    return (
        <div className="min-h-screen bg-dark text-light flex flex-col">
            <Navbar />
            <div className="flex-1 max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-4xl font-bold mb-8 text-white">Legal Information</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-accent">Privacy Policy</h2>
                    <p className="text-slate-400 leading-relaxed mb-4">
                        At Finalytics, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website or use our mobile application.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                        We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-accent">Terms of Service</h2>
                    <p className="text-slate-400 leading-relaxed mb-4">
                        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Finalytics if you do not agree to take all of the terms and conditions stated on this page.
                    </p>
                    <ul className="list-disc list-inside text-slate-400 space-y-2">
                        <li>You must be at least 18 years of age to use this service.</li>
                        <li>You agree not to use the service for any illegal or unauthorized purpose.</li>
                        <li>We reserve the right to modify or terminate the service at any time.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 text-accent">Cookie Policy</h2>
                    <p className="text-slate-400 leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Legal;
