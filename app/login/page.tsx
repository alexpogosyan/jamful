import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { emailSignin, emailSignup } from "@/app/auth/actions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserAuthForm } from "@/components/UserAuthForm";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <>
      <div className="">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign up or sign in
              </h1>
            </div>
            <UserAuthForm />
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
