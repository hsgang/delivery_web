"use client";

//import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 py-2 fixed bottom-0">
    <div className="container mx-auto px-4 flex flex-col items-center justify-center text-sm text-gray-600 dark:text-gray-400">
      <p>&copy; 2025 주식회사 에이엠피 드론 배송 서비스. All rights reserved.</p>
      {/* <div className="flex space-x-4 mt-2">
        <Link href="/terms" className="hover:underline">
        이용약관
        </Link>
        <Link href="/privacy" className="hover:underline">
        개인정보처리방침
        </Link>
        <Link href="/contact" className="hover:underline">
        문의하기
        </Link>
      </div> */}
    </div>
    </footer>
  );
}
