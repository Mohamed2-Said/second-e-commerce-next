import { ProductsI } from "@/Inerface/product";
import { Params } from "next/dist/server/request/params";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import ProductsSliders from "@/components/Slidercomp/ProductsSliders";
import Addcart from "@/components/Addcart/Addcart";
export default async function ProductsDetails({ params }: { params: Params }) {
  let { id } = await params;
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + id
  );

  const { data }: { data: ProductsI } = await response.json();
  console.log(data);

  return (
    <>
      <Card className="grid md:grid-cols-3 items-center">
        <ProductsSliders images={data.images} altcontent={data.title} />
        <div className="md:col-span-2 space-y-4 p-4">
          <CardHeader>
            <CardDescription>{data.brand.name}</CardDescription>

            <CardTitle className="text-2xl">{data.title}</CardTitle>

            {/* <CardAction>Card Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <CardDescription>{data.category.name}</CardDescription>

            <div className="flex items-center justify-between mt-3">
              <p className="flex gap-1 ">
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
                <span>{data.ratingsAverage}</span>
              </p>
              <p className="">
                <span> Raiminig {data.ratingsQuantity}</span>
              </p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="">
                <span> Quantity: {data.quantity}</span>
              </p>
              <p className="flex gap-1 items-center ">
                EGP <span className="text-2xl font-semibold">{data.price}</span>
              </p>
            </div>
          </CardContent>
          <Addcart productId={data._id} />
        </div>
      </Card>
    </>
  );
}
