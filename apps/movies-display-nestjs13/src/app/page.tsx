

const API_KEY = process.env.API_KEY;
import Results from "../components/Results";

export default async function Home({searchParams}: any) {
  
  // access imdb apis and fetch data 
  const genre = searchParams.genre || "fetchTrending";

  const res = await fetch(
    `https://api.themoviedb.org/3/${genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"
    }?api_key=${process.env.API_KEY}&language=en-US&page=1`)

    if(! res.ok) {
      throw new Error("Failed to load movies");
    }
    const data = await res.json();
    const results = data.results;
    return (
      <div>
        <Results results={results} />
      </div>
    )
  }