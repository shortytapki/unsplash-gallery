import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiClient, type PaginatedResponse } from "@/api";

export interface InfiniteGalleryResponse extends PaginatedResponse {
  currentPage: number;
}

const fetchImages = async (
  page: string | number,
  query: string,
): Promise<InfiniteGalleryResponse> => {
  const params = new URLSearchParams({
    query,
    per_page: "30",
    page: String(page),
  });
  const response = await ApiClient.get<PaginatedResponse>("/search/photos", {
    params,
    headers: {
      Authorization: "Client-ID Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs",
    },
  });

  if (response.status === 429 || response.status === 403) {
    throw new Error("Rate limit exceeded");
  }

  return {
    ...response.data,
    currentPage: Number(page),
  };
};

export const useGalleryQuery = (query: string) =>
  useInfiniteQuery({
    queryKey: ["images", query],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => fetchImages(pageParam, query),
    enabled: query.length > 0,
    retry: (failureCount, error: any) => {
      if (error?.message === "Rate limit exceeded") {
        return false;
      }
      return failureCount < 3;
    },
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.total_pages
        ? lastPage.currentPage + 1
        : undefined,
  });
