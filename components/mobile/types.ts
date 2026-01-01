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
  | "Photos";

export interface AppLaunchPayload {
  app: AppType;
}
