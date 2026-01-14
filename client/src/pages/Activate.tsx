
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
    const [result, setResult] = useState<{ success: boolean; message: string; needsEmail?: boolean } | null>(null);
    const { toast } = useToast();

    // If user is already logged in with active profile, redirect
    // This is handled by App.tsx ProtectedRoute

    const handleActivate = async (e: React.FormEvent) => {
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
        setResult(null);

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
            setResult({
                success: true,
                message: data.message,
                needsEmail: data.needsEmailVerification
            });

            toast({
                title: data.needsEmailVerification ? "¡Revisa tu email!" : "¡Activado!",
                description: data.message,
                className: "bg-green-600 text-white border-none",
            });

            // If no email verification needed, redirect after delay
            if (!data.needsEmailVerification) {
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }

        } catch (error: any) {
            console.error("❌ [ACTIVATE] Error:", error);
            setResult({
                success: false,
                message: error.message
            });
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // ========================================
    // SUCCESS STATE: Show appropriate message
    // ========================================
    if (result?.success) {
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
                    <h2 className="text-2xl font-bold text-white">
                        {result.needsEmail ? "¡Revisa tu Correo!" : "¡Activación Exitosa!"}
                    </h2>
                    <p className="text-slate-400">{result.message}</p>

                    {result.needsEmail ? (
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-left">
                            <p className="text-sm text-slate-300 font-medium">Próximos pasos:</p>
                            <ol className="text-sm text-slate-400 mt-2 list-decimal list-inside space-y-1">
                                <li>Abre el email que te enviamos</li>
                                <li>Haz clic en el enlace mágico</li>
                                <li>¡Accede a tu dashboard!</li>
                            </ol>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">Redirigiendo al login...</p>
                    )}

                    <Button
                        variant="ghost"
                        className="text-slate-400 hover:text-white"
                        onClick={() => setResult(null)}
                    >
                        Activar otra cuenta
                    </Button>
                </motion.div>
            </div>
        );
    }

    // ========================================
    // MAIN FORM: Email + License Key
    // ========================================
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
                        Ingresa tu email y la licencia de Gumroad
                    </p>
                </div>

                {/* Error display */}
                {result?.success === false && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-300">{result.message}</p>
                    </motion.div>
                )}

                {/* Form */}
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Activar Acceso Premium</CardTitle>
                        <CardDescription className="text-slate-400">
                            Un solo paso para desbloquear todo el contenido
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
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">License Key de Gumroad</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                    <Input
                                        placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                                        value={licenseKey}
                                        onChange={(e) => setLicenseKey(e.target.value)}
                                        className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 font-mono uppercase"
                                        required
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
