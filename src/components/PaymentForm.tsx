"use client";

import { useState } from "react";
import type { ClassPackage } from "@/lib/packages";

export default function PaymentForm({
  packages,
  preselectedId,
  prefillName,
}: {
  packages: ClassPackage[];
  preselectedId?: string;
  prefillName?: string;
}) {
  const visiblePackages = packages.filter((pkg) => pkg.visible !== false);

  const [selectedId, setSelectedId] = useState(
    preselectedId ?? visiblePackages[0]?.id ?? packages[0]?.id ?? "",
  );
  const [submitted, setSubmitted] = useState(false);

  const selectedPackage = packages.find((pkg) => pkg.id === selectedId);

  return (
    <div className="mt-12">
      {/* Package selection */}
      <div className="grid gap-6 sm:grid-cols-2">
        {visiblePackages.map((pkg) => {
          const isSelected = pkg.id === selectedId;
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedId(pkg.id)}
              className={`relative rounded-2xl border p-6 text-left transition-colors ${
                isSelected
                  ? "border-rose-600 bg-rose-50"
                  : "border-neutral-200 hover:border-rose-300"
              }`}
            >
              {pkg.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
                  {pkg.badge}
                </span>
              )}
              <h3 className="text-lg font-bold text-neutral-900">{pkg.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">{pkg.duration}</p>
              <p className="mt-4 text-2xl font-black text-neutral-900">
                {pkg.price.toLocaleString("ko-KR")}원
                {pkg.sessions > 1 && (
                  <span className="ml-1.5 text-sm font-medium text-neutral-400">
                    (회당 {Math.round(pkg.price / pkg.sessions).toLocaleString("ko-KR")}원)
                  </span>
                )}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {pkg.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Applicant form */}
      <form
        className="mx-auto mt-16 max-w-lg"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <h2 className="text-xl font-bold text-neutral-900">신청자 정보</h2>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700"
            >
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={prefillName}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="홍길동"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-neutral-700"
            >
              연락처 (카카오톡 ID 또는 전화번호)
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="카카오톡 ID 또는 전화번호"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-700"
            >
              추가 메시지 (선택)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="희망 수업 시간, 학습 목표 등을 알려주세요"
            />
          </div>
        </div>

        {selectedPackage && (
          <div className="mt-6 flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-3 text-sm">
            <span className="text-neutral-600">선택한 패키지</span>
            <span className="font-semibold text-neutral-900">
              {selectedPackage.name} · {selectedPackage.price.toLocaleString("ko-KR")}원
            </span>
          </div>
        )}

        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
        >
          결제하기
        </button>

        <p className="mt-3 text-center text-xs text-neutral-400">
          * 온라인 결제 시스템은 현재 준비 중입니다. 신청 후 안내드린 연락처로
          결제 방법을 별도로 안내해 드립니다.
        </p>

        {submitted && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm text-rose-700">
            신청이 접수되었습니다. 곧 연락드리겠습니다. (결제 시스템 준비 중)
          </div>
        )}
      </form>
    </div>
  );
}
