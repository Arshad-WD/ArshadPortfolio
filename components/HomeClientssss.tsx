// "use client";

// import dynamic from "next/dynamic";
// import iPhoneShell from "@/components/Design/iPhoneShell"

// const DesktopHome = dynamic(
//   () => import("@/components/desktop/home/HomePage"),
//   { ssr: false }
// );

// const MobileHome = dynamic(
//   () => import("@/components/mobile/Mobile"),
//   { ssr: false }
// );

// export default function HomeClient() {
//   return (
//     <>
//       {/* Desktop */}
//       <div className="hidden sm:block">
//         <DesktopHome />
//       </div>

//       {/* Mobile */}
//       <div className="block sm:hidden">
//         <iPhoneShell>
//           <MobileHome />
//         </iPhoneShell>
//       </div>
//     </>
//   );
// }
