import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/chrome/logo";

export function LogoLink() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Logo size={32} showName />
    </Link>
  );
}
