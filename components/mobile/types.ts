export type AppType =
  | "About"
  | "Projects"
  | "Resume"
  | "Instagram"
  | "Youtube"
  | "Linkedin"
  | "X"
  | "Contact"
  | "Google"
  | "Camera"
  | "Photos"
  | "Settings"
  | "Safari"
  | "Mail"
  | "Music"
  | "Notes"
  | "Maps"
  | "AppStore";

export interface AppLaunchPayload {
  app: AppType;
}
