"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function IntroPage() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">통영 드론 배송 서비스</h1>
      <div className="relative w-120 h-120 mb-4">
        <Image
          src="/images/intro.webp"
          alt="드론 배송 서비스"
          fill
          className="object-contain"
        />
      </div>
      <p className="mb-8">섬까지 빠르고 안전하게 물품을 배송해드립니다.</p>
      <div className="flex space-x-4">
        <Button
          className="text-xl font-bold"
          onClick={() => router.push("/region")}
        >
          문자 주문 하기
        </Button>
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
          className="text-xl font-bold"
        >
          전화 주문 하기
        </Button>
      </div>

      <div className="relative w-30 h-20 mt-10">
        <Image
          src="/images/amp.png"
          alt="드론 배송 서비스"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}