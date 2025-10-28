"use client";

import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { HeartIcon, Loader2, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Cartcontext } from "../context/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Addcart({ productId }: { productId: string }) {
  const { Getcart } = useContext(Cartcontext);
  const [isloading, setisloading] = useState(false);

  const { status } = useSession(); 
  const router = useRouter(); 

  async function Add() {
    
    if (status !== "authenticated") {
      toast.error("You must log in first!");
      router.push("/login"); 
      return;
    }

    try {
      setisloading(true);

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "POST",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzljODQ4MDM3YjQ5Nzk0NjlhNzdiNyIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MDU0NDczLCJleHAiOjE3NjU4MzA0NzN9.2ILR_jN6bn3tIrwrIS7IEcjs5Yd44G8MPksDrz6Oqas",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      const data = await response.json();
      setisloading(false);
      await Getcart();

      if (data.status === "success") {
        toast.success(data.message);
      } else {
        toast.error("Failed to add product.");
      }

      console.log("✅ Added to cart:", data);
    } catch (err) {
      setisloading(false);
      console.error("❌ Error:", err);
      toast.error("Something went wrong!");
    }
  }

  return (
    <CardFooter className="flex items-center gap-1">
      <Button
        disabled={isloading}
        onClick={Add}
        className="flex-grow px-8 cursor-pointer"
      >
        {isloading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <ShoppingCartIcon />
        )}
        {"  "}Add To Cart
      </Button>
      <HeartIcon className="ms-auto cursor-pointer" />
    </CardFooter>
  );
}
