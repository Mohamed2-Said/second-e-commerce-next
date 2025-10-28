"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GlobalLoading from "../../../components/GlabelLoading/glabelloading"; // نفس اسم الملف اللي عندك
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Category = {
  _id: string;
  name: string;
  image: string;
};

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function getCategories() {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      const data = await res.json();
      setCategories(data.data);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
        <GlobalLoading />
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Categories 🛍️</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat._id}
            onClick={() => router.push(`/categories/${cat._id}`)}
            className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <CardHeader className="flex justify-center">
              <Image
                src={cat.image}
                alt={cat.name}
                width={120}
                height={120}
                className="object-contain h-28 w-28"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-center text-lg">{cat.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
