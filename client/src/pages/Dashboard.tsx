import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink, Lock, LogOut, FileText, Users, Play, Target, Sparkles } from "lucide-react";
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

// Icon mapping for content cards
const iconMap: Record<string, React.ReactNode> = {
    'cv': <FileText className="w-6 h-6" />,
    'quiz': <Target className="w-6 h-6" />,
    'video': <Play className="w-6 h-6" />,
    'community': <Users className="w-6 h-6" />,
    'coaching': <Sparkles className="w-6 h-6" />,
};

// Color mapping for icon backgrounds
const iconBgMap: Record<string, string> = {
    'cv': 'bg-emerald-500',
    'quiz': 'bg-amber-500',
    'video': 'bg-purple-500',
    'community': 'bg-blue-500',
    'coaching': 'bg-rose-500',
};

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
        if (!item.hasAccess) return;

        if (item.url.startsWith("http")) {
            window.open(item.url, "_blank");
        } else {
            window.location.href = item.url;
        }
    };

    const getIconForItem = (item: ContentItem) => {
        if (item.slug.includes('cv')) return 'cv';
        if (item.slug.includes('quiz')) return 'quiz';
        if (item.slug.includes('masterclass') || item.slug.includes('video')) return 'video';
        if (item.slug.includes('community') || item.slug.includes('network')) return 'community';
        if (item.slug.includes('coaching')) return 'coaching';
        return 'cv';
    };

    const getTierLabel = (tier: string) => {
        const labels: Record<string, string> = {
            'citizen': 'Ciudadano',
            'coach': 'Coaching',
            'admin': 'Admin'
        };
        return labels[tier] || tier;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a1628] text-white">
            {/* Header - Red bar like somosmaas.org */}
            <header className="bg-[#dc143c] py-4">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold tracking-wide">Capital MAAS</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm opacity-90">{session.user.email}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Salir
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Tu Arsenal para la{" "}
                            <span className="text-[#dc143c]">Conquista</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Herramientas de élite diseñadas para desbloquear tu potencial en el mercado nórdico.
                        </p>
                    </div>

                    {/* Membership Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-full px-6 py-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-300">
                                Membresía Activa · {getTierLabel(content?.userTier || 'citizen')}
                            </span>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content?.items.map((item, index) => {
                            const iconType = getIconForItem(item);
                            const isLocked = !item.hasAccess;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    onClick={() => handleContentClick(item)}
                                    className={`
                                        relative rounded-2xl border border-slate-700/50 
                                        bg-gradient-to-b from-slate-800/50 to-slate-900/50
                                        p-6 cursor-pointer group
                                        transition-all duration-300
                                        ${isLocked ? 'opacity-50' : 'hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50'}
                                    `}
                                >
                                    {/* PRONTO Badge for locked items */}
                                    {isLocked && (
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                                Pronto
                                            </span>
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center mb-4
                                        ${iconBgMap[iconType] || 'bg-slate-700'}
                                        ${isLocked ? 'opacity-50' : ''}
                                    `}>
                                        {iconMap[iconType] || <FileText className="w-6 h-6" />}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-100">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                        {item.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                        {isLocked ? (
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <Lock className="w-4 h-4" />
                                                Requiere {getTierLabel(item.requiredTier)}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:text-emerald-300">
                                                {item.url.startsWith("http") ? (
                                                    <>
                                                        Acceder
                                                        <ExternalLink className="w-4 h-4" />
                                                    </>
                                                ) : (
                                                    <>Acceder →</>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Empty state */}
                    {content?.items.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-slate-400">No hay contenido disponible.</p>
                        </div>
                    )}
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-slate-500 text-sm">
                        © 2024 Somos MAAS. Tu red exclusiva para migrantes de alta ambición.
                    </p>
                </div>
            </footer>
        </div>
    );
}
