"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MobileNotification } from "../home/NotificationBanner";
import { AppType } from "../types";
import { APP_ICONS } from "../home/appConfig";

interface NotificationContextType {
  notiQueue: MobileNotification[];
  notiHistory: MobileNotification[];
  currentNoti: MobileNotification | null;
  setCurrentNoti: (noti: MobileNotification | null) => void;
  triggerNotification: (app: AppType, title: string, message: string) => void;
  clearHistory: () => void;
  appBadges: Partial<Record<AppType, number>>;
  clearBadge: (app: AppType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notiQueue, setNotiQueue] = useState<MobileNotification[]>([]);
  const [currentNoti, setCurrentNoti] = useState<MobileNotification | null>(null);
  const [notiHistory, setNotiHistory] = useState<MobileNotification[]>([]);
  const [appBadges, setAppBadges] = useState<Partial<Record<AppType, number>>>({
    Youtube: 5,
    Instagram: 2,
    Linkedin: 1,
  });

  const triggerNotification = (app: AppType, title: string, message: string) => {
    const newNoti: MobileNotification = {
      id: Math.random().toString(36).substr(2, 9),
      app,
      title,
      message,
      icon: APP_ICONS[app] || "/icons/about.webp",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotiQueue(prev => [...prev, newNoti]);
    setNotiHistory(prev => [newNoti, ...prev]);
    setAppBadges(prev => ({ ...prev, [app]: (prev[app] || 0) + 1 }));
  };

  const clearHistory = () => setNotiHistory([]);
  const clearBadge = (app: AppType) => {
    setAppBadges(prev => {
      const next = { ...prev };
      delete next[app];
      return next;
    });
  };

  useEffect(() => {
    if (!currentNoti && notiQueue.length > 0) {
      const next = notiQueue[0];
      setCurrentNoti(next);
      setNotiQueue(prev => prev.slice(1));
    }
  }, [currentNoti, notiQueue]);

  return (
    <NotificationContext.Provider value={{
      notiQueue,
      notiHistory,
      currentNoti,
      setCurrentNoti,
      triggerNotification,
      clearHistory,
      appBadges,
      clearBadge
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
