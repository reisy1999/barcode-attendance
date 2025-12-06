import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
};

export function Button({ href, variant, children }: ButtonProps) {
  const baseStyles =
    "flex h-16 w-64 items-center justify-center rounded-lg text-xl font-semibold text-white transition-colors";

  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <Link href={href} className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </Link>
  );
}
