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
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setError('');
        setLoading(true);
        try {
            await signup(email, password, fullName);
            navigate('/dashboard');
        } catch (err: any) {
            setError('Failed to create account. ' + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-dark">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8" data-aos="fade-right">
                <div className="max-w-md w-full">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-slate-400">Start your journey to financial freedom today.</p>
                    </div>

                    {error && (
                        <div className="bg-danger/10 text-danger p-3 rounded-lg mb-6 text-sm border border-danger/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            icon={FaUser}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={FaEnvelope}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={FaLock}
                            required
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            icon={FaLock}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-3"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-dark text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="secondary" className="w-full py-3" icon={FaGoogle}>
                            Sign up with Google
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-accent font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-bl from-secondary to-dark relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 p-12 text-center max-w-lg" data-aos="fade-up">
                    <h3 className="text-3xl font-bold text-white mb-4">Real-time Analytics</h3>
                    <p className="text-lg text-slate-300">
                        Get instant access to market data, news, and AI-powered predictions to stay ahead of the curve.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
