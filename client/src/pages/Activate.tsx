
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, ChevronRight, Mail, Key, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";

export default function Activate({ session }: { session: Session | null }) {
    const [email, setEmail] = useState("");
    const [licenseKey, setLicenseKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

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
            console.log("🚀 [ACTIVATE] Calling /api/activate...");

            const response = await fetch("/api/activate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    licenseKey: licenseKey.trim()
                }),
            });

            const data = await response.json();
            console.log("📥 [ACTIVATE] Response:", data);

            if (!response.ok) {
                throw new Error(data.message || "Error al activar");
            }

            // Success!
            toast({
                title: "¡Membresía Activada! 🚀",
                description: "Accediendo a tu dashboard...",
                className: "bg-green-600 text-white border-none",
            });

            // If we got a login URL, redirect there for instant login
            if (data.loginUrl) {
                console.log("🔗 [ACTIVATE] Redirecting to login URL...");
                window.location.href = data.loginUrl;
            } else if (data.redirectTo) {
                // Fallback to regular redirect
                setTimeout(() => {
                    window.location.href = data.redirectTo;
                }, 1000);
            }

        } catch (err: any) {
            console.error("❌ [ACTIVATE] Error:", err);
            setError(err.message);
            toast({
                title: "Error",
                description: err.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // If user already has session, redirect to dashboard
    if (session) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-6"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">¡Ya tienes sesión activa!</h2>
                    <p className="text-slate-400">Sesión: {session.user.email}</p>
                    <Button
                        onClick={() => window.location.href = "/dashboard"}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Ir al Dashboard
                    </Button>
                </motion.div>
            </div>
        );
    }

    // Main activation form
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg shadow-blue-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white font-poppins">Activa tu Membresía</h1>
                    <p className="text-slate-400 mt-2">
                        Un paso. Acceso inmediato.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-300">{error}</p>
                    </motion.div>
                )}

                {/* Form */}
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Acceso Premium</CardTitle>
                        <CardDescription className="text-slate-400">
                            Ingresa tu email y la licencia de Gumroad
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleActivate} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                    <Input
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">License Key</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                    <Input
                                        placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                                        value={licenseKey}
                                        onChange={(e) => setLicenseKey(e.target.value)}
                                        className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 font-mono uppercase"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-6 mt-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Activando...
                                    </>
                                ) : (
                                    <>
                                        Activar y Entrar <ChevronRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8 space-y-4">
                    <p className="text-slate-500 text-sm">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
                            Inicia sesión
                        </a>
                    </p>
                    <p className="text-slate-600 text-xs">
                        ¿No tienes licencia?{" "}
                        <a
                            href="https://rhythmix244.gumroad.com/l/lspgxy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-slate-400 hover:underline"
                        >
                            Obtén acceso aquí
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
