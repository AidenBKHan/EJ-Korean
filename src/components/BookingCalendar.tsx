"use client";

import { useState } from "react";
import {
  getAvailableSlots,
  getDateStatus,
  getSlotsForDate,
  slotsConflict,
  toDateKey,
  type Booking,
  type ScheduleSettings,
} from "@/lib/schedule";

const WEEKDAY_LABELS = [
  { ko: "일", en: "Sun" },
  { ko: "월", en: "Mon" },
  { ko: "화", en: "Tue" },
  { ko: "수", en: "Wed" },
  { ko: "목", en: "Thu" },
  { ko: "금", en: "Fri" },
  { ko: "토", en: "Sat" },
];

const MONTH_LABELS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type BookedSlot = { date: string; time: string };

/**
 * Slots still pickable for a date, additionally excluding anything that
 * would overlap the current user's own not-yet-submitted selections (so a
 * 50-minute class picked at 10:00 immediately blocks 10:30, before the form
 * is even submitted).
 */
function pickableSlots(
  schedule: ScheduleSettings,
  bookings: Booking[],
  selectedSlots: BookedSlot[],
  dateKey: string,
): string[] {
  const base = getAvailableSlots(schedule, bookings, dateKey);
  const pendingTimes = selectedSlots
    .filter((s) => s.date === dateKey)
    .map((s) => s.time);
  return base.filter(
    (time) =>
      pendingTimes.includes(time) ||
      pendingTimes.every((t) => !slotsConflict(schedule, time, t)),
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function buildMonthGrid(monthStart: Date): Date[] {
  const firstWeekday = monthStart.getDay();
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - firstWeekday);

  const daysInMonth = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth() + 1,
    0,
  ).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
}

export default function BookingCalendar({
  schedule,
  bookings,
  selectedSlots,
  maxSlots,
  onToggleSlot,
}: {
  schedule: ScheduleSettings;
  bookings: Booking[];
  selectedSlots: BookedSlot[];
  maxSlots: number;
  onToggleSlot: (slot: BookedSlot) => void;
}) {
  const today = new Date();
  const todayKey = toDateKey(today);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(today));
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const canGoPrevMonth =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());

  const grid = buildMonthGrid(viewMonth);
  const allSlotsForActiveDate = activeDate
    ? getSlotsForDate(schedule, activeDate)
    : [];
  const bookableSet = new Set(
    activeDate ? getAvailableSlots(schedule, bookings, activeDate) : [],
  );
  const pendingForActiveDate = selectedSlots
    .filter((s) => s.date === activeDate)
    .map((s) => s.time);
  const selectedKeys = new Set(
    selectedSlots.map((s) => `${s.date}_${s.time}`),
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={!canGoPrevMonth}
          onClick={() =>
            setViewMonth(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
            )
          }
          className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-600 transition-colors hover:border-rose-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-neutral-300"
        >
          ‹
        </button>
        <p className="text-center text-sm font-semibold text-neutral-900">
          {viewMonth.getFullYear()}년 {viewMonth.getMonth() + 1}월
          <span className="block text-xs font-medium text-neutral-400">
            {MONTH_LABELS_EN[viewMonth.getMonth()]} {viewMonth.getFullYear()}
          </span>
        </p>
        <button
          type="button"
          onClick={() =>
            setViewMonth(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
            )
          }
          className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-600 transition-colors hover:border-rose-300"
        >
          ›
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-medium text-neutral-400">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label.ko}>
            {label.ko} ({label.en})
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {grid.map((date) => {
          const dateKey = toDateKey(date);
          const inMonth =
            date.getMonth() === viewMonth.getMonth() &&
            date.getFullYear() === viewMonth.getFullYear();
          const isPast = dateKey < todayKey;
          let status: "available" | "full" | "closed" = "closed";
          if (inMonth && !isPast) {
            status = getDateStatus(schedule, bookings, dateKey);
            if (
              status === "available" &&
              pickableSlots(schedule, bookings, selectedSlots, dateKey)
                .length === 0
            ) {
              status = "full";
            }
          }
          const isSelectable = inMonth && !isPast && status === "available";
          const isActive = dateKey === activeDate;
          const hasSelection = selectedSlots.some((s) => s.date === dateKey);

          return (
            <button
              key={dateKey}
              type="button"
              disabled={!isSelectable}
              onClick={() => setActiveDate(dateKey)}
              className={`relative rounded-lg py-2 text-sm transition-colors ${
                !inMonth
                  ? "text-neutral-200"
                  : isPast || status !== "available"
                    ? "cursor-not-allowed text-neutral-300"
                    : isActive
                      ? "bg-rose-600 font-semibold text-white"
                      : hasSelection
                        ? "bg-rose-100 font-semibold text-rose-600"
                        : "text-neutral-700 hover:bg-rose-50"
              }`}
            >
              {date.getDate()}
              {hasSelection && !isActive && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rose-600" />
              )}
            </button>
          );
        })}
      </div>

      {activeDate && (
        <div className="mt-4">
          <p className="text-sm font-medium text-neutral-700">
            {activeDate} 예약 가능 시간{" "}
            <span className="text-neutral-400">(Available Times)</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {allSlotsForActiveDate.length === 0 ? (
              <p className="text-sm text-neutral-400">
                예약 가능한 시간이 없습니다. No available times.
              </p>
            ) : (
              allSlotsForActiveDate.map((time) => {
                const isSelected = selectedKeys.has(`${activeDate}_${time}`);
                const conflictsWithPending = pendingForActiveDate.some(
                  (t) => t !== time && slotsConflict(schedule, time, t),
                );
                const atMaxSelected = selectedSlots.length >= maxSlots;
                const disabled =
                  !isSelected &&
                  (!bookableSet.has(time) ||
                    conflictsWithPending ||
                    atMaxSelected);
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={disabled}
                    onClick={() => onToggleSlot({ date: activeDate, time })}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      isSelected
                        ? "border-rose-600 bg-rose-600 text-white"
                        : disabled
                          ? "cursor-not-allowed border-neutral-100 text-neutral-300 line-through"
                          : "border-neutral-300 text-neutral-700 hover:border-rose-300"
                    }`}
                  >
                    {time}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {selectedSlots.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {selectedSlots.map((slot) => (
            <div
              key={`${slot.date}_${slot.time}`}
              className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2 text-sm"
            >
              <span className="text-neutral-700">
                {slot.date} {slot.time}
              </span>
              <button
                type="button"
                onClick={() => onToggleSlot(slot)}
                className="text-xs font-medium text-neutral-400 hover:text-rose-600"
              >
                삭제 (Remove)
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
