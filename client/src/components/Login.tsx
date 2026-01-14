import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Loader2, Mail, CheckCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Google icon component
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
    </svg>
);

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { toast } = useToast();

    // Google OAuth login
    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'https://somosmaas.org/dashboard',
                },
            });

            if (error) throw error;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "No se pudo iniciar con Google",
                variant: "destructive",
            });
            setGoogleLoading(false);
        }
    };

    // Magic link login (fallback)
    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: 'https://somosmaas.org/dashboard',
                },
            });

            if (error) throw error;

            setSent(true);
            toast({
                title: "¡Enlace enviado!",
                description: "Revisa tu bandeja de entrada.",
                duration: 5000,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Intenta nuevamente.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <Card className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border-slate-700 shadow-2xl p-8 relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-poppins font-bold text-white mb-2">Bienvenido</h2>
                    <p className="text-slate-400">Accede a tu Command Center</p>
                </div>

                {sent ? (
                    <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">¡Revisa tu Correo!</h3>
                        <p className="text-slate-400">Te enviamos un enlace de acceso.</p>
                        <Button
                            variant="ghost"
                            className="mt-6 text-slate-400 hover:text-white"
                            onClick={() => setSent(false)}
                        >
                            Usar otro método
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Google OAuth Button - PRIMARY */}
                        <Button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={googleLoading}
                            className="w-full bg-white hover:bg-gray-100 text-gray-800 h-12 font-semibold flex items-center justify-center gap-3 transition-all"
                        >
                            {googleLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <GoogleIcon />
                                    Continuar con Google
                                </>
                            )}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-2 text-slate-500">o</span>
                            </div>
                        </div>

                        {/* Magic Link Form - SECONDARY */}
                        <form onSubmit={handleMagicLink} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 h-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 h-12"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Enviar enlace mágico"
                                )}
                            </Button>
                        </form>

                        {/* Footer */}
                        <p className="text-center text-xs text-slate-500 mt-4">
                            ¿Primera vez?{" "}
                            <a href="/activate" className="text-blue-400 hover:underline">
                                Activa tu membresía
                            </a>
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Login;
