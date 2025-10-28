"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

export default function ProductsSliders({
  images,
  altcontent,
}: {
  images: string[];
  altcontent: string;
}) {
  // 👇 خلي الـ Autoplay ref يتبني على العميل
  const autoplay = useRef(Autoplay({ delay: 1000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[autoplay.current]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="col-span-1">
              <Image
                src={img}
                alt={altcontent}
                width={600}
                height={600}
                className="w-full object-cover rounded-xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
