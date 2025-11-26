import React from 'react';

const Settings: React.FC = () => {
    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="bg-secondary rounded-xl p-6 border border-slate-700 max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-dark rounded-lg border border-slate-700">
                        <p className="text-slate-400">User Profile Settings</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
