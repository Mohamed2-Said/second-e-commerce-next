"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import GlobalLoading from "./glabelloading";

export default function RouteLoader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // أول ما يتغير المسار نبدأ تحميل
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // سيبه ثانية أو على حسب سرعة الداتا

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
        <GlobalLoading />
      </div>
    );
  }

  return children;
}
