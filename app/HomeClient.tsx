"use client";

import dynamic from "next/dynamic";
import IPhoneShell from "@/components/mobile/Design/IPhoneShell"

const DesktopHome = dynamic(
  () => import("@/components/desktop/home/HomePage"),
  { ssr: false }
);

const Mobile = dynamic(
  () => import("@/components/mobile/Mobile"),
  { ssr: false }
);

export default function HomeClient() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block">
        <DesktopHome />
      </div>

      {/* Mobile */}
      <div className="block sm:hidden">
        <IPhoneShell>
          <Mobile />
        </IPhoneShell>
      </div>
    </>
  );
}


// "use client";

// import IPhoneShell from "@/components/mobile/Design/IPhoneShell";
// import Mobile from "@/components/mobile/Mobile";

// export default function HomeClient() {
//   return (
//     <IPhoneShell>
//       <Mobile />
//     </IPhoneShell>
//   );
// }
