"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "./icons";
import { emailSignin, emailSignup } from "@/app/auth/actions";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const isLoading = false;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="email"> Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                disabled={isLoading}
              />
            </div>
          </div>
          <Button
            disabled={isLoading}
            className={cn(buttonVariants({ variant: "secondary" }))}
            formAction={emailSignin}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
          <Button disabled={isLoading} formAction={emailSignup}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
