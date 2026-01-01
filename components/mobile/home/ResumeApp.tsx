"use client";

export default function ResumeApp() {
  return (
    <div className="relative w-full h-full bg-black">
      {/* TOP BAR */}
      <div
        className="
          absolute top-0 left-0 w-full h-16
          flex items-center justify-end
          px-4
          bg-black/40 backdrop-blur-md
          z-10
        "
      >
        <a
          href="/resume/ARSHADCHAUDHARY-2025.pdf"
          download
          className="
            text-xs text-white/90
            px-3 py-1.5
            rounded-full
            bg-white/10
            hover:bg-white/20
            transition
          "
        >
          Download
        </a>
      </div>

      {/* PDF VIEWER */}
      <iframe
        src="/resume/ARSHADCHAUDHARY-2025.pdf#toolbar=0&navpanes=0&scrollbar=0&zoom=page-width"
        title="Resume"
        className="w-full h-full border-none pt-16"
      />
    </div>
  );
}
