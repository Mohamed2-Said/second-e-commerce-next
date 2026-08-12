"use client";
import { CartResponse } from "@/Inerface/cart";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // 👈 استيراد جلسة نكست أث

export const Cartcontext = createContext<{
  CartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  Getcart: () => void;
}>({
  CartData: null,
  setCartData: () => {},
  isLoading: false,
  setLoading: () => {},
  Getcart: () => {},
});

export default function Cartcontextprovider({
  children,
}: {
  children: ReactNode;
}) {
  const [CartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  // بنجيب الـ data والـ status بتوع المستخدم المسجل دخول حالياً
  const { data: session, status } = useSession();

  async function Getcart() {
    // لو لسه الـ session بتتحمل، استنى
    if (status === "loading") return;

    // لو المستخدم مش مسجل دخول، وقف الـ loading ونظف البيانات
    if (!session || !(session as any).token) {
      setLoading(false);
      return;
    }

    // بنسحب التوكن المخزن جوه الـ session اللي راجعة من NextAuth
    const userToken = (session as any).token || "";

    try {
      const respons = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "get",
          headers: {
            token: userToken,
          },
        },
      );
      const data: CartResponse = await respons.json();
      setCartData(data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  }

  // أول ما الـ session تتغير أو تتوفر، نادِ على Getcart
  useEffect(() => {
    if (status !== "loading") {
      Getcart();
    }
  }, [status, session]);

  return (
    <Cartcontext.Provider
      value={{ CartData, setCartData, isLoading, setLoading, Getcart }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
