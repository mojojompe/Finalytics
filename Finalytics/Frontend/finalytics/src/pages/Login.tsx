import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
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
                        <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-slate-400">Enter your details to access your portfolio.</p>
                    </div>

                    {error && (
                        <div className="bg-danger/10 text-danger p-3 rounded-lg mb-6 text-sm border border-danger/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={FaEnvelope}
                            required
                        />

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={FaLock}
                                required
                            />
                            <div className="flex justify-end mt-2">
                                <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-3"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
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
                            Sign in with Google
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-accent font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-secondary to-dark relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 p-12 text-center max-w-lg" data-aos="fade-up">
                    <h3 className="text-3xl font-bold text-white mb-4">Master the Markets</h3>
                    <p className="text-lg text-slate-300">
                        Join thousands of traders using Finalytics to make smarter, data-driven investment decisions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
