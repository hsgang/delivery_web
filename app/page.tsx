"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function IntroPage() {
  const router = useRouter();

  const images = [
    "/images/intro.webp",
    "/images/bokbab.png",
    "/images/tangsu.png",
    "/images/chicken.png",
  ];

  const plugin = useRef(Autoplay({ delay: 3000 }));

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">통영 드론 배송 서비스</h1>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-lg mb-6"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <Image
                src={src}
                alt={`슬라이드 ${index + 1}`}
                width= {400} // Adjust width as needed
                height={400} // Adjust height as needed
                className="object-contain rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="mb-8">섬까지 빠르고 안전하게 물품을 배송해드립니다.</p>
      <div className="flex space-x-4">
        <Button
          className="text-xl font-bold"
          onClick={() => router.push("/region")}
        >
          웹 주문 하기
        </Button>
        <Button
          onClick={() => {
            const phoneNumber = process.env.NEXT_PUBLIC_ORDER_PHONE_NUMBER;
            if(phoneNumber) {
              window.location.href = `tel:${phoneNumber}`;
            } else {
              alert("전화번호가 설정되지 않았습니다.");
            }
          }}
          className="text-xl font-bold"
        >
          전화 주문 하기
        </Button>
      </div>

      {/* <div className="relative w-30 h-20 mt-10">
        <Image
          src="/images/amp.png"
          alt="드론 배송 서비스"
          fill
          className="object-contain"
        />
      </div> */}
    </div>
  );
}