"use client";

import React, { useContext, useState, useEffect } from "react";
import { CardFooter } from "../ui/card";
import { Heart, Loader2, ShoppingCartIcon } from "lucide-react"; // 👈 استخدمنا Heart بدل HeartIcon عشان تدعم التلوين
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Cartcontext } from "../context/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Addcart({ productId }: { productId: string }) {
  const { Getcart } = useContext(Cartcontext);
  const [isloading, setisloading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // 👈 الحالة الخاصة بتغيير لون القلب

  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔍 فحص هل المنتج موجود في الـ Wishlist مسبقاً أول ما الصفحة تفتح
  useEffect(() => {
    async function checkWishlist() {
      const userToken =
        (session as any)?.token || (session?.user as any)?.token || "";
      if (!userToken) return;

      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            headers: { token: userToken },
          },
        );
        const data = await res.json();

        if (data.status === "success") {
          // بنبحث هل الProductId ده موجود جوه لستة المفضلة ولا لا
          const isInWishlist = data.data.some(
            (item: any) => item._id === productId,
          );
          setIsFavorite(isInWishlist);
        }
      } catch (err) {
        console.error("Error checking wishlist", err);
      }
    }

    if (status === "authenticated") {
      checkWishlist();
    }
  }, [session, productId, status]);

  // 🛒 دالة الإضافة للسلة
  async function Add() {
    if (status !== "authenticated") {
      toast.error("You must log in first!");
      router.push("/login");
      return;
    }

    const userToken =
      (session as any)?.token || (session?.user as any)?.token || "";

    try {
      setisloading(true);

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "POST",
          headers: {
            token: userToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        },
      );

      const data = await response.json();
      setisloading(false);
      await Getcart();

      if (data.status === "success") {
        toast.success(data.message || "Product added successfully");
      } else {
        toast.error(data.message || "Failed to add product.");
      }
    } catch (err) {
      setisloading(false);
      console.error("❌ Error:", err);
      toast.error("Something went wrong!");
    }
  }

  // ❤️ دالة الإضافة للمفضلة (Wishlist)
  async function addToWishlist() {
    if (status !== "authenticated") {
      toast.error("You must log in first!");
      router.push("/login");
      return;
    }

    const userToken =
      (session as any)?.token || (session?.user as any)?.token || "";

    try {
      setWishLoading(true);
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: "POST",
          headers: {
            token: userToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        },
      );

      const data = await response.json();
      setWishLoading(false);

      if (data.status === "success") {
        setIsFavorite(true); // 👈 تحويل القلب للون الأحمر الممتلئ
        toast.success(data.message || "Product added to wishlist successfully");
      } else {
        toast.error(data.message || "Failed to add to wishlist");
      }
    } catch (err) {
      setWishLoading(false);
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

      {/* ❤️ زرار القلب مع تفاعل اللون والـ Loading */}
      {wishLoading ? (
        <Loader2 className="ms-auto animate-spin w-5 h-5 text-gray-500" />
      ) : (
        <Heart
          onClick={addToWishlist}
          className={`ms-auto cursor-pointer transition-colors w-6 h-6 ${
            isFavorite
              ? "fill-red-600 text-red-600"
              : "text-gray-500 hover:text-red-500"
          }`}
        />
      )}
    </CardFooter>
  );
}
