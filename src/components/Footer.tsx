import InstagramIcon from "@/components/icons/InstagramIcon";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/social";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10 text-sm text-neutral-500">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-medium text-rose-600 hover:underline"
        >
          <InstagramIcon className="h-4 w-4" />
          {INSTAGRAM_HANDLE}
        </a>
        <p>&copy; {new Date().getFullYear()} EJ Korean. All rights reserved.</p>
      </div>
    </footer>
  );
}
