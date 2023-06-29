import Link from "next/link";
import React from "react";
import MovieCard, { IMovieCard } from "./MovieCard";

const PopularMovies = ({ popularMovies }: { popularMovies: any }) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-medium">Popular Movies</h1>
        <Link
          href="/movies/popular"
          className="py-2 px-5 bg-slate-800 text-md font-normal text-white"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-4 mt-4 gap-4">
        {popularMovies.results.slice(0, 4).map((movie: IMovieCard) => (
          <MovieCard key={movie?.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
