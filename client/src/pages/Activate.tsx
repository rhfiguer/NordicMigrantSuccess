import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Activate() {
    const [licenseKey, setLicenseKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [, setLocation] = useLocation();
    const { toast } = useToast();

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
            const response = await fetch("/api/verify-license", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    licenseKey: licenseKey.trim(),
                    email: "user@example.com" // TODO: Get from Auth Context/Session
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast({
                    title: "¡Cuenta Activada!",
                    description: "Bienvenido a la tribu. Tu acceso está listo.",
                    className: "bg-green-600 text-white border-none",
                });

                // Small delay to show success state
                setTimeout(() => {
                    setLocation("/dashboard");
                }, 1500);
            } else {
                throw new Error(data.message || "Error al activar");
            }
        } catch (error: any) {
            toast({
                title: "Error de Activación",
                description: error.message || "La licencia no es válida o ha expirado.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
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
                    <h1 className="text-3xl font-bold text-white font-poppins">Activa tu Cuenta</h1>
                    <p className="text-slate-400 mt-2">Ingresa tu llave de acceso para desbloquear el contenido.</p>
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
                        ¿Aún no tienes membresía?{" "}
                        <a
                            href="https://rhythmix244.gumroad.com/l/lspgxy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors"
                        >
                            Obtén tu acceso aquí
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
