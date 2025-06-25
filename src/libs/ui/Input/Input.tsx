import classNames from "classnames";
import {
  forwardRef,
  type ForwardedRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

export const Input = forwardRef(
  (
    { className, leftSection, rightSection, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div
        className={classNames(
          "bg-gray-main hover:bg-gray-shade-e6 flex h-[48px] items-center rounded-[12px] px-[8px] py-[14px]",
          className,
        )}
      >
        {leftSection}
        <input
          className="placeholder:text-gray-shade-9c grow text-black"
          ref={ref}
          {...props}
        />
        {rightSection}
      </div>
    );
  },
);
