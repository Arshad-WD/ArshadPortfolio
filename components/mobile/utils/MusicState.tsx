"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MusicState {
  isPlaying: boolean;
  progress: number;
  trackName: string;
  setIsPlaying: (playing: boolean) => void;
  setProgress: (progress: number) => void;
}

const MusicContext = createContext<MusicState | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45);
  const [trackName, setTrackName] = useState("Portfolio Beats");

  return (
    <MusicContext.Provider value={{ isPlaying, progress, trackName, setIsPlaying, setProgress }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within a MusicProvider");
  return context;
}
