"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout, useIsAdminLoggedIn } from "@/lib/admin-auth";
import { usePackages } from "@/lib/packages";
import PackageEditor from "@/components/admin/PackageEditor";
import ScheduleEditor from "@/components/admin/ScheduleEditor";
import PaymentLinkGenerator from "@/components/admin/PaymentLinkGenerator";

export default function AdminDashboard() {
  const router = useRouter();
  const loggedIn = useIsAdminLoggedIn();
  const packages = usePackages();

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/admin");
    }
  }, [loggedIn, router]);

  if (!loggedIn) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-neutral-900">관리자 대시보드</h1>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/admin");
          }}
          className="shrink-0 text-sm font-medium text-neutral-500 hover:text-rose-600"
        >
          로그아웃
        </button>
      </div>

      <section className="mt-10">
        <PackageEditor />
      </section>

      <section className="mt-16 border-t border-neutral-200 pt-10">
        <ScheduleEditor />
      </section>

      <section className="mt-16 border-t border-neutral-200 pt-10">
        <PaymentLinkGenerator packages={packages} />
      </section>
    </div>
  );
}
