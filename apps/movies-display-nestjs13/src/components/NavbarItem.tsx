import Link from "next/link"


export default function NavbarItem({title, param}: any){
   return (
    <div>
    <Link href={`/?genre=${param}`}></Link>
     {title}
    </div>
   )
}