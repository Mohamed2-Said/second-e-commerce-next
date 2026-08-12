"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { formatcurrint } from "@/Helpers/Formatprice";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  async function getWishlist() {
    const userToken =
      (session as any)?.token || (session?.user as any)?.token || "";

    if (!userToken) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token: userToken },
        },
      );
      const data = await res.json();
      if (data.status === "success") {
        setWishlist(data.data);
      }
    } catch (err) {
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromWishlist(productId: string) {
    const userToken =
      (session as any)?.token || (session?.user as any)?.token || "";
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: { token: userToken },
        },
      );
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Removed from wishlist");
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
      }
    } catch (err) {
      toast.error("Failed to remove item");
    }
  }

  useEffect(() => {
    if (session) {
      getWishlist();
    }
  }, [session]);

  return (
    <div className="min-h-screen p-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">My Wishlist ❤️</h1>

      {isLoading ? (
        // 👈 شكل التحميل السريع (Skeleton)
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-80 w-full bg-gray-100 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center text-gray-500 py-20 text-xl">
          Your wishlist is empty!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-2xl shadow-sm hover:shadow-md transition bg-white flex flex-col"
            >
              <div className="relative h-60 w-full mb-4">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg truncate">
                {product.title}
              </h3>
              <p className="text-teal-600 font-bold mt-2">
                {formatcurrint(product.price)}
              </p>

              <Button
                onClick={() => removeFromWishlist(product._id)}
                variant="destructive"
                className="mt-4 w-full rounded-xl"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
