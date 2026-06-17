"use client";

import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PopoverFooter,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share2, Copy, Check, MessageSquare } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function SharePortfolio() {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("https://arshad-portfolio.vercel.app");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const timer = setTimeout(() => {
        setShareUrl(origin);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Portfolio link copied!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      action: handleCopy,
      color: 'text-zinc-400',
    },
    {
      name: 'Share on LinkedIn',
      icon: LinkedinIcon,
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
      },
      color: 'text-blue-500',
    },
    {
      name: 'Share on WhatsApp',
      icon: MessageSquare,
      action: () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent("Check out Arshad's high-end developer portfolio! " + shareUrl)}`, '_blank');
      },
      color: 'text-green-500',
    },
  ];

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 bg-zinc-950/90 border-zinc-800 text-white rounded-2xl p-0 overflow-hidden shadow-2xl backdrop-blur-xl">
          <PopoverHeader className="border-zinc-850 px-4 py-3">
            <PopoverTitle className="text-sm font-bold tracking-tight">Share Portfolio</PopoverTitle>
            <PopoverDescription className="text-zinc-500 text-xs mt-0.5">
              Choose how you want to share this page
            </PopoverDescription>
          </PopoverHeader>
          <PopoverBody className="space-y-1.5 p-3">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant="ghost"
                className="w-full justify-start text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl transition-all h-9 text-xs"
                onClick={option.action}
              >
                <option.icon className={`mr-2.5 h-4 w-4 ${option.color}`} />
                {option.name}
              </Button>
            ))}
          </PopoverBody>
          <PopoverFooter className="p-3 border-zinc-850 bg-black/40">
            <Label htmlFor="share-url" className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">Share URL</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="text-xs bg-zinc-900 border-zinc-800 text-zinc-300 rounded-lg focus-visible:ring-zinc-700 h-8"
              />
              <Button size="icon" variant="outline" className="h-8 w-8 border-zinc-800 hover:bg-white/5 text-zinc-400 hover:text-white rounded-lg shrink-0" onClick={handleCopy}>
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      {/* Dynamic Toast Container to guarantee notification pops on local clicks */}
      <ToastContainer theme="dark" limit={1} />
    </>
  );
}
