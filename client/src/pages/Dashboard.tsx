import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, Lock, Sparkles, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase/client";

interface ContentItem {
    id: string;
    slug: string;
    title: string;
    description: string;
    type: string;
    url: string;
    icon: string;
    requiredTier: string;
    hasAccess: boolean;
}

interface ContentResponse {
    userTier: string;
    items: ContentItem[];
}

export default function Dashboard({ session }: { session: Session }) {
    const [content, setContent] = useState<ContentResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, [session]);

    const fetchContent = async () => {
        try {
            const res = await fetch(`/api/content?email=${session.user.email}`);
            const data = await res.json();
            setContent(data);
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    const handleContentClick = (item: ContentItem) => {
        if (!item.hasAccess) {
            // Show upgrade modal or redirect
            alert("Necesitas un plan superior para acceder a este contenido");
            return;
        }

        // Navigate to content URL
        if (item.url.startsWith("http")) {
            window.open(item.url, "_blank");
        } else {
            window.location.href = item.url;
        }
    };

    const getTierLabel = (tier: string) => {
        const labels: Record<string, string> = {
            'citizen': 'Plan Ciudadano',
            'coach': 'Plan Coaching',
            'admin': 'Administrador'
        };
        return labels[tier] || tier;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">SomosMaas</h1>
                            <p className="text-xs text-slate-400">{session.user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                            {getTierLabel(content?.userTier || 'citizen')}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-slate-400 hover:text-white"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Salir
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Command Center 🚀</h2>
                        <p className="text-slate-400">
                            Bienvenido a tu área privada. Aquí tienes acceso a todas tus herramientas y contenido.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content?.items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Card
                                    className={`
                                        bg-slate-900/50 border-slate-700 hover:border-slate-600 
                                        transition-all cursor-pointer group relative overflow-hidden
                                        ${!item.hasAccess ? 'opacity-60' : ''}
                                    `}
                                    onClick={() => handleContentClick(item)}
                                >
                                    {/* Lock overlay for inaccessible items */}
                                    {!item.hasAccess && (
                                        <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10">
                                            <div className="text-center">
                                                <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                                <p className="text-xs text-slate-400">Requiere {getTierLabel(item.requiredTier)}</p>
                                            </div>
                                        </div>
                                    )}

                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl">{item.icon}</span>
                                            {item.hasAccess && item.url.startsWith("http") && (
                                                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                                            )}
                                        </div>
                                        <CardTitle className="text-white text-lg mt-2">{item.title}</CardTitle>
                                        <CardDescription className="text-slate-400">
                                            {item.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-500 uppercase">{item.type}</span>
                                            {item.hasAccess ? (
                                                <span className="text-xs text-blue-400 group-hover:text-blue-300">
                                                    Acceder →
                                                </span>
                                            ) : (
                                                <span className="text-xs text-amber-400">
                                                    Upgrade
                                                </span>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty state */}
                    {content?.items.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-slate-400">No hay contenido disponible.</p>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
