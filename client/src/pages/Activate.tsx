
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, ChevronRight, Mail, Key, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";

export default function Activate({ session }: { session: Session | null }) {
    const [email, setEmail] = useState("");
    const [licenseKey, setLicenseKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    // Handle license activation
    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!licenseKey.trim()) {
            toast({
                title: "Campo requerido",
                description: "Por favor ingresa tu clave de licencia.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        console.log("🔥 [ACTIVATE] Activating license for:", session?.user?.email);

        try {
            const response = await fetch("/api/verify-license", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    licenseKey: licenseKey.trim(),
                    userId: session!.user.id,
                    email: session!.user.email,
                    fullName: session!.user.user_metadata?.full_name
                }),
            });

            console.log("📥 [ACTIVATE] Response status:", response.status);
            const data = await response.json();
            console.log("📥 [ACTIVATE] Response data:", data);

            if (!response.ok) {
                throw new Error(data.message || "Error al activar.");
            }

            if (data.success) {
                toast({
                    title: "¡Membresía Activada! 🚀",
                    description: "Redirigiendo a tu dashboard...",
                    className: "bg-green-600 text-white border-none",
                });

                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1500);
            }
        } catch (error: any) {
            console.error("❌ [ACTIVATE] Error:", error);
            toast({
                title: "Error de Activación",
                description: error.message || "La licencia no es válida.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle registration (send magic link)
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !licenseKey.trim()) {
            toast({
                title: "Campos requeridos",
                description: "Por favor ingresa tu email y tu clave de licencia.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            // Send magic link
            const { error } = await supabase.auth.signInWithOtp({
                email: email.trim(),
                options: {
                    emailRedirectTo: window.location.origin + '/activate',
                },
            });

            if (error) throw error;

            setEmailSent(true);
            toast({
                title: "¡Enlace enviado!",
                description: "Revisa tu correo. Después ingresa tu license key aquí.",
                duration: 8000,
            });

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "No se pudo enviar el enlace.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // ========================================
    // CASE 1: User has session - Show License Key form
    // ========================================
    if (session) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md z-10"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg shadow-blue-500/20">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white font-poppins">Activa tu Acceso</h1>
                        <p className="text-slate-400 mt-2">
                            Sesión: <span className="text-blue-400 font-mono">{session.user.email}</span>
                        </p>
                    </div>

                    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">Ingresa tu Licencia Gumroad</CardTitle>
                            <CardDescription className="text-slate-400">
                                Pega la clave que recibiste en tu correo de compra.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleActivate} className="space-y-4">
                                <div className="relative">
                                    <Key className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                    <Input
                                        placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                                        value={licenseKey}
                                        onChange={(e) => setLicenseKey(e.target.value)}
                                        className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 font-mono uppercase"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-6"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Verificando...
                                        </>
                                    ) : (
                                        <>
                                            Activar Membresía <ChevronRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // ========================================
    // CASE 2: Email sent - Wait for confirmation
    // ========================================
    if (emailSent) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full text-center space-y-6"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">¡Revisa tu Correo!</h2>
                    <p className="text-slate-400">
                        Te hemos enviado un enlace mágico a <span className="text-blue-400">{email}</span>
                    </p>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-left">
                        <p className="text-sm text-slate-300">
                            <strong>Después de hacer clic en el enlace:</strong>
                        </p>
                        <ol className="text-sm text-slate-400 mt-2 list-decimal list-inside space-y-1">
                            <li>Se abrirá la página de activación</li>
                            <li>Ingresa tu license key de Gumroad</li>
                            <li>¡Listo! Acceso activado</li>
                        </ol>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-slate-400 hover:text-white"
                        onClick={() => setEmailSent(false)}
                    >
                        Usar otro correo
                    </Button>
                </motion.div>
            </div>
        );
    }

    // ========================================
    // CASE 3: No session - Registration form
    // ========================================
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg shadow-blue-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white font-poppins">Activa tu Membresía</h1>
                    <p className="text-slate-400 mt-2">
                        Paso 1: Verifica tu email para crear tu cuenta
                    </p>
                </div>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Crea tu Cuenta</CardTitle>
                        <CardDescription className="text-slate-400">
                            Te enviaremos un enlace mágico para verificar tu email.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Key className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                <Input
                                    placeholder="License Key de Gumroad"
                                    value={licenseKey}
                                    onChange={(e) => setLicenseKey(e.target.value)}
                                    className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 font-mono uppercase"
                                    required
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    Lo usarás después de verificar tu email
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-6"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        Enviar Enlace de Verificación <ChevronRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center mt-8">
                    <p className="text-slate-500 text-sm">
                        ¿Aún no tienes licencia?{" "}
                        <a
                            href="https://rhythmix244.gumroad.com/l/lspgxy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-medium hover:underline"
                        >
                            Obtén tu acceso aquí
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
