import Link from "next/link";

const navLinks = [
  { href: "/", label: "강사 소개" },
  { href: "/payment", label: "수업 결제" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-rose-600">
          EJ Korean
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-rose-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
