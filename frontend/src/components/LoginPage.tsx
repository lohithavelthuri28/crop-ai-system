import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Sprout, Brain, LogIn, Lock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LoginPage() {
    const { t } = useTranslation();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/estimate';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: identifier,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Login failed');
            }

            login(data.username, data.access_token);
            navigate(from, { replace: true });

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-green-600">
                <CardHeader className="text-center space-y-4 pb-2">
                    <div className="mx-auto flex items-center justify-center gap-2 mb-2">
                        <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-2">
                            <Sprout className="h-6 w-6 text-white" />
                        </div>
                        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                            {t('auth.welcomeBack')}
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            {t('auth.signInMessage')}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-md border border-red-200 dark:border-red-900/50">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="identifier">{t('auth.username')}</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="identifier"
                                    placeholder={t('auth.identifierPlaceholder')}
                                    className="pl-9 h-11"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t('auth.password')}</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-9 h-11"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    {t('auth.signingIn')}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <LogIn className="h-4 w-4" />
                                    {t('auth.signIn')}
                                </span>
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 justify-center border-t py-4 bg-muted/20">
                    <div className="text-sm text-center">
                        {t('auth.dontHaveAccount')} {' '}
                        <Link to="/signup" className="font-semibold text-green-600 hover:text-green-700 hover:underline">
                            {t('auth.signUp')}
                        </Link>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        {t('auth.termsMessage')}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
