import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Loader2, Mail, CheckCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    // This should point to your production URL when deployed
                    emailRedirectTo: window.location.origin + '/activate',
                },
            });

            if (error) throw error;

            setSent(true);
            toast({
                title: "¡Enlace enviado!",
                description: "Revisa tu bandeja de entrada para acceder.",
                duration: 5000,
            });
        } catch (error: any) {
            toast({
                title: "Error al enviar",
                description: error.message || "Intenta nuevamente.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <Card className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border-slate-700 shadow-2xl p-8 relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 mx-auto flex items-center justify-center mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-gold" />
                    </div>
                    <h2 className="text-3xl font-poppins font-bold text-white mb-2">Bienvenido a Bordo</h2>
                    <p className="text-slate-400">Ingresa tu email para acceder a tu Command Center.</p>
                </div>

                {sent ? (
                    <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">¡Revisa tu Correo!</h3>
                        <p className="text-slate-400">Te hemos enviado un enlace mágico de acceso.</p>
                        <Button
                            variant="ghost"
                            className="mt-6 text-slate-400 hover:text-white hover:bg-slate-800"
                            onClick={() => setSent(false)}
                        >
                            Usar otro correo
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-red-500/50 focus:ring-red-500/20 h-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white h-12 font-semibold shadow-[0_0_20px_rgba(220,20,60,0.3)] transition-all"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                "Recibir Enlace de Acceso"
                            )}
                        </Button>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default Login;
