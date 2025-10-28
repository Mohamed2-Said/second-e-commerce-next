import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <section className=" h-screen flex flex-col items-center justify-center text-center py-20 px-4 bg-white">
      {/* العنوان */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to <span className="text-black">ShopMart</span>
      </h1>

      {/* الوصف */}
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-8">
        Discover the latest technology, fashion, and lifestyle products. Quality
        guaranteed with fast shipping and excellent customer service.
      </p>

      {/* الأزرار */}
      <div className="flex gap-4">
        <Link href={"/products"}>
          {" "}
          <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
            Shop Now
          </button>
        </Link>
        <Link href={"/categories"}>
          {" "}
          <button className="border border-black text-black px-6 py-3 rounded-md font-medium hover:bg-black hover:text-white transition">
            Browse Categories
          </button>
        </Link>
      </div>
    </section>
  );
}
