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
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to login');
            console.error("Login Error:", err);
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
                        <h1 className="text-4xl font-bold mb-3 text-white">Welcome Back</h1>
                        <p className="text-slate-400">Enter your credentials to access your account.</p>
                    </div>

                    {error && (
                        <div className="bg-danger/10 text-danger p-4 rounded-lg mb-6 border border-danger/20 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            icon={FaEnvelope}
                            required
                        />

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                icon={FaLock}
                                required
                            />
                            <div className="flex justify-end mt-2">
                                <Link to="/forgot-password" className="text-sm text-accent hover:text-accent/80 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" className="w-full py-3 text-lg shadow-lg shadow-accent/20" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
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
                                    setError(err.message || 'Failed to login with Google');
                                }
                            }}>
                                Google
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-accent font-semibold hover:underline">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Visuals */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-l from-dark via-dark/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
                    <blockquote className="text-2xl font-medium leading-relaxed mb-6">
                        "Finalytics has completely transformed how I analyze the market. The AI predictions are uncannily accurate."
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                            JD
                        </div>
                        <div>
                            <div className="font-bold">John Doe</div>
                            <div className="text-slate-400 text-sm">Professional Trader</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
