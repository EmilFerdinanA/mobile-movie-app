import { httpClient } from "@/lib/axiosInstance";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getMovies = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [, query] = queryKey;

  let url;
  if (query) {
    url = `search/movie?query=${encodeURIComponent(String(query))}&page=1`;
  } else {
    url = "discover/movie?page=1&sort_by=popularity.desc";
  }

  const response = await httpClient.get(url);
  return response.data;
};
