import Image from "next/image"

async function getMovie(term: string ) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${term}&language=en-US&include_adult=false`);
  return await res.json();
}
export default async function MoviePage({params}: any) {
  const searchTerm = params.searchTerm;

  const {results} = await getMovie(searchTerm);
  return (
    <div className="w-full">
        {
          results && results.length === 0 && (
            <h1> No Results</h1>
          )
        }
        {
          results && <Results results={results} />
        }

    </div>
  )
}