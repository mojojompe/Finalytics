import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await resetPassword(email);
            setMessage('Check your inbox for further instructions.');
        } catch (err: any) {
            setError('Failed to reset password. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark p-4">
            <div className="bg-secondary p-8 rounded-xl shadow-2xl w-full max-w-md border border-slate-700" data-aos="zoom-in">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
                    <p className="text-slate-400">Enter your email to receive password reset instructions.</p>
                </div>

                {error && (
                    <div className="bg-danger/10 text-danger p-3 rounded-lg mb-6 text-sm border border-danger/20">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-success/10 text-success p-3 rounded-lg mb-6 text-sm border border-success/20">
                        {message}
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

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-3"
                        disabled={loading}
                    >
                        {loading ? 'Sending Link...' : 'Send Reset Link'}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-colors">
                        <FaArrowLeft size={12} /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
