"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import GlobalLoading from "@/components/GlabelLoading/glabelloading";

export default function SubCategoriesPage() {
  const { id } = useParams();
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSubCategories() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
        );
        const data = await res.json();
        setSubcategories(data.data || []);
      } catch (error) {
        console.error("❌ Error fetching subcategories:", error);
      } finally {
        setTimeout(() => setLoading(false), 800); // يخلي اللودر يظهر بس لحظة بسيطة
      }
    }

    if (id) getSubCategories();
  }, [id]);

  if (loading) {
    // نعرض اللودر الجلوبال أثناء تحميل الصفحة
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
        <GlobalLoading />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Subcategories
      </h1>

      {subcategories.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No subcategories available for this category.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subcategories.map((sub) => (
            <Link key={sub._id} href={`/subcategories/${sub._id}`}>
              <Card className="p-6 text-center shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer bg-white">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {sub.name}
                </h2>
                <p className="text-gray-500 text-sm">ID: {sub._id}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
