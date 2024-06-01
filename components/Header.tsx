import Link from "next/link";
import Logo from "./Logo";
import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .maybeSingle();

  return (
    <div className="flex h-16 w-full items-center justify-between border-b px-4">
      <Logo />
      <div className="flex items-center gap-x-4">
        <MainNav className="mx-6" />
        {user ? (
          <UserNav user={user} profile={profile} />
        ) : (
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
