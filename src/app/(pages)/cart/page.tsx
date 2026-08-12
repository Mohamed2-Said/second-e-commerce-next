"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatcurrint } from "@/Helpers/Formatprice";
import { Cartcontext } from "@/components/context/context";
import Loading from "@/app/loading";
import { CartResponse } from "@/Inerface/cart";
import toast from "react-hot-toast";
import { Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Checkoutmohamed from "@/components/Checkout/Checkout";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { CartData, isLoading, setCartData } = useContext(Cartcontext);
  const [removeId, setremoveId] = useState<string | null>(null);
  const [updateId, setupdateId] = useState<string | null>(null);
  const [clearLoading, setClearLoading] = useState(false);

  const { data: session } = useSession(); // 👈 جبنا الجلسة عشان نسحب منها التوكن الديناميكي

  // دالة مساعدة لجلب التوكن بمرونة
  const getToken = () => {
    return (session as any)?.token || (session?.user as any)?.token || "";
  };

  // 🧩 حذف منتج
  async function RemoveCartItem(ProductId: string) {
    setremoveId(ProductId);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + ProductId,
        {
          method: "DELETE",
          headers: {
            token: getToken(), // 👈 استخدام التوكن الديناميكي
          },
        }
      );
      const data: CartResponse = await response.json();

      if (data.status === "success") {
        toast.success("Product removed successfully");
        setCartData(data);
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      toast.error("Failed to remove product");
    }
    setremoveId(null);
  }

  // 🔄 تحديث عدد المنتج
  async function UpdateCartItem(ProductId: string, count: number) {
    if (count === 0) {
      return RemoveCartItem(ProductId);
    }

    setupdateId(ProductId);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + ProductId,
        {
          method: "PUT",
          headers: {
            token: getToken(), // 👈 استخدام التوكن الديناميكي
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ count }),
        }
      );
      const data: CartResponse = await response.json();

      if (data.status === "success") {
        toast.success("Product updated successfully");
        setCartData(data);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
    setupdateId(null);
  }

  // 🧹 حذف كل المنتجات (Clear Cart)
  async function ClearCart() {
    setClearLoading(true);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "DELETE",
          headers: {
            token: getToken(), // 👈 استخدام التوكن الديناميكي
          },
        }
      );
      const data = await response.json();

      if (data.message === "success") {
        toast.success("All products cleared successfully");
        setCartData({
          numOfCartItems: 0,
          data: { products: [], totalCartPrice: 0 },
        } as any);
      } else {
        toast.error("Failed to clear cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setClearLoading(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!CartData || !CartData.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500 text-lg mb-4">
          Your cart is empty or failed to load 🛒
        </div>
        <Link href={"/products"}>
          <button className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ====== المنتجات ====== */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 space-y-6"
        >
          <h1 className="text-3xl font-extrabold text-gray-900">
            Shopping Cart
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            {CartData.data.products?.length || 0} item(s) in your cart
          </p>

          {CartData.data.products.length === 0 ? (
            <div className="text-center text-gray-400 text-lg py-12 bg-white rounded-2xl shadow-sm">
              Your cart is empty 🛒
            </div>
          ) : (
            CartData.data.products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg transition"
              >
                <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={product.product.imageCover}
                    alt={product.product.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.product.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {product.product.brand?.name}
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          UpdateCartItem(product.product._id, product.count - 1)
                        }
                        className="w-10 h-10 grid place-items-center text-lg hover:bg-gray-100 transition rounded-l-lg"
                      >
                        –
                      </button>
                      <div className="w-12 text-center font-semibold">
                        {updateId === product.product._id ? (
                          <Loader2 className="animate-spin mx-auto w-4 h-4" />
                        ) : (
                          product.count
                        )}
                      </div>
                      <button
                        onClick={() =>
                          UpdateCartItem(product.product._id, product.count + 1)
                        }
                        className="w-10 h-10 grid place-items-center text-lg hover:bg-gray-100 transition rounded-r-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      disabled={removeId === product.product._id}
                      onClick={() => RemoveCartItem(product.product._id)}
                      className="text-sm text-rose-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      {removeId === product.product._id && (
                        <Loader2 className="animate-spin w-4 h-4" />
                      )}
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right sm:self-start sm:mt-2">
                  <div className="text-gray-900 font-bold text-lg">
                    {formatcurrint(product.price)}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* ====== الملخص ====== */}
        <motion.aside
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-md p-6 sticky top-24 self-start h-fit"
        >
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm text-gray-500 py-2">
            <div>Subtotal ({CartData.data.products.length} item)</div>
            <div className="font-medium">
              {formatcurrint(CartData.data.totalCartPrice || 0)}
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-400 py-2 border-t border-b my-4">
            <div>Shipping</div>
            <div className="text-teal-500 font-medium">Free</div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-lg font-bold">
              {formatcurrint(CartData.data.totalCartPrice || 0)}
            </div>
          </div>
          
          <Checkoutmohamed cartId={CartData?.cartId} />

          <Link href={"/products"}>
            <button className="w-full py-3 mt-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition">
              Continue Shopping
            </button>
          </Link>

          {/* 🧹 زرار حذف الكل */}
          <button
            onClick={ClearCart}
            disabled={clearLoading}
            className="w-full py-3 mt-3 flex items-center justify-center gap-2 rounded-xl border border-rose-500 text-rose-600 font-medium hover:bg-rose-50 transition"
          >
            {clearLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            Clear Cart
          </button>
        </motion.aside>
      </div>
    </div>
  );
}