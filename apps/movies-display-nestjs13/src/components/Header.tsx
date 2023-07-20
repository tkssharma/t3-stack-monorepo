import Link from "next/link"

export default function Header(){
  return (
     <div className="flex justify-center max-w-6xl mx-auto">
         <Link href="/">
            <span className="text-xl hidden sm:inline">Imdb Movies</span>
         </Link>
     </div>
  )
}