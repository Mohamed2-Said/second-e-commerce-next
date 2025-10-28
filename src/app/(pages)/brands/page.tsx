"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Brand = {
  _id: string;
  name: string;
  image: string;
  slug: string;
};

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
      const data = await res.json();
      setBrands(data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching brands:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="animate-spin w-10 h-10 text-green-600" />
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Our Brands 🏷️</h1>

      {brands.length === 0 ? (
        <p className="text-center text-gray-500">No brands found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <Card
              key={brand._id}
              className="hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <CardHeader className="flex justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={100}
                  height={100}
                  className="object-contain h-24 w-24"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-center text-lg">
                  {brand.name}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
