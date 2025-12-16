import { app, registerRoutes } from "../server/app";

// Initialize the app with routes
await registerRoutes(app);

// Export the app for Vercel
export default app;
