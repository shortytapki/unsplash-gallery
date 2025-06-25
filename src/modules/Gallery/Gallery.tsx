import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";

import type { UnsplashImage } from "@/api";
import { Modal } from "@/libs/ui";
import { useDisclosure } from "@/libs/hooks";

import { ImageList, ModalImage, Search } from "./components";
import { useGalleryQuery } from "./requests";
import { submittedQueryAtom } from "./store";

export const Gallery = () => {
  const [submittedQuery] = useAtom(submittedQueryAtom);

  const [modalIsOpened, { open, close }] = useDisclosure();

  const [pickedImage, setPickedImage] = useState<UnsplashImage>();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGalleryQuery(submittedQuery);

  const pickImage = (i: UnsplashImage) => {
    setPickedImage(i);
    open();
  };

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    document.body.classList.toggle("body-no-scroll", modalIsOpened);
  }, [modalIsOpened]);

  return (
    <>
      <Search />
      {submittedQuery && (
        <ImageList
          data={data}
          isError={isError}
          isLoading={isFetching || isFetchingNextPage}
          lastElementRef={lastElementRef}
          onPickImage={pickImage}
        />
      )}
      <Modal opened={modalIsOpened} onClose={close}>
        <ModalImage
          src={pickedImage?.urls.regular}
          alt={pickedImage?.alt_description}
        />
      </Modal>
    </>
  );
};
