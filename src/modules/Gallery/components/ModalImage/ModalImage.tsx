import classNames from "classnames";
import { useState } from "react";

interface ModalImageProps {
  src?: string;
  alt?: string;
}

export const ModalImage = ({ src, alt }: ModalImageProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative flex w-full max-w-[760px] justify-center">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white" />
      )}

      <img
        src={src}
        alt={alt}
        className={classNames(
          "h-auto w-full object-contain transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
