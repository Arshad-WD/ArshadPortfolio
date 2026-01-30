"use client";

export default function AboutApp() {
  return (
    <div className="w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white overflow-y-auto px-4 pb-12">
      {/* HEADER */}
      <div className="pt-16 pb-8 px-2">
        <h1 className="text-3xl font-extrabold tracking-tight">About</h1>
      </div>

      {/* APPLE ID STYLE PROFILE */}
      <section className="bg-white dark:bg-[#1c1c1e] rounded-[10px] p-4 flex items-center gap-4 mb-8 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center text-3xl font-black text-white">
          A
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-medium tracking-tight">Arshad Chaudhary</h2>
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">Full-Stack Engineer & Designer</p>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </section>

      {/* CORE INFO GROUP */}
      <div className="mb-8 overflow-hidden rounded-[10px] bg-white dark:bg-[#1c1c1e] divide-y dark:divide-zinc-800 shadow-sm border dark:border-zinc-800">
        <div className="p-4 flex justify-between items-center group active:bg-zinc-100 dark:active:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold font-serif">i</span>
            </div>
            <span className="text-[17px]">Bio</span>
          </div>
          <span className="text-zinc-400 dark:text-zinc-500 text-[15px] max-w-[150px] truncate text-right">Building the future</span>
        </div>
        <div className="p-4 flex justify-between items-center group active:bg-zinc-100 dark:active:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
             <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                   <circle cx="12" cy="7" r="4" />
                </svg>
             </div>
             <span className="text-[17px]">Role</span>
          </div>
          <span className="text-zinc-400 dark:text-zinc-500 text-[15px]">Full-Stack Enthusiast</span>
        </div>
      </div>

      {/* EXPERTISE GROUP */}
      <h3 className="px-4 mb-2 text-[13px] font-medium text-zinc-500 text-left uppercase tracking-tight opacity-60">Expertise</h3>
      <div className="mb-8 overflow-hidden rounded-[10px] bg-white dark:bg-[#1c1c1e] divide-y dark:divide-zinc-800 shadow-sm border dark:border-zinc-800">
        {[
          { icon: "⚡", label: "Frontend", color: "bg-cyan-500", text: "React / Next.js" },
          { icon: "🛠️", label: "Backend", color: "bg-green-600", text: "Node / Django" },
          { icon: "🐚", label: "Animations", color: "bg-purple-500", text: "GSAP / Three.js" }
        ].map((item, id) => (
          <div key={id} className="p-4 flex justify-between items-center group active:bg-zinc-100 dark:active:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
               <div className={`w-7 h-7 ${item.color} rounded-md flex items-center justify-center text-xs`}>
                  {item.icon}
               </div>
               <span className="text-[17px]">{item.label}</span>
            </div>
            <span className="text-zinc-400 dark:text-zinc-500 text-[15px]">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 brightness-50 contrast-125">
        <p className="text-[10px] font-mono tracking-widest text-zinc-400">DESIGNED BY ARSHAD • VERSION 2.0.4</p>
      </div>
    </div>
  );
}
