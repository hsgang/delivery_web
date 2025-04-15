"use client";

import { useOrder } from "../context/OrderContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BreadcrumbCustom from "@/components/BreadcrumbCustom";
import { Separator } from "@/components/ui/separator"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

type FormValues = {
phone: string;
};

export default function ConfirmPage() {
  const { region, items, clearItems } = useOrder();

  // react-hook-form 세팅
  const form = useForm<FormValues>({
    defaultValues: { phone: "" },
    mode: "onChange",
    });

  const {
    formState: { isValid },
    } = form;

  const productTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = 3000;
  const total = productTotal + deliveryFee;

  const onSubmit = () => {
    // SMS 앱 호출
    //window.location.href = makeMessage(data.phone);
    // 주문 초기화
    clearItems();
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center">
        <BreadcrumbCustom />
        <Separator className="mb-6"/>
      <h2 className="text-2xl font-bold mb-6">최종 주문 내역 확인</h2>

      <Card className="w-full max-w-lg mb-6">
        <CardContent>
          <p className="mb-4">
            <span className="font-semibold">배송 지역:</span> {region}
          </p>
          <Separator className="mb-8"/>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-2">🛒메뉴</th>
                <th className="pb-2">수량</th>
                <th className="pb-2">단가</th>
                <th className="pb-2">합계</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={`${i.name}-${i.price}`} className="border-b">
                  <td className="py-2">{i.name}</td>
                  <td className="py-2">{i.qty}</td>
                  <td className="py-2">{i.price.toLocaleString()}원</td>
                  <td className="py-2">
                    {(i.price * i.qty).toLocaleString()}원
                  </td>
                </tr>
              ))}
              {/* 배송비 행 */}
              <tr className="border-b">
                <td className="py-2">배송비</td>
                <td className="py-2">-</td>
                <td className="py-2">-</td>
                <td className="py-2">{deliveryFee.toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 flex justify-end font-bold">
            총액: {total.toLocaleString()}원
          </div>
        </CardContent>
      </Card>

      {/* 전화번호 입력 폼 */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg mb-6"
        >
          <FormField
            control={form.control}
            name="phone"
            rules={{
              required: "전화번호를 입력해주세요.",
              pattern: {
                value: /^01[016789]-\d{3,4}-\d{4}$/,
                message: "올바른 형식 입력해주세요.",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>주문자 전화번호</FormLabel>
                <FormControl>
                  <Input placeholder="010-0000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">

          {/* <Button
            type="submit"
            disabled={!isValid && !items.length}
            className="text-xl font-bold mt-6 ml-auto">
            주문 전송
          </Button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                  type='submit'
                  disabled={!isValid && !items.length}
                  className="text-xl font-bold mt-6 ml-auto">주문 전송</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>주문 확인</AlertDialogTitle>
                <AlertDialogDescription>
                  {/* 주문이 접수되었습니다!
                  입력하신 번호로 확인 문자가 전송됩니다. */}
                  서비스 테스트중입니다.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogAction>확인</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
     </Form>
    </div>
  );
}