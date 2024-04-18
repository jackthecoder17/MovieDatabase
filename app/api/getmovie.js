import { Apimanager } from "./tmdb";

export const getMovie = async (id) => {
  try {
    const { data } = await Apimanager.get(`movie/${id}`);
    return data;
  } catch (error) {
    console.log("Error fetching movie:", error);
  }
};

//default value should be popular

export const getAllMovies = async ({ with_genres, query, page }) => {
  try {
    let endpoint;
    if (query) {
      endpoint = "search/movie";
    } else if (with_genres) {
      endpoint = "discover/movie";
    } else {
      endpoint = "movie/popular";
    }

    console.log(endpoint);
    const { data } = await Apimanager.get(endpoint, {
      params: {
        query,
        page,
        with_genres,
      },
    });
    return data;
  } catch (error) {
    console.log("Error fetching movies:", error);
    return []; // Return an empty array if the API request fails
  }
};


