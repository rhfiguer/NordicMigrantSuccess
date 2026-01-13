
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, ChevronRight, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";

export default function Activate({ session }: { session: Session | null }) {
    const [licenseKey, setLicenseKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    // 1. Strict Login Gate
    if (!session) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-8">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-800 shadow-xl"
                    >
                        <LogIn className="w-8 h-8 text-blue-500" />
                    </motion.div>

                    <div>
                        <h1 className="text-3xl font-bold text-white font-poppins mb-2">Paso 1: Identifícate</h1>
                        <p className="text-slate-400">
                            Para activar tu licencia, primero necesitamos saber quién eres.
                            <br />
                            <span className="text-sm text-slate-500 mt-2 block">
                                Tu acceso quedará vinculado a tu cuenta para siempre.
                            </span>
                        </p>
                    </div>

                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">¿Ya tienes cuenta?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                onClick={() => setLocation("/login")}
                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                            >
                                Iniciar Sesión
                            </Button>
                            <p className="text-xs text-slate-500">
                                Si eres nuevo, el enlace de login te permitirá registrarte.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // 2. Activation Logic
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

        try {
            // Using session.user.id is CRITICAL to link the license securely
            const response = await fetch("/api/verify-license", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    licenseKey: licenseKey.trim(),
                    userId: session.user.id, // Explicit ID binding
                    email: session.user.email,
                    fullName: session.user.user_metadata?.full_name
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error desconocido al activar.");
            }

            if (data.success) {
                toast({
                    title: "¡Membresía Activada! 🚀",
                    description: "Tu cuenta ha sido actualizada. Redirigiendo...",
                    className: "bg-green-600 text-white border-none",
                });

                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            }
        } catch (error: any) {
            console.error("Activation failed:", error);
            toast({
                title: "Error de Activación",
                description: error.message || "La licencia no es válida.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 shadow-lg shadow-blue-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white font-poppins">Paso 2: Activa tu Acceso</h1>
                    <p className="text-slate-400 mt-2">
                        Vinculando licencia a: <span className="text-blue-400 font-mono">{session.user.email}</span>
                    </p>
                </div>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-white text-lg">Licencia Gumroad</CardTitle>
                        <CardDescription className="text-slate-400">
                            Pega la clave que recibiste en tu correo de compra.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleActivate} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                                    value={licenseKey}
                                    onChange={(e) => setLicenseKey(e.target.value)}
                                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 font-mono text-center tracking-widest uppercase"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-6 shadow-lg shadow-blue-600/20 transition-all duration-300 transform hover:scale-[1.02]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Verificando...
                                    </>
                                ) : (
                                    <>
                                        Activar Acceso <ChevronRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center mt-8">
                    <p className="text-slate-500 text-sm">
                        ¿Cuenta equivocada?{" "}
                        <button
                            onClick={() => {
                                window.location.href = "/login";
                            }}
                            className="text-red-400 hover:text-red-300 font-medium hover:underline transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
