import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllMovies, getMovie } from "../getmovie";

export const useMovies = (data) => {
  return useQuery({
    queryKey: ["movies", data],
    queryFn: () => getAllMovies(data),
  });
};

export const useMovie = (id) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
  });
}