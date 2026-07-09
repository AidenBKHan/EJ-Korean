"use client";

import { useState } from "react";
import {
  DAY_LABELS,
  DEFAULT_SCHEDULE,
  loadSchedule,
  saveSchedule,
  type DayAvailability,
  type ScheduleSettings,
} from "@/lib/schedule";

const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // 월~일

export default function ScheduleEditor() {
  const [schedule, setSchedule] = useState<ScheduleSettings>(() =>
    loadSchedule(),
  );
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);

  function updateDay(day: number, patch: Partial<DayAvailability>) {
    setSavedAt(null);
    setSchedule((prev) => ({
      ...prev,
      weekly: prev.weekly.map((d) =>
        d.day === day ? { ...d, ...patch } : d,
      ),
    }));
  }

  function addRange(day: number) {
    setSavedAt(null);
    setSchedule((prev) => ({
      ...prev,
      weekly: prev.weekly.map((d) =>
        d.day === day
          ? { ...d, ranges: [...d.ranges, { start: "10:00", end: "19:00" }] }
          : d,
      ),
    }));
  }

  function updateRange(
    day: number,
    index: number,
    patch: Partial<{ start: string; end: string }>,
  ) {
    setSavedAt(null);
    setSchedule((prev) => ({
      ...prev,
      weekly: prev.weekly.map((d) =>
        d.day === day
          ? {
              ...d,
              ranges: d.ranges.map((r, i) =>
                i === index ? { ...r, ...patch } : r,
              ),
            }
          : d,
      ),
    }));
  }

  function removeRange(day: number, index: number) {
    setSavedAt(null);
    setSchedule((prev) => ({
      ...prev,
      weekly: prev.weekly.map((d) =>
        d.day === day
          ? { ...d, ranges: d.ranges.filter((_, i) => i !== index) }
          : d,
      ),
    }));
  }

  function addBlockedDate() {
    if (!newBlockedDate || schedule.blockedDates.includes(newBlockedDate)) {
      return;
    }
    setSavedAt(null);
    setSchedule((prev) => ({
      ...prev,
      blockedDates: [...prev.blockedDates, newBlockedDate].sort(),
    }));
    setNewBlockedDate("");
  }

  function removeBlockedDate(date: string) {
    setSavedAt(null);
    setSchedule((prev) => ({
      ...prev,
      blockedDates: prev.blockedDates.filter((d) => d !== date),
    }));
  }

  function handleSave() {
    saveSchedule(schedule);
    setSavedAt(Date.now());
  }

  function handleReset() {
    saveSchedule(DEFAULT_SCHEDULE);
    setSchedule(DEFAULT_SCHEDULE);
    setSavedAt(Date.now());
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-neutral-900">
          예약 가능 시간 설정
        </h2>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-rose-300 hover:text-rose-600"
        >
          기본값으로 초기화
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {DISPLAY_ORDER.map((day) => {
          const info = schedule.weekly.find((d) => d.day === day);
          if (!info) return null;
          return (
            <div
              key={day}
              className="rounded-2xl border border-neutral-200 p-4"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                <input
                  type="checkbox"
                  checked={info.enabled}
                  onChange={(event) =>
                    updateDay(day, { enabled: event.target.checked })
                  }
                  className="h-4 w-4 rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
                />
                {DAY_LABELS[day]}요일
              </label>

              {info.enabled && (
                <div className="mt-3 space-y-2">
                  {info.ranges.map((range, index) => (
                    <div key={index} className="flex flex-wrap items-center gap-2">
                      <input
                        type="time"
                        value={range.start}
                        onChange={(event) =>
                          updateRange(day, index, { start: event.target.value })
                        }
                        className="rounded-lg border border-neutral-300 px-2 py-1.5 text-base"
                      />
                      <span className="text-neutral-400">~</span>
                      <input
                        type="time"
                        value={range.end}
                        onChange={(event) =>
                          updateRange(day, index, { end: event.target.value })
                        }
                        className="rounded-lg border border-neutral-300 px-2 py-1.5 text-base"
                      />
                      <button
                        type="button"
                        onClick={() => removeRange(day, index)}
                        className="text-xs font-medium text-neutral-400 hover:text-rose-600"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addRange(day)}
                    className="text-xs font-medium text-rose-600 hover:text-rose-700"
                  >
                    + 시간대 추가
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-neutral-700">
          수업(예약 슬롯) 간격
        </label>
        <select
          value={schedule.slotMinutes}
          onChange={(event) => {
            setSavedAt(null);
            setSchedule((prev) => ({
              ...prev,
              slotMinutes: Number(event.target.value),
            }));
          }}
          className="mt-1 rounded-lg border border-neutral-300 px-3 py-2 text-base"
        >
          <option value={30}>30분</option>
          <option value={50}>50분</option>
          <option value={60}>60분</option>
          <option value={90}>90분</option>
        </select>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-neutral-700">
          휴무일 (특정 날짜 차단)
        </label>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={newBlockedDate}
            onChange={(event) => setNewBlockedDate(event.target.value)}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-base"
          />
          <button
            type="button"
            onClick={addBlockedDate}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-rose-300 hover:text-rose-600"
          >
            추가
          </button>
        </div>
        {schedule.blockedDates.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {schedule.blockedDates.map((date) => (
              <span
                key={date}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {date}
                <button
                  type="button"
                  onClick={() => removeBlockedDate(date)}
                  className="text-neutral-400 hover:text-rose-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
        >
          변경사항 저장
        </button>
        {savedAt && (
          <span className="text-sm text-neutral-500">저장되었습니다.</span>
        )}
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        * 이 변경사항은 이 브라우저에만 저장됩니다. 다른 기기/브라우저의
        방문자에게는 적용되지 않습니다.
      </p>
    </div>
  );
}
