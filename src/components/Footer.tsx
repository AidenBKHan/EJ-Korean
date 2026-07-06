export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10 text-sm text-neutral-500">
        <a
          href="https://www.instagram.com/ej.korean"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-rose-600 hover:underline"
        >
          @ej.korean
        </a>
        <p>&copy; {new Date().getFullYear()} EJ Korean. All rights reserved.</p>
      </div>
    </footer>
  );
}
