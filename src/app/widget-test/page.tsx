import type { Metadata } from "next";
import MusaiSafetyWidget from "@/components/musai/MusaiSafetyWidget";

export const metadata: Metadata = {
  title: "MUSAI 위젯 테스트 | EJ Korean",
  robots: { index: false, follow: false },
};

export default function WidgetTestPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-600">
          기술 테스트 페이지
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-neutral-900">
          MUSAI 안전 위젯 목업
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
          실제 MUSAI API에는 연결되어 있지 않고, 기획서에 나온 스펙(안전체크
          지수, 위험요약, Safe-How 가이드)을 바탕으로 만든 예시 데이터입니다.
          EJ Korean 서비스와는 관련 없는 기술 연동 테스트용 페이지입니다.
        </p>
      </div>

      <div className="mt-12">
        <MusaiSafetyWidget />
      </div>
    </div>
  );
}
