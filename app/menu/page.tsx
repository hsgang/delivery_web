"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOrder } from "../context/OrderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbCustom from "@/components/BreadcrumbCustom";
import { Separator } from "@/components/ui/separator"

const MENU_LIST: { 
  name: string; 
  price: number; 
  image: string; // public/images 폴더에 미리 넣어두세요
}[] = [
  { name: "자장면",   price: 10000, image: "/images/zazang.png" },
  { name: "탕수육",   price: 30000, image: "/images/tangsu.png" },
  { name: "볶음밥",   price: 1000, image: "/images/bokbab.png" },
  { name: "짬뽕", price: 10000, image: "/images/zzambong.png" },
  { name: "후라이드 치킨",  price: 20000, image: "/images/chicken.png" },
  { name: "양념 치킨",  price: 20000, image: "/images/chicken.png" },
];

export default function MenuPage() {
  const router = useRouter();
  const { items, addItem, removeItem } = useOrder();

  // 장바구니에서 이 아이템의 현재 수량 찾기
  const getQty = (name: string, price: number) => {
    const found = items.find(i => i.name === name && i.price === price);
    return found ? found.qty : 0;
  };

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center">
      <BreadcrumbCustom />
      <Separator className="mb-6"/>
      <h2 className="text-2xl font-bold mb-6">메뉴 선택</h2>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {MENU_LIST.map(menu => {
          const qty = getQty(menu.name, menu.price);
          return (
            <Card key={menu.name} className="flex flex-col w-full max-w-sm">
              <div className="flex justify-center items-center">
                    <Image
                    src={menu.image}
                    alt={menu.name}
                    width={120}
                    height={80}
                    className="object-cover rounded-t-lg"
                    />
              </div>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{menu.name}</h3>
                  <p className="mt-1 text-gray-600">{menu.price.toLocaleString()}원</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem({ name: menu.name, price: menu.price })}
                      disabled={qty === 0}
                    >
                      –
                    </Button>
                    <span className="w-6 text-center">{qty}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addItem({ name: menu.name, price: menu.price, qty: 1 })}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 총액 및 다음 버튼 */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-xl font-bold mb-6">
          합계 금액: {total.toLocaleString()}원
        </div>
        
      </div>
      <Button
          disabled={items.length === 0}
          onClick={() => router.push("/confirm")}
          className="text-xl font-bold mb-6"
        >
          다음
        </Button>
    </div>
  );
}