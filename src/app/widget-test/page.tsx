import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "MUSAI 위젯 테스트 | EJ Korean",
  robots: { index: false, follow: false },
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function WidgetTestPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-600">
          기술 테스트 페이지
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-neutral-900">
          MUSAI 안전 위젯 연동 테스트
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
          MUSAI 설치 가이드에 나온 실제 연동 방식(
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">
            div.musai-safety-widget
          </code>{" "}
          + <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">script</code>{" "}
          태그)을 그대로 적용한 페이지입니다.{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">data-api-base</code>
          가 비어 있어 가이드에 설명된 대로 데모 모드로 표시됩니다. EJ Korean
          서비스와는 관련 없는 기술 연동 테스트용 페이지입니다.
        </p>
      </div>

      <h2 className="mt-16 text-center text-lg font-bold text-neutral-900">
        국가 단위 예시
      </h2>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        <div
          className="musai-safety-widget"
          data-country="FR"
          data-region="파리"
          data-layout="card"
        />
        <div
          className="musai-safety-widget"
          data-country="ES"
          data-region="바르셀로나"
          data-layout="card"
        />
      </div>

      <h2 className="mt-16 text-center text-lg font-bold text-neutral-900">
        같은 국가, 세분화된 지역 예시 (프랑스)
      </h2>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        <div
          className="musai-safety-widget"
          data-country="FR"
          data-region="파리"
          data-layout="card"
        />
        <div
          className="musai-safety-widget"
          data-country="FR"
          data-region="몽마르트르"
          data-layout="card"
        />
        <div
          className="musai-safety-widget"
          data-country="FR"
          data-region="니스"
          data-layout="card"
        />
      </div>

      <Script src={`${BASE_PATH}/musai-widget.js`} strategy="afterInteractive" />
    </div>
  );
}
