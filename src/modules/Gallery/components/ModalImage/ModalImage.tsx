import classNames from "classnames";
import { useEffect, useState } from "react";

interface ModalImageProps {
  src?: string;
  alt?: string;
}

export const ModalImage = ({ src, alt }: ModalImageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <div className="relative flex w-full max-w-[760px] justify-center">
      <div
        className={classNames(
          "relative aspect-square w-full bg-contain bg-top bg-no-repeat",
        )}
        style={{
          backgroundImage: `url(${src})`,
        }}
        aria-label={alt}
      />

      {!loaded && (
        <div className="absolute inset-0 aspect-square w-full bg-white" />
      )}
    </div>
  );
};
