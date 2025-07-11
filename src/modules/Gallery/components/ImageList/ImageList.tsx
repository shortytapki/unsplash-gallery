import type { InfiniteData } from "@tanstack/react-query";

import classNames from "classnames";
import { useAtom } from "jotai";
import { useEffect, type BaseHTMLAttributes } from "react";

import type { UnsplashImage } from "@/api";

import type { InfiniteGalleryResponse } from "../../requests";
import { submittedQueryAtom } from "../../store";

interface ImageListProps extends BaseHTMLAttributes<HTMLDivElement> {
  data?: InfiniteData<InfiniteGalleryResponse>;
  isLoading?: boolean;
  isError?: boolean;
  noData?: boolean;
  lastElementRef: (node: HTMLDivElement | null) => void;
  onPickImage: (i: UnsplashImage) => void;
}

const loadingMockArr = new Array(12).fill(0);

const isImageRelevant = (img: UnsplashImage, query: string) => {
  const q = query.toLowerCase();
  return (
    img.description?.toLowerCase().includes(q) ||
    img.alt_description?.toLowerCase().includes(q) ||
    //@ts-expect-error type missmatch
    img?.tags?.some((tag) => tag.title?.toLowerCase().includes(q))
  );
};

export const ImageList = ({
  className,
  isLoading,
  data,
  isError,
  onPickImage,
  lastElementRef,
  ...rest
}: ImageListProps) => {
  const [submittedQuery] = useAtom(submittedQueryAtom);

  const isDataRelevant = data?.pages.some((p) => {
    const relevant = p.results.some((img) =>
      isImageRelevant(img, submittedQuery),
    );
    return relevant;
  });

  const noData =
    (data?.pages.every((r) => r.results.length === 0) || !isDataRelevant) &&
    !isLoading;

  useEffect(() => {
    if (submittedQuery) {
      document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submittedQuery]);

  return (
    <div
      className={classNames(
        "mx-auto flex max-w-[1424px] flex-wrap gap-2 p-[16px] pb-[16px] lg:px-[80px]",
        !noData && "justify-center",
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
          page.results.map((img, i) => {
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
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
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
            <div className="absolute inset-0 bg-white" />
          </div>
        ))}
      {isError && (
        <p className="text-red-500">
          Ошибка получения изображений, повторите попытку позже...
        </p>
      )}
    </div>
  );
};
