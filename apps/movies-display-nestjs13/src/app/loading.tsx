import Image from "next/image"

export default function loading(){
  return (
    <Image alt="banner" className="h-96" src="spinner.svg" />
  )
}