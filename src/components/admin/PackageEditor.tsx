"use client";

import { useState } from "react";
import {
  ClassPackage,
  DEFAULT_PACKAGES,
  loadPackages,
  savePackages,
} from "@/lib/packages";

function emptyPackage(): ClassPackage {
  return {
    id: `package-${Date.now()}`,
    name: "새 패키지",
    sessions: 1,
    duration: "50분",
    price: 0,
    description: "",
    visible: true,
  };
}

export default function PackageEditor() {
  const [packages, setPackages] = useState<ClassPackage[]>(() =>
    loadPackages(),
  );
  const [savedAt, setSavedAt] = useState<number | null>(null);

  function updatePackage(id: string, patch: Partial<ClassPackage>) {
    setSavedAt(null);
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...patch } : pkg)),
    );
  }

  function removePackage(id: string) {
    setSavedAt(null);
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  }

  function addPackage() {
    setSavedAt(null);
    setPackages((prev) => [...prev, emptyPackage()]);
  }

  function handleSave() {
    savePackages(packages);
    setSavedAt(Date.now());
  }

  function handleReset() {
    savePackages(DEFAULT_PACKAGES);
    setPackages(DEFAULT_PACKAGES);
    setSavedAt(Date.now());
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-neutral-900">
          수업 패키지 관리
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addPackage}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-rose-300 hover:text-rose-600"
          >
            + 패키지 추가
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-rose-300 hover:text-rose-600"
          >
            기본값으로 초기화
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-2xl border border-neutral-200 p-5"
          >
            <label
              className={`inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                pkg.visible !== false
                  ? "bg-rose-50 text-rose-600"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              <input
                type="checkbox"
                checked={pkg.visible !== false}
                onChange={(event) =>
                  updatePackage(pkg.id, { visible: event.target.checked })
                }
                className="h-3.5 w-3.5 shrink-0 rounded border-neutral-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="truncate">
                {pkg.visible !== false
                  ? "결제 페이지에 표시됨"
                  : "비공개 (링크로만 전송 가능)"}
              </span>
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-neutral-500">
                  패키지명
                </label>
                <input
                  value={pkg.name}
                  onChange={(event) =>
                    updatePackage(pkg.id, { name: event.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500">
                  뱃지 (선택)
                </label>
                <input
                  value={pkg.badge ?? ""}
                  onChange={(event) =>
                    updatePackage(pkg.id, {
                      badge: event.target.value || undefined,
                    })
                  }
                  placeholder="예: 5% 할인"
                  className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500">
                  횟수
                </label>
                <input
                  type="number"
                  min={1}
                  value={pkg.sessions}
                  onChange={(event) =>
                    updatePackage(pkg.id, {
                      sessions: Number(event.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500">
                  수업 시간 표기
                </label>
                <input
                  value={pkg.duration}
                  onChange={(event) =>
                    updatePackage(pkg.id, { duration: event.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500">
                  가격 (원)
                </label>
                <input
                  type="number"
                  min={0}
                  value={pkg.price}
                  onChange={(event) =>
                    updatePackage(pkg.id, { price: Number(event.target.value) })
                  }
                  className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-base"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-500">
                  설명
                </label>
                <textarea
                  value={pkg.description}
                  onChange={(event) =>
                    updatePackage(pkg.id, { description: event.target.value })
                  }
                  rows={2}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-base"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removePackage(pkg.id)}
              className="mt-4 text-xs font-medium text-neutral-400 transition-colors hover:text-rose-600"
            >
              이 패키지 삭제
            </button>
          </div>
        ))}
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
