import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const Signup: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setError('');
        setLoading(true);
        try {
            // useAuth's signup handles creating the user document in Firestore
            await signup(email, password, fullName);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to create account');
            console.error("Signup Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-dark text-light">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 relative z-10">
                <div className="max-w-md mx-auto w-full">
                    <div className="mb-10">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-500 mb-2 inline-block">
                            Finalytics
                        </Link>
                        <h1 className="text-4xl font-bold mb-3 text-white">Create Account</h1>
                        <p className="text-slate-400">Join thousands of investors making smarter decisions.</p>
                    </div>

                    {error && (
                        <div className="bg-danger/10 text-danger p-4 rounded-lg mb-6 border border-danger/20 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            icon={FaUser}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            icon={FaEnvelope}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            icon={FaLock}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            icon={FaLock}
                            required
                        />

                        <Button type="submit" variant="primary" className="w-full py-3 text-lg shadow-lg shadow-accent/20" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-dark text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2" icon={FaGoogle} onClick={async () => {
                                try {
                                    await googleLogin();
                                    navigate('/dashboard');
                                } catch (err: any) {
                                    setError(err.message || 'Failed to signup with Google');
                                }
                            }}>
                                Google
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-accent font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Visuals */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-l from-dark via-dark/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
                    <h2 className="text-4xl font-bold mb-4">Start your journey today.</h2>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                        Get access to real-time data, advanced charting, and AI-driven insights that give you the edge.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-slate-700 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-bold">2,000+</span>
                            <span className="text-xs text-slate-400">Active Traders</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
