import { AppType } from "../types";

export interface AppConfig {
  app: AppType;
  label: string;
  icon: string;
  dock?: boolean;
}

export const APPS: AppConfig[] = [
  { app: "Instagram", label: "Instagram", icon: "📸" },
  { app: "Youtube", label: "YouTube", icon: "▶️" },
  { app: "Projects", label: "Projects", icon: "🧩" },
  { app: "About", label: "About", icon: "👤" },
  { app: "Resume", label: "Resume", icon: "📄" },
  { app: "X", label: "X", icon: "✖️" },
  { app: "Linkedin", label: "LinkedIn", icon: "💼" },

  // DOCK
  { app: "Contact", label: "Phone", icon: "📞", dock: true },
  // { app: "safari", label: "Safari", icon: "🌐", dock: true },
  { app: "Camera", label: "Camera", icon: "📷", dock: true },
  { app: "Photos", label: "Photos", icon: "🖼️", dock: true },
];
