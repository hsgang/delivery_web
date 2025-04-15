"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STEPS = [
  { label: "안내", href: "/" },
  { label: "지점 선택", href: "/region" },
  { label: "물품 선택", href: "/menu" },
  { label: "확인", href: "/confirm" },
];

export default function BreadcrumbCustom() {
  const pathname = usePathname();

  return (
    <nav aria-label="BreadcrumbCustom" className="flex mb-4">
      <ol className="flex items-center text-sm">
        {STEPS.map((step, idx) => {
          const isActive = step.href === pathname;
          return (
            <li key={step.href} className="flex items-center">
              {idx > 0 && <span className="mx-2">›</span>}
              {isActive ? (
                <span className="font-semibold text-gray-900">
                  {step.label}
                </span>
              ) : (
                <Link
                  href={step.href}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {step.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}