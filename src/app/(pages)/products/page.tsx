import { ProductsI } from "@/Inerface/product";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import Addcart from "@/components/Addcart/Addcart";

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
    // { cache: "force-cache" }
  );

  const { data }: { data: ProductsI[] } = await response.json();

  return (
    <>
      <div className="flex flex-wrap">
        {data.map((data) => (
          <div key={data._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <Card className="">
              <Link href={"/products/" + data.id}>
                <Image
                  src={data.imageCover}
                  alt=""
                  width={300}
                  height={300}
                  className="w-full"
                />
                <CardHeader>
                  <CardTitle>{data.title.split(" ", 2)}</CardTitle>
                  <CardDescription className="text font-bold pt-2">
                    {data.category.name}
                  </CardDescription>
                  <CardAction>{data.brand.name}</CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    {" "}
                    <div className="flex ">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-yellow-500"
                      >
                        {" "}
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />{" "}
                      </svg>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-yellow-500"
                      >
                        {" "}
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />{" "}
                      </svg>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-yellow-500"
                      >
                        {" "}
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />{" "}
                      </svg>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-yellow-500"
                      >
                        {" "}
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />{" "}
                      </svg>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-yellow-500"
                      >
                        {" "}
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />{" "}
                      </svg>{" "}
                    </div>{" "}
                    <p>{data.ratingsAverage}</p>{" "}
                  </div>
                  <p>
                    Price:{" "}
                    <span className="text font-bold pt-2">{data.price}</span>
                  </p>
                </CardContent>
              </Link>
              <Addcart productId={data._id} />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
