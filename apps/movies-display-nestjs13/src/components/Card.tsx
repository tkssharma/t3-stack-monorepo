
import Image from "next/image";
import Link from "next/link"
// we will add types 
export default function Card({result}: any) {
  return (
    <div className="sm:shadow-md rounded-lg sm:border sm:m-2 sm:p-3 cursor-pointer sm:hover:shadow">
      <Link href={`/movie/${result.id}`}>
      <Image
          src={`https://image.tmdb.org/t/p/original/${
            result.backdrop_path || result.poster_path
          }`}
          width={500}
          height={300}
          className="sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200"
          style={{
            maxWidth: "100%",
            height: "auto",
            width: "auto",
          }}
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="image is not available"
        ></Image>

        <div className="p-2">
            <p className="line-clamp-2 text-md">
              {result.overview}
            </p>
            <p className="line-clamp-2 text-md">
              {result.vote_count}
            </p>
        </div>
      </Link>

    </div>
  )
}