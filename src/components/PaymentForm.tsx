"use client";

import { useState } from "react";
import type { ClassPackage } from "@/lib/packages";
import { addBooking, useBookings, useSchedule } from "@/lib/schedule";
import BookingCalendar, { type BookedSlot } from "@/components/BookingCalendar";

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
  const [selectedSlots, setSelectedSlots] = useState<BookedSlot[]>([]);
  const [showDateTimeError, setShowDateTimeError] = useState(false);

  const schedule = useSchedule();
  const bookings = useBookings();

  const selectedPackage = packages.find((pkg) => pkg.id === selectedId);
  const requiredSlots = selectedPackage?.sessions ?? 1;

  function handleSelectPackage(id: string) {
    setSelectedId(id);
    setSelectedSlots([]);
    setShowDateTimeError(false);
  }

  function handleToggleSlot(slot: BookedSlot) {
    setShowDateTimeError(false);
    setSelectedSlots((prev) => {
      const exists = prev.some(
        (s) => s.date === slot.date && s.time === slot.time,
      );
      if (exists) {
        return prev.filter((s) => !(s.date === slot.date && s.time === slot.time));
      }
      if (prev.length >= requiredSlots) return prev;
      return [...prev, slot];
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedSlots.length < requiredSlots) {
      setShowDateTimeError(true);
      return;
    }
    setShowDateTimeError(false);
    if (selectedPackage) {
      const formData = new FormData(event.currentTarget);
      const name = String(formData.get("name") ?? "");
      for (const slot of selectedSlots) {
        addBooking({
          date: slot.date,
          time: slot.time,
          packageId: selectedPackage.id,
          name,
        });
      }
    }
    setSubmitted(true);
  }

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
              onClick={() => handleSelectPackage(pkg.id)}
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
              {pkg.descriptionEn && (
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                  {pkg.descriptionEn}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Applicant form */}
      <form className="mx-auto mt-16 max-w-lg" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900">
            예약 날짜 및 시간
            <span className="ml-2 text-sm font-medium text-neutral-400">
              Booking Date &amp; Time
            </span>
          </h2>
          {selectedPackage && (
            <span className="text-sm font-medium text-neutral-500">
              {selectedSlots.length}/{requiredSlots}회 선택됨 (
              {selectedSlots.length}/{requiredSlots} selected)
            </span>
          )}
        </div>
        <div className="mt-6">
          <BookingCalendar
            schedule={schedule}
            bookings={bookings}
            selectedSlots={selectedSlots}
            maxSlots={requiredSlots}
            onToggleSlot={handleToggleSlot}
          />
          {showDateTimeError && (
            <p className="mt-2 text-sm text-rose-600">
              {requiredSlots}회 수업의 날짜와 시간을 모두 선택해주세요. Please
              select a date and time for all {requiredSlots} class
              {requiredSlots > 1 ? "es" : ""}.
            </p>
          )}
          <p className="mt-3 text-xs text-neutral-400">
            * 수업 {schedule.slotMinutes}분 + 쉬는 시간 {schedule.breakMinutes}
            분 기준으로 예약 가능 시간이 계산됩니다. 예약이 이 기기의
            브라우저에만 임시로 저장되며 관리자에게 자동 전달되지는
            않습니다. 예약 확정은 신청 후 안내드린 연락처로 다시 한번
            확인해 드립니다.
            <br />
            * Available times are calculated based on a {schedule.slotMinutes}
            -minute class plus a {schedule.breakMinutes}-minute break.
            Bookings are only saved temporarily in this device&apos;s browser
            and are not automatically sent to the admin. We will confirm your
            booking through the contact info you provide after you apply.
          </p>
        </div>

        <h2 className="mt-10 text-xl font-bold text-neutral-900">
          신청자 정보
          <span className="ml-2 text-sm font-medium text-neutral-400">
            Applicant Information
          </span>
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700"
            >
              이름 <span className="text-neutral-400">(Name)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={prefillName}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-base focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="홍길동"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700"
            >
              이메일 <span className="text-neutral-400">(Email)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-base focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-neutral-700"
            >
              연락처 (카카오톡 ID 또는 전화번호){" "}
              <span className="text-neutral-400">
                (Contact: KakaoTalk ID or phone number)
              </span>
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-base focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="카카오톡 ID 또는 전화번호"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-700"
            >
              추가 메시지 (선택){" "}
              <span className="text-neutral-400">
                (Additional message, optional)
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-base focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="희망 수업 시간, 학습 목표 등을 알려주세요 / Preferred class time, learning goals, etc."
            />
          </div>
        </div>

        {selectedPackage && (
          <div className="mt-6 space-y-2 rounded-lg bg-neutral-50 px-4 py-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">
                선택한 패키지 <span className="text-neutral-400">(Package)</span>
              </span>
              <span className="font-semibold text-neutral-900">
                {selectedPackage.name} · {selectedPackage.price.toLocaleString("ko-KR")}원
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 text-neutral-600">
                예약 일시 <span className="text-neutral-400">(Booking)</span>
              </span>
              {selectedSlots.length > 0 ? (
                <span className="text-right font-semibold text-neutral-900">
                  {selectedSlots.map((slot) => (
                    <span key={`${slot.date}_${slot.time}`} className="block">
                      {slot.date} {slot.time}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="font-semibold text-neutral-900">
                  미선택 (Not selected)
                </span>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
        >
          결제하기 (Pay / Apply)
        </button>

        <p className="mt-3 text-center text-xs text-neutral-400">
          * 온라인 결제 시스템은 현재 준비 중입니다. 신청 후 안내드린 연락처로
          결제 방법을 별도로 안내해 드립니다.
          <br />
          * Online payment is currently being set up. We will guide you
          through payment separately via the contact info you provide after
          applying.
        </p>

        {submitted && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm text-rose-700">
            {selectedSlots.length}회 수업 (
            {selectedSlots
              .map((slot) => `${slot.date} ${slot.time}`)
              .join(", ")}
            ) 신청이 접수되었습니다. 곧 연락드리겠습니다. (결제 시스템 준비
            중)
            <br />
            Your application for {selectedSlots.length} class
            {selectedSlots.length > 1 ? "es" : ""} has been received. We will
            contact you soon. (Payment system coming soon)
          </div>
        )}
      </form>
    </div>
  );
}
