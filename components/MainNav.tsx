import Link from "next/link";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/scale-explorer"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Scale Explorer
      </Link>
      <Link
        href="/ear-trainer"
        className="text-sm font-medium transition-colors hover:text-primary" // text-muted-foreground
      >
        Ear Trainer
      </Link>
    </nav>
  );
}
