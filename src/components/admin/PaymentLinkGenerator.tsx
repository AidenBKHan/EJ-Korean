"use client";

import { useMemo, useState } from "react";
import type { ClassPackage } from "@/lib/packages";
import { shareViaKakao } from "@/lib/kakao";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function PaymentLinkGenerator({
  packages,
}: {
  packages: ClassPackage[];
}) {
  const [packageId, setPackageId] = useState(packages[0]?.id ?? "");
  const [recipientName, setRecipientName] = useState("");
  const [copied, setCopied] = useState(false);
  const [kakaoError, setKakaoError] = useState<string | null>(null);

  const selectedPackage = packages.find((pkg) => pkg.id === packageId);

  const link = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(`${window.location.origin}${BASE_PATH}/payment`);
    if (packageId) url.searchParams.set("package", packageId);
    if (recipientName) url.searchParams.set("name", recipientName);
    return url.toString();
  }, [packageId, recipientName]);

  const message = selectedPackage
    ? `[EJ Korean 한국어 수업 결제 안내]\n${
        recipientName ? `${recipientName}님, ` : ""
      }${selectedPackage.name} (${selectedPackage.price.toLocaleString(
        "ko-KR",
      )}원) 결제 링크를 보내드려요.\n${link}`
    : link;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function handleKakaoShare() {
    setKakaoError(null);
    try {
      await shareViaKakao({ text: message, linkUrl: link });
    } catch (err) {
      if (err instanceof Error && err.message === "NO_KEY") {
        setKakaoError(
          "카카오 공유 기능을 쓰려면 카카오 개발자센터에서 무료로 발급받은 JavaScript 키를 NEXT_PUBLIC_KAKAO_JS_KEY(빌드 환경변수 KAKAO_JS_KEY)로 등록해야 합니다. 지금은 키가 없어서 준비만 되어 있는 상태입니다.",
        );
      } else {
        setKakaoError("카카오톡 공유 중 오류가 발생했습니다.");
      }
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900">결제 링크 전송</h2>
      <p className="mt-1 text-sm text-neutral-500">
        패키지를 선택하고 카카오톡, 문자, 또는 링크 복사로 학습자에게 결제
        링크를 보낼 수 있습니다.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-neutral-500">
            패키지 선택
          </label>
          <select
            value={packageId}
            onChange={(event) => setPackageId(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
          >
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} · {pkg.price.toLocaleString("ko-KR")}원
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-500">
            받는 사람 이름 (선택)
          </label>
          <input
            value={recipientName}
            onChange={(event) => setRecipientName(event.target.value)}
            placeholder="예: 홍길동"
            className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-4 break-all rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
        {link}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-rose-300 hover:text-rose-600"
        >
          {copied ? "복사됨!" : "링크 복사"}
        </button>
        <a
          href={`sms:?body=${encodeURIComponent(message)}`}
          className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-rose-300 hover:text-rose-600"
        >
          문자로 보내기
        </a>
        <button
          type="button"
          onClick={handleKakaoShare}
          className="rounded-full bg-[#FEE500] px-5 py-2 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-90"
        >
          카카오톡으로 보내기
        </button>
      </div>

      {kakaoError && (
        <p className="mt-3 text-xs text-rose-600">{kakaoError}</p>
      )}
    </div>
  );
}
