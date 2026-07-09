import { useSyncExternalStore } from "react";
import { createCachedLoader } from "@/lib/localStorageCache";

export type TimeRange = { start: string; end: string }; // "HH:mm", 24h

export type DayAvailability = {
  /** 0 = 일요일 ... 6 = 토요일 (matches Date.getDay()) */
  day: number;
  enabled: boolean;
  ranges: TimeRange[];
};

export type ScheduleSettings = {
  weekly: DayAvailability[];
  blockedDates: string[]; // "YYYY-MM-DD"
  /** Length of one class, in minutes. */
  slotMinutes: number;
  /** Required gap between the end of one class and the start of the next. */
  breakMinutes: number;
  /** Granularity of selectable start times (e.g. 30 = start times on the hour/half hour). */
  stepMinutes: number;
};

export type Booking = {
  id: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  packageId: string;
  name: string;
  createdAt: number;
};

export type NewBooking = Omit<Booking, "id" | "createdAt">;

export const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

export const DEFAULT_SCHEDULE: ScheduleSettings = {
  weekly: [0, 1, 2, 3, 4, 5, 6].map((day) => {
    const isWeekday = day >= 1 && day <= 5;
    return {
      day,
      enabled: isWeekday,
      ranges: isWeekday ? [{ start: "10:00", end: "19:00" }] : [],
    };
  }),
  blockedDates: [],
  slotMinutes: 50,
  breakMinutes: 10,
  stepMinutes: 30,
};

const SCHEDULE_KEY = "ej-korean:schedule";
const BOOKINGS_KEY = "ej-korean:bookings";
const EMPTY_BOOKINGS: Booking[] = [];

export const loadSchedule = createCachedLoader<ScheduleSettings>(
  SCHEDULE_KEY,
  DEFAULT_SCHEDULE,
  (value): value is ScheduleSettings =>
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as ScheduleSettings).weekly),
);

type Listener = () => void;
const scheduleListeners = new Set<Listener>();

export function saveSchedule(schedule: ScheduleSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
  scheduleListeners.forEach((listener) => listener());
}

function subscribeSchedule(listener: Listener) {
  scheduleListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    scheduleListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useSchedule(): ScheduleSettings {
  return useSyncExternalStore(
    subscribeSchedule,
    loadSchedule,
    () => DEFAULT_SCHEDULE,
  );
}

export const loadBookings = createCachedLoader<Booking[]>(
  BOOKINGS_KEY,
  EMPTY_BOOKINGS,
  (value): value is Booking[] => Array.isArray(value),
);

const bookingListeners = new Set<Listener>();

export function addBooking(booking: NewBooking) {
  if (typeof window === "undefined") return;
  const bookings = [
    ...loadBookings(),
    { ...booking, id: `booking-${Date.now()}`, createdAt: Date.now() },
  ];
  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  bookingListeners.forEach((listener) => listener());
}

function subscribeBookings(listener: Listener) {
  bookingListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    bookingListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useBookings(): Booking[] {
  return useSyncExternalStore(
    subscribeBookings,
    loadBookings,
    () => EMPTY_BOOKINGS,
  );
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** All candidate class start times for a date's weekly ranges (ignores existing bookings). */
export function getSlotsForDate(
  schedule: ScheduleSettings,
  dateKey: string,
): string[] {
  const date = new Date(`${dateKey}T00:00:00`);
  const day = schedule.weekly.find((d) => d.day === date.getDay());
  if (!day || !day.enabled || schedule.blockedDates.includes(dateKey)) {
    return [];
  }
  const step = schedule.stepMinutes ?? 30;
  const slots: string[] = [];
  for (const range of day.ranges) {
    const start = timeToMinutes(range.start);
    const end = timeToMinutes(range.end);
    for (let t = start; t + schedule.slotMinutes <= end; t += step) {
      slots.push(minutesToTime(t));
    }
  }
  return slots;
}

/** Whether two same-day start times would overlap once the class length and break are applied. */
export function slotsConflict(
  schedule: ScheduleSettings,
  timeA: string,
  timeB: string,
): boolean {
  const breakMinutes = schedule.breakMinutes ?? 10;
  const aStart = timeToMinutes(timeA);
  const aEnd = aStart + schedule.slotMinutes;
  const bStart = timeToMinutes(timeB);
  const bEnd = bStart + schedule.slotMinutes;
  return !(aStart >= bEnd + breakMinutes || bStart >= aEnd + breakMinutes);
}

/**
 * Start times that are still bookable: don't overlap an existing class (plus
 * the required break on either side), and aren't in the past.
 */
export function getAvailableSlots(
  schedule: ScheduleSettings,
  bookings: Booking[],
  dateKey: string,
): string[] {
  const dayBookings = bookings.filter((b) => b.date === dateKey);
  const now = new Date();
  const isToday = toDateKey(now) === dateKey;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return getSlotsForDate(schedule, dateKey).filter((time) => {
    if (isToday && timeToMinutes(time) <= nowMinutes) return false;
    return dayBookings.every(
      (booking) => !slotsConflict(schedule, time, booking.time),
    );
  });
}

export type DateStatus = "available" | "full" | "closed";

export function getDateStatus(
  schedule: ScheduleSettings,
  bookings: Booking[],
  dateKey: string,
): DateStatus {
  const date = new Date(`${dateKey}T00:00:00`);
  const day = schedule.weekly.find((d) => d.day === date.getDay());
  if (!day || !day.enabled || schedule.blockedDates.includes(dateKey)) {
    return "closed";
  }
  return getAvailableSlots(schedule, bookings, dateKey).length > 0
    ? "available"
    : "full";
}
