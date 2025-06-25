import classNames from "classnames";
import { useState } from "react";

interface ModalImageProps {
  src?: string;
  alt?: string;
}

export const ModalImage = ({ src, alt = "Изображение" }: ModalImageProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative flex aspect-square w-full max-w-[760px] items-baseline justify-center sm:items-center">
      {loading && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <div className="h-full animate-pulse bg-gray-500"></div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={classNames(
          "max-h-full max-w-full object-contain object-top transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
