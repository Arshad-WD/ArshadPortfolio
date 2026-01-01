"use client";

import { memo } from "react";

const Wallpaper = memo(function Wallpaper() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/wallpaper.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/30" />
    </>
  );
});

export default Wallpaper;
