"use client";

export default function ProjectsApp() {
  function openGithub() {
    window.open(
      "https://github.com/Arshad-WD",
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="w-full h-full bg-[#0b0b0b] text-white flex items-center justify-center">
      <div className="max-w-90 px-6 text-center space-y-8">

        {/* ICON */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="currentColor"
            className="text-white/80"
          >
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.6-.3 1.5-.7.2-.8.4-1.3.7-1.6-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 .1a10.5 10.5 0 0 1 5.4 0c2.1-.4 3-.1 3-.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" />
          </svg>
        </div>

        {/* TEXT */}
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">
            GitHub Projects
          </h1>

          <p className="text-sm text-white/60 leading-relaxed">
            Source code, experiments, and systems I’ve built.
            Actively maintained and continuously evolving.
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={openGithub}
          className="
            w-full
            py-3
            rounded-xl
            bg-white text-black
            font-medium
            active:scale-[0.98]
            transition
          "
        >
          Open GitHub
        </button>

        {/* FOOTER */}
        <p className="text-xs text-white/40">
          Opens in browser
        </p>

      </div>
    </div>
  );
}
