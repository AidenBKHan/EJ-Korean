"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, ADMIN_ID, ADMIN_PASSWORD_HINT } from "@/lib/admin-auth";

export default function AdminLoginForm() {
  const router = useRouter();
  const [id, setId] = useState(ADMIN_ID);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <form
      className="mx-auto mt-16 max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        if (login(id, password)) {
          router.push("/admin/dashboard");
        } else {
          setError(true);
        }
      }}
    >
      <h1 className="text-center text-2xl font-bold text-neutral-900">
        관리자 로그인
      </h1>

      <div className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="admin-id"
            className="block text-sm font-medium text-neutral-700"
          >
            아이디
          </label>
          <input
            id="admin-id"
            value={id}
            onChange={(event) => setId(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-base focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            autoComplete="username"
          />
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="block text-sm font-medium text-neutral-700"
          >
            비밀번호
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-neutral-300 px-4 py-2 text-base focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            autoComplete="current-password"
          />
          <p className="mt-1 text-xs text-neutral-400">
            힌트: {ADMIN_PASSWORD_HINT}
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-center text-sm text-rose-600">
          아이디 또는 비밀번호가 올바르지 않습니다.
        </p>
      )}

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
      >
        로그인
      </button>
    </form>
  );
}
