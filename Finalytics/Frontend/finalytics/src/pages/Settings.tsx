import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import useUserStore from '../stores/useUserStore';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { FaUser, FaEnvelope, FaLock, FaSave, FaCog, FaDesktop, FaChartArea, FaPalette } from 'react-icons/fa';
import useSettingsStore from '../stores/useSettingsStore';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { updateProfile } from 'firebase/auth';

const Settings: React.FC = () => {
    const { user, setUser } = useUserStore();
    const { resetPassword } = useAuth();
    const {
        compactMode, setCompactMode,
        showVolume, setShowVolume,
        chartType, setChartType,
        accentColor, setAccentColor
    } = useSettingsStore();

    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            // In a real app, we would fetch extended profile data here
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentUser = auth.currentUser;
        if (!currentUser || !user) return;

        setLoading(true);
        setMessage(null);

        try {
            // Update auth profile
            await updateProfile(currentUser, { displayName: fullName });

            // Update Firestore document with extended info
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                fullName: fullName, // Store as fullName to match store
                dob,
                address,
                phone,
                updatedAt: new Date()
            }, { merge: true });

            // Update local store
            setUser({ ...user, fullName: fullName });

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!user?.email) return;
        try {
            await resetPassword(user.email);
            setMessage({ type: 'success', text: 'Password reset email sent to ' + user.email });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to send reset email' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-8">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaCog className="text-accent" /> Settings
            </h1>

            <div className="grid grid-cols-1 gap-8">
                {/* Display Settings */}
                <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaDesktop className="text-slate-400" /> Display & Appearance
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-dark/50 rounded-xl border border-slate-700">
                            <div>
                                <h3 className="font-semibold text-white">Compact Mode</h3>
                                <p className="text-sm text-slate-400 mt-1">Reduce spacing for higher information density.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={compactMode}
                                    onChange={(e) => setCompactMode(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                            </label>
                        </div>

                        <div className="p-4 bg-dark/50 rounded-xl border border-slate-700">
                            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                                <FaPalette className="text-slate-400" /> Accent Color
                            </h3>
                            <div className="flex gap-3">
                                {['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setAccentColor(color)}
                                        className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-dark' : ''}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Settings */}
                <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaChartArea className="text-slate-400" /> Chart Preferences
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-dark/50 rounded-xl border border-slate-700">
                            <div>
                                <h3 className="font-semibold text-white">Default Chart Type</h3>
                                <p className="text-sm text-slate-400 mt-1">Select your preferred chart style.</p>
                            </div>
                            <div className="flex bg-slate-800 rounded-lg p-1">
                                {(['candle', 'line', 'area'] as const).map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setChartType(type)}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${chartType === type ? 'bg-accent text-dark shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-dark/50 rounded-xl border border-slate-700">
                            <div>
                                <h3 className="font-semibold text-white">Show Volume</h3>
                                <p className="text-sm text-slate-400 mt-1">Display volume bars on charts by default.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={showVolume}
                                    onChange={(e) => setShowVolume(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaUser className="text-slate-400" /> Profile Information
                    </h2>

                    {message && (
                        <div className={`p-4 rounded-lg mb-6 border ${message.type === 'success' ? 'bg-success/10 text-success border-success/20' : 'bg-danger/10 text-danger border-danger/20'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                icon={FaUser}
                                placeholder="Enter your name"
                            />
                            <Input
                                label="Date of Birth"
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                icon={FaUser}
                            />
                            <Input
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                icon={FaUser}
                                placeholder="Enter your address"
                            />
                            <Input
                                label="Phone Number"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                icon={FaUser}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <Input
                            label="Email Address"
                            value={user?.email || ''}
                            disabled
                            icon={FaEnvelope}
                            className="opacity-50 cursor-not-allowed"
                        />

                        <div className="pt-2">
                            <Button type="submit" variant="primary" disabled={loading} icon={FaSave}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Security Section */}
                <div className="bg-secondary/50 rounded-2xl border border-slate-700 p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaLock className="text-slate-400" /> Security
                    </h2>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-dark/50 rounded-xl border border-slate-700">
                        <div>
                            <h3 className="font-semibold text-white">Password</h3>
                            <p className="text-sm text-slate-400 mt-1">
                                Receive an email to reset your password.
                            </p>
                        </div>
                        <Button variant="outline" onClick={handlePasswordReset}>
                            Reset Password
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
