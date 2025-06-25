import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1424px] flex-col p-[16px] lg:px-[80px] lg:pt-[40px]">
      {children}
    </main>
  );
};
