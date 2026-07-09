"use client";

import {
  DAY_LABELS,
  getAvailableSlots,
  getDateStatus,
  toDateKey,
  type Booking,
  type ScheduleSettings,
} from "@/lib/schedule";

const DAYS_TO_SHOW = 21;

function formatDateLabel(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()} (${DAY_LABELS[date.getDay()]})`;
}

export default function BookingCalendar({
  schedule,
  bookings,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: {
  schedule: ScheduleSettings;
  bookings: Booking[];
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}) {
  const today = new Date();
  const dates = Array.from({ length: DAYS_TO_SHOW }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return toDateKey(date);
  });

  const slots = selectedDate
    ? getAvailableSlots(schedule, bookings, selectedDate)
    : [];

  return (
    <div>
      <p className="text-sm font-medium text-neutral-700">예약 날짜 선택</p>
      <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
        {dates.map((dateKey) => {
          const status = getDateStatus(schedule, bookings, dateKey);
          const isSelected = dateKey === selectedDate;
          const disabled = status !== "available";
          return (
            <button
              key={dateKey}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(dateKey)}
              className={`shrink-0 rounded-lg border px-3 py-2 text-center text-xs font-medium transition-colors ${
                isSelected
                  ? "border-rose-600 bg-rose-600 text-white"
                  : disabled
                    ? "cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300"
                    : "border-neutral-300 text-neutral-700 hover:border-rose-300"
              }`}
            >
              {formatDateLabel(dateKey)}
              {status === "full" && (
                <span className="mt-0.5 block text-[10px]">마감</span>
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4">
          <p className="text-sm font-medium text-neutral-700">
            {formatDateLabel(selectedDate)} 예약 가능 시간
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {slots.length === 0 ? (
              <p className="text-sm text-neutral-400">
                예약 가능한 시간이 없습니다.
              </p>
            ) : (
              slots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => onSelectTime(time)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    time === selectedTime
                      ? "border-rose-600 bg-rose-600 text-white"
                      : "border-neutral-300 text-neutral-700 hover:border-rose-300"
                  }`}
                >
                  {time}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
