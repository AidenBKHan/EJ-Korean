import Link from "next/link";

export default function AdminEntryButton() {
  return (
    <Link
      href="/admin"
      aria-hidden="true"
      tabIndex={-1}
      className="fixed bottom-4 right-4 z-50 block h-10 w-10 opacity-0"
    />
  );
}
