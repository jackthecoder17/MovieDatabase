import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllMovies, getMovie } from "../getmovie";

export const useMovies = (data) => {
  return useQuery({
    queryKey: ["movies", data],
    queryFn: () => getAllMovies(data),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: (prev) => prev,
  });
};

export const useMovie = (id) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    enabled: Boolean(id),
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}