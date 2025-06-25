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
    <div className="relative flex max-h-[386px] w-full max-w-[760px] justify-center md:max-h-[760px]">
      <div
        className={classNames(
          "relative w-full bg-cover bg-center bg-no-repeat md:aspect-square",
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
