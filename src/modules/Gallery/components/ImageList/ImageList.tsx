import type { InfiniteData } from "@tanstack/react-query";

import classNames from "classnames";
import type { BaseHTMLAttributes } from "react";

import type { UnsplashImage } from "@/api";

import type { InfiniteGalleryResponse } from "../../requests";

interface ImageListProps extends BaseHTMLAttributes<HTMLDivElement> {
  data?: InfiniteData<InfiniteGalleryResponse>;
  isLoading?: boolean;
  isError?: boolean;
  noData?: boolean;
  lastElementRef: (node: HTMLDivElement | null) => void;
  onPickImage: (i: UnsplashImage) => void;
}

const loadingMockArr = new Array(12).fill(0);

export const ImageList = ({
  className,
  isLoading,
  data,
  isError,
  onPickImage,
  lastElementRef,
  ...rest
}: ImageListProps) => {
  const noData = data?.pages.every((r) => r.results.length === 0) && !isLoading;

  if (isError)
    return (
      <p className="text-red-500">
        Ошибка получения изображений, повторите попытку позже...
      </p>
    );
  return (
    <div
      className={classNames(
        "flex flex-wrap justify-center gap-2 pb-[16px]",
        className,
      )}
      {...rest}
    >
      {noData ? (
        <p className="text-gray-shade-78">
          К сожалению, поиск не дал результатов
        </p>
      ) : (
        data?.pages.map((page, pageIndex) =>
          page.results.map((img: any, i: number) => {
            const isLast =
              pageIndex === data.pages.length - 1 &&
              i === page.results.length - 1;

            return (
              <div
                key={img.id}
                ref={isLast ? lastElementRef : null}
                className="border-gray-shade-eb relative aspect-square grow basis-[114px] cursor-pointer overflow-hidden rounded border sm:basis-[160px] md:basis-[180px] xl:basis-[204px]"
                onClick={() => onPickImage(img)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out hover:scale-110"
                  style={{ backgroundImage: `url(${img.urls.small})` }}
                />
              </div>
            );
          }),
        )
      )}
      {isLoading &&
        loadingMockArr.map((_, idx) => (
          <div
            key={idx}
            className="border-gray-shade-eb relative aspect-square grow basis-[114px] cursor-pointer overflow-hidden rounded border sm:basis-[160px] md:basis-[180px] xl:basis-[204px]"
          >
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          </div>
        ))}
    </div>
  );
};
