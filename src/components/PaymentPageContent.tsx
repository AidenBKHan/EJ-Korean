"use client";

import { useSearchParams } from "next/navigation";
import PaymentForm from "@/components/PaymentForm";
import { usePackages } from "@/lib/packages";

export default function PaymentPageContent() {
  const searchParams = useSearchParams();
  const packages = usePackages();

  const preselectedId = searchParams.get("package") ?? undefined;
  const prefillName = searchParams.get("name") ?? undefined;

  return (
    <PaymentForm
      packages={packages}
      preselectedId={preselectedId}
      prefillName={prefillName}
    />
  );
}
