import React, { useEffect } from "react";
import Image from "next/image";
import "./movie.styles.scss";
import leftarrow from "../../assets/left.svg";
export default function MovieDetail({ movie }) {

  const handleReturnToSearch = (e) => {
    e.preventDefault()
    window.history.back();
  }
  // useEffect(() => {
  //   const fetchSimilarMovie = async () => {
  //     try {
  //       const { data } = await tmdb.get(`movie/${movie.id}/similar`);
  //       console.log(data.results);
  //     } catch (error) {
  //       console.log("Error fetching similar movies:", error);
  //     }
  //   };
  //   fetchSimilarMovie();
  // }, [movie.id]);
  return (
    <div className="movie-details w-full">
      <div className="p-5">
      <button class="bg-gray-300 hover:bg-gray-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center backbtn" onClick={handleReturnToSearch}>
        <Image
        src={leftarrow}
        width={30}
        height={30}
        /> 
        <span>Return to search results</span>
      </button>
      
      </div>
      <div className="movie-details__hero w-full p-5 flex flex-row align-middle gap-[100px]">
        <div className="movie-details__hero__image relative sm:w-[50%]">
          <h1 className="font-bold mb-3 ml-3">{movie.title}</h1>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            height={500}
            width={300}
            className="image rounded-xl"
          />
        </div>
        <div className="movie-details_info flex sm:w-[50%]">
          <div className="info pb-3">
            <h1 className="info__title font-bold">Genre</h1>
            <div className="">
              {movie.genres.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  <span>{genre.name}</span>
                  {index !== movie.genres.length - 1 && <span>, </span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="info pb-3">
            <h1 className="info__title font-bold">Release Year</h1>
            <span>{movie.release_date.substring(0, 4)}</span>
          </div>
          <div className="info pb-3">
            <h1 className="info__title font-bold">Average Rating</h1>
            <span>{movie.vote_average}</span>
          </div>
          <div className="info pb-3">
            <h1 className="info__title font-bold">Runtime</h1>
            <span>{movie.runtime} mins</span>
          </div>
          <div className="info pb-3">
            <h1 className="info__title font-bold">Status</h1>
            <span>{movie.status}</span>
          </div>
          {/* <div className="info pb-3">
          <div className="info pb-3">
            <h1 className="info__title font-bold">Movie Title</h1>
            <span>TV</span>
          </div> */}
        </div>
      </div>

      <div className="more_info w-full p-5">
        <div className="more_info__overview w-full">
          <h1 className="more_info__overview__title font-bold">Overview</h1>
          <p className="more_info__overview__content w-100% sm:w-[50%]">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
