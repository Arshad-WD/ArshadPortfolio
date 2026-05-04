"use client";

import dynamic from "next/dynamic";

const ArshadBot3D = dynamic(() => import("@/components/ArshadBot3D"), {
  ssr: false,
});

export default function BotLoader() {
  return <ArshadBot3D />;
}
