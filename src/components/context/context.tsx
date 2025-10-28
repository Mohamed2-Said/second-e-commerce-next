"use client";
import { CartResponse } from "@/Inerface/cart";
import { createContext, ReactNode, useEffect, useState } from "react";

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

  async function Getcart() {
    const respons = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "get",
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljODQ4MDM3YjQ5Nzk0NjlhNzdiNyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MDU0NDczLCJleHAiOjE3NjU4MzA0NzN9.2ILR_jN6bn3tIrwrIS7IEcjs5Yd44G8MPksDrz6Oqas",
      },
    });
    const data: CartResponse = await respons.json();
    setCartData(data);
    setLoading(false);
    console.log(data);
  }
  useEffect(() => {
    Getcart();
  }, []);

  return (
    <Cartcontext.Provider
      value={{ CartData, setCartData, isLoading, setLoading, Getcart }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
