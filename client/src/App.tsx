import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import Cancel from "@/pages/Cancel";
import Success from "@/pages/Success";
import SuccessStripe from "@/pages/SuccessStripe";
import NotFound from "@/pages/not-found";
import Login from "@/components/Login";
import Activate from "@/pages/Activate";

// Protected Route Component
const ProtectedRoute = ({ component: Component, session }: { component: React.ComponentType, session: Session | null }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasLicense, setHasLicense] = useState(false);

  useEffect(() => {
    const checkLicense = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/profile?email=${session.user.email}`);
        const profile = await res.json();

        if (profile && profile.subscriptionStatus === 'active') {
          setHasLicense(true);
        }
      } catch (error) {
        console.error("License check failed:", error);
      } finally {
        setIsChecking(false);
      }
    };

    if (session) {
      checkLicense();
    } else {
      setIsChecking(false);
    }
  }, [session]);

  if (!session) {
    return <Login />;
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!hasLicense) {
    // Redirect to activation if no active license found
    return <Redirect to="/activate" />;
  }

  return <Component />;
};

// Dummy Dashboard (Placeholder)
const Dashboard = () => (
  <div className="min-h-screen bg-slate-950 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Command Center 🚀</h1>
      <p className="text-slate-400">Bienvenido a tu área privada de Nordic Migrant Success.</p>
      <div className="mt-8 p-6 bg-slate-900 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold mb-2">Estado de Membresía</h2>
        <p className="text-green-400">Activa - Plan Ambición</p>
      </div>
    </div>
  </div>
);

function Router({ session }: { session: Session | null }) {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/login">
        {session ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route path="/privacy" component={Privacy} />

      <Route path="/activate">
        <Activate session={session} />
      </Route>

      {/* Payment Callbacks */}
      <Route path="/success_stripe" component={SuccessStripe} />
      <Route path="/success" component={Success} />
      <Route path="/cancel" component={Cancel} />

      {/* Protected Routes */}
      <Route path="/dashboard">
        {/* TODO: Add License Guard here */}
        <ProtectedRoute component={Dashboard} session={session} />
      </Route>

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router session={session} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;