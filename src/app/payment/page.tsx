import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentPageContent from "@/components/PaymentPageContent";

export const metadata: Metadata = {
  title: "수업 결제 | EJ Korean",
  description: "EJ Korean 한국어 수업 신청 및 결제 페이지",
};

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
          수업 결제
        </h1>
        <p className="mt-4 text-neutral-600">
          원하시는 수업 패키지를 선택하고 신청서를 작성해주세요.
        </p>
      </div>

      <Suspense>
        <PaymentPageContent />
      </Suspense>

      {/* 기술 테스트: MUSAI 안전 위젯 배너 (EJ Korean 서비스와 무관) */}
      <div
        className="musai-safety-widget"
        data-country="FR"
        data-region="파리"
        data-layout="banner"
        data-position="bottom"
      />
      {/* 화면 하단에 고정되는 배너가 푸터를 가리지 않도록 여유 공간 확보 */}
      <div className="h-28" aria-hidden="true" />
    </div>
  );
}
