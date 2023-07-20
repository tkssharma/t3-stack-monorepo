import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchBox(){
  const [search, setSearch]= useState("");
  const router = useRouter();
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!search) return;
    router.push(`/search/${search}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="search"
       className="w-full p-5 m-5 rounded-3xl bg-gray-100 text-gray-800"
      type="text" value={search} onChange={(e) =>setSearch(e.target.value)} />

     <button type="submit" className="text-amber-500 disabled:text-gray-400" disabled={!search}>Search</button>
    </form>
  )
}