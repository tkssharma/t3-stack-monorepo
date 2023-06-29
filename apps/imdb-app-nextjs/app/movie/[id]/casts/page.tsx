import CastCard, { ICastCard } from "@/components/CastCard";
import { IMovieCard } from "@/components/MovieCard";

interface IParamsCasts {
  params: {
    id: IMovieCard["id"];
  };
}

async function getAllCasts(id: IMovieCard["id"]) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );
  return res.json();
}

const page = async ({ params }: IParamsCasts) => {
  const { id } = params;

  const movieCast = await getAllCasts(id);

  return (
    <main className="mt-5 flex flex-col mb-6">
      <div className="w-[1200px] max-w-full px-4 mx-auto">
        <div className="flex flex-col mb-6 mt-6">
          <h1 className="text-2xl font-medium">All Cast</h1>
        </div>
        <div className="grid grid-cols-4 mt-4 gap-4">
          {movieCast?.cast?.map((cast: ICastCard) => (
            <CastCard key={cast?.id} cast={cast} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
