"use client";

import { useRouter } from "next/navigation";
import { useOrder } from "../context/OrderContext";
import { Button} from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbCustom from "@/components/BreadcrumbCustom";
import { Separator } from "@/components/ui/separator"


export default function RegionPage() {
  const router = useRouter();
  const { region, setRegion } = useOrder();
  const regionGroups: { label: string; items: string[] }[] = [
    { label: "한산권역", items: ["한산1", "한산2", "한산3",] },
    { label: "욕지권역", items: ["욕지1", "욕지2", "욕지3"] },
    { label: "산양권역", items: ["산양1", "산양2", "산양3"] },
  ];

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col items-center">
          <BreadcrumbCustom />
          <Separator className="mb-6"/>
          <h2 className="text-2xl font-bold mb-6">배송 지역 선택</h2>

          <Card className="w-full max-w-lg mb-6">
            <CardContent>
                <p className="items-center mb-4">
                    <span>배송 받는 지역을 선택하세요.</span>
                </p>
                <Select
                    value={region}
                    onValueChange={(val) => setRegion(val)}
                >
                    <SelectTrigger>
                    <SelectValue placeholder="권역별 섬 선택" />
                    </SelectTrigger>
                    <SelectContent>
                    {regionGroups.map((group) => (
                        <SelectGroup key={group.label}>
                        <SelectLabel>{group.label}</SelectLabel>
                        {group.items.map((island) => (
                            <SelectItem key={island} value={island}>
                            {island}
                            </SelectItem>
                        ))}
                        </SelectGroup>
                    ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
        <Button 
            disabled={!region}
            onClick={() => router.push("/menu")}
            className="text-xl font-bold"
        >
            다음
        </Button>
        </div>
    );
}
