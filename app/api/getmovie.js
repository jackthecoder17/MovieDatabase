import { fetchMovie, fetchMovies } from "./tmdb";

export const getMovie = async (id) => {
  try {
    return await fetchMovie(id);
  } catch (error) {
    console.log("Error fetching movie:", error);
    throw error;
  }
};

//default value should be popular

export const getAllMovies = async ({ with_genres, query, page }) => {
  try {
    return await fetchMovies({ with_genres, query, page });
  } catch (error) {
    console.log("Error fetching movies:", error);
    return { results: [], total_pages: 0, page: 1, total_results: 0 };
  }
};


