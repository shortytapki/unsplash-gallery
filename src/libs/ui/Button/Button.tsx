import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={classNames(
        "bg-primary hover:bg-primary-shade h-[48px] w-fit rounded-[12px] px-[14px] py-[16px] leading-1 text-white transition hover:cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
