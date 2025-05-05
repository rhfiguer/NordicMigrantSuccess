import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import Google Fonts
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap";
document.head.appendChild(link);

// Add a title to the page
const title = document.createElement("title");
title.textContent = "Despliega tu Capital Migrante | Taller Virtual";
document.head.appendChild(title);

// Font Awesome
const fontAwesome = document.createElement("link");
fontAwesome.rel = "stylesheet";
fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(fontAwesome);

createRoot(document.getElementById("root")!).render(<App />);
