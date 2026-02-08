
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Sprout, UserPlus, Mail, Phone, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // We might auto-login or just redirect

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Signup failed');
            }

            // Auto-login or redirect to login
            // For now, let's redirect to login with a success message state? 
            // Or better, just auto-login if the backend returns a token (which it does)

            if (data.access_token) {
                login(data.username, data.access_token);
                navigate('/');
            } else {
                navigate('/login');
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-green-600 p-6">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                        <Sprout className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Join CropAI to access smart farming tools
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-md border border-red-200 dark:border-red-900/50">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="username"
                                placeholder="johndoe"
                                className="pl-9"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                className="pl-9"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="1234567890"
                                className="pl-9"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-9"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="pl-9"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-md transition-all hover:scale-[1.02]"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                Creating Account...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <UserPlus className="h-4 w-4" />
                                Sign Up
                            </span>
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link to="/login" className="font-semibold text-green-600 hover:text-green-700 hover:underline">
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    );
}
